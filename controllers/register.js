const { uuid } = require("uuidv4");

const handleRegister = (req, res, db, bcrypt) => {
  const { email, username, password } = req.body

  if (email !== "" && username !== "" && password !== "") {
    // make a transaction where we create a new user
    db.transaction(trx => {
      return trx.insert({
        id: uuid(),
        username,
        email,
        joined: new Date(),
      }).into("Users")
      .returning(["id", "username"])
      .then(LoginUser => {
        return trx.select("*").from("Users")
        .returning("*")
        // return and insert User column id and username to Login
        .insert({
          id: LoginUser[0].id,
          username: LoginUser[0].username,
          hash: bcrypt.hashSync(password, 8)
        })
        .into("Login")
        .then(user => {
          if(user.length) {
            // if new user exists make query to User table and retrieve new row
            db.select("*").from("Users").where("id", "=", user[0].id)
              .then(newUser => res.json(newUser[0]))
          } else {
            throw new Error("Could not register user")
          }
        })
        .then(trx.commit)
        .catch(trx.rollback)  
      })
      .catch(err => res.status(400).json(err.message))
    })
  } else {
    res.status(400).json("Please fill in your details");
  }
}
module.exports = {
  handleRegister
}