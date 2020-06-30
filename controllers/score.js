
const handleScoreUpdate = (req, res, db) => {
  const { id } = req.body;
  const reward = 25
  
  const index = db.users.findIndex(user => user.id === id);

  if(db.users[index]) {
    console.log(db.users[index])
    res.json(reward);
  } else {
    res.status(400).send('user not found, cannot update score');
  }
}

module.exports = {
  handleScoreUpdate,
}