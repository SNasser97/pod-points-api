const handleSignIn = (req, res, db, hash='temp') => {
  const username = req.body.username
  const password = req.body.password
  // let targetUser = [];
  console.log('db of users', db);
  console.log('BODY=>', req.body)
  
  const user = db.findIndex(acc => {
    return acc.username === username && acc.password === password ? acc : ''
  })
  console.log(user)
  if(db[user]) {
    res.json(db[user])
  } else {
    res.status(400).send('Incorrect username or password')
  }
  // console.log('trgt', targetUser)
  // if (targetUser) {
  //   console.log('SIGNING IN... =>', targetUser)
  //   res.json(targetUser)
  // } else {
  //   console.log('INCORRECT USER OR PASS =>', targetUser)
  //   res.status(400).send()
  // }
}

module.exports = {
  handleSignIn,
}
