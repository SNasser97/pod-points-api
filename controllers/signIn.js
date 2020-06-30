const handleSignIn = (req, res, db, hash='temp') => {
  const username = req.body.username
  const password = req.body.password
  
  console.log('BODY=>', req.body)
  
  const index = db.users.findIndex(acc => {
    return acc.username === username && acc.password === password ? acc : ''
  })
  // check if such user exists.
  if (db.users[index]) {
    res.json(db.users[index])
  } else {
    res.status(400).send('Incorrect username or password')
  }
}

module.exports = {
  handleSignIn,
}
