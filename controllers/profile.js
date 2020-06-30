
const handleProfileGet = (req,res,db) => {
  const { id } = req.params;

  const index = db.users.findIndex(user => user.id === id);

  if (db.users[index]) {
    res.json(db.users[index]);
  } else {
    res.status(404).send('not found');
  }
}

module.exports  = {
  handleProfileGet,
}