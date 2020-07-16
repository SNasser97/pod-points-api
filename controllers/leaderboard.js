const handleGetLeaderboard = (req, res, db) => {

  // Order list of users by their current scores
  db.select(["id","username", "score"]).from("Users").orderBy("score", "desc")
    .then(listOfUsers => {
      // assign prop position to each user.
      const eachUser = listOfUsers.map((user,i) => {
        return  {...user, position:i+1}
      })
      return res.json(eachUser);
    })
    .catch(err => res.status(400).json(err.message))
}

module.exports = {
  handleGetLeaderboard
}