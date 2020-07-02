
const handleScoreUpdate = (req, res, db) => {
  const { id } = req.body;
  const reward = Math.floor(Math.random() * 250) + 70;
  
  const index = db.users.findIndex(user => user.id === id);

  if(db.users[index]) {
    db.users[index].score += reward;
    console.log('user =>', db.users[index])
    console.log('you\'ve been awarded ' + reward + ' points!');
    res.json({user_score_new:db.users[index].score, reward});
  } else {
    res.status(400).send('user not found, cannot update score');
  }
}

module.exports = {
  handleScoreUpdate,
}