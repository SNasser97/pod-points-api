const handleRegister = (req,res,db, hash='temp') => {
  const { username, password, email } = req.body
  if (!username && !password && !email) {
    res.status(400).send()
  } else {
    const newUser = {
      id: Math.floor(Math.random() * 99999),
      username,
      password,
      email,
      score: 0,
      joined: new Date()
    }
    db.push(newUser)
    console.log('new user', db[db.length - 1])
    console.log('all', db);
    res.json(db[db.length - 1])
  }
}

module.exports = {
  handleRegister
}