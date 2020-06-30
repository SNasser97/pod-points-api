const { uuid } = require("uuidv4");

const handleRegister = (req,res,db, hash='temp') => {
  const { email, username, password } = req.body
  console.log('body =',req.body)
  if (!email || !username || !password) {
    res.status(400).send('Please fill in your details!')
  } else {
    const newUser = {
      id: uuid(), // provide unique id to identify user
      username,
      password,
      email,
      score: 0,
      joined: new Date()
    }
    db.users.push(newUser)
    console.log('NEW USER', db.users[db.users.length - 1])
    res.json(db.users[db.users.length - 1])
  }
}

module.exports = {
  handleRegister
}