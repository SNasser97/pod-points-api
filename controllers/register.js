const { uuid } = require("uuidv4");

//* credits to https://ihateregex.io
// validate email address with regEx
const validateEmail = (email) => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email).toLowerCase());
}
// validate user  with regEx
const validateUser = (username) => {
  const reg =  /^[a-zA-Z0-9_]{6,25}$/; // only from 5 to 25 chars long, upper or lower, numbers included and - _ allowed
  return reg.test(String(username));
}

const validatePassword = (password) => {
  const reg =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/
  return reg.test(String(password));
}

const handleRegister = (req, res, db, bcrypt) => {
  const { email, username, password } = req.body
  // check if username or password for registration is valid
  if (!email && !username && !password) {
    res.status(400).json({error:"Please fill all fields"})
  } else if (!validateEmail(email)) {
    res.status(400).json({error:"Provide valid email address!"});
  } else if (!validatePassword(password)) {
    res.status(400).json({ error:"Password minimum length is 6 characters. At least 1 upper case letter, 1 lower case letter, 1 number and 1 special character #?!@$ %^&*-"})
  } else if (!validateUser(username)) {
    res.status(400).json({error:"Your username must be between 5 and 25 characters long, underscore _ is allowed. No other special characters accepted"});
  } else if (email !== "" && username !== "" && password !== "") {
    // make a transaction where we create a new user
    let new_user_id = "";
    db.transaction(trx => {
      trx.insert({ 
        id: uuid(), 
        username, 
        email, 
        joined: new Date() 
      })
      .into("Users")
      .returning(["id", "username"])
      .then(LoginUser => 
        trx.select("*")
           .from("Users")
           .returning("*") // return and insert User column id and username to Login
           .insert({
              id: LoginUser[0].id,
              username: LoginUser[0].username,
              hash: bcrypt.hashSync(password, 8)
            })
            .into("Login")
            .then(user => {
              if(user) {
                //! store user id for trx query
                // console.log("USER ID REG =>", user[0].id);
                new_user_id = user[0].id; 
                return user;
              } else {
                throw new Error("Could not register user")
              }
            })
            .then(trx.commit)
            .catch(trx.rollback)  
      )
      .then(() => {
        //! Fix for when signin requested, the new row is not returned undefined. 
        db.select("*").from("Users").where("id","=", new_user_id).then(newUser => res.json(newUser[0]));
      })
      .catch(err => res.status(400).json({error:err.message}))
    })
  } else {
    res.status(400).json({error:"Please fill all fields"});
  }
}
module.exports = {
  handleRegister
}