const { uuid } = require("uuidv4");

// validate email address with regEx
const validateEmail = (email) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email).toLowerCase());
}

const handleRegister = (req, res, db, bcrypt) => {
  const { email, username, password } = req.body
  // check if username or password for registration is valid
  if (!email && !username && !password) {
    res.status(400).json({error:"Please fill all fields"})
  } else if (!validateEmail(email)) {
    res.status(400).json({error:"Provide valid email address!"});
  } else if (password.length <= 5) {
    res.status(400).json({error:"Your password must be longer than 5 characters!"})
  } else if (username.length <= 3) {
    res.status(400).json({error:"Your username must be longer than 3 characters!"});
  } else if (email !== "" && username !== "" && password !== "") {
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
            return trx.select("*")
            .from("Users")
            .returning("*") // return and insert User column id and username to Login
            .insert({
              id: LoginUser[0].id,
              username: LoginUser[0].username,
              hash: bcrypt.hashSync(password, 8)
            })
            .into("Login")
            .then(user => {
              if(user.length) {
                // if new user exists make query to User table and retrieve new row
                db.select("*")
                  .from("Users")
                  .where("id", "=", user[0].id)
                  .then(newUser => res.json(newUser[0]))
              } else {
                throw new Error("Could not register user")
              }
            })
            .then(trx.commit)
            .catch(trx.rollback)  
      })
      .catch(err => res.status(400).json({error:"Username or Email already in use"}))
    })
  } else {
    res.status(400).json({error:"Please fill all fields"});
  }
}
module.exports = {
  handleRegister
}