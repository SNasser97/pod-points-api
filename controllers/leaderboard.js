const handleGetLeaderboard = (req, res, db) => {

  // Order list of users by their current scores
  db.select(["username", "score"]).from("Users").orderBy("score", "desc")
  .then(listOfUsers => {
    return res.json(listOfUsers);
  })
  .catch(err => res.status(400).json(err.message))

}

module.exports = {
  handleGetLeaderboard
}