const handleSignIn = (req, res, db, hash='temp') => {
  const username = req.body.username
  const password = req.body.password
  let targetUser = [];
  console.log('db of users', db);
  db.forEach(user => {
    if (user.username === username && user.password === user.password) {
      targetUser = user
    } else {
      targetUser = ''
    }
  })

  if (targetUser) {
    console.log('SIGNING IN... =>', targetUser)
    res.json(targetUser)
  } else {
    console.log('INCORRECT USER OR PASS =>', targetUser)
    res.status(400).send()
  }
}

module.exports = {
  handleSignIn,
}
