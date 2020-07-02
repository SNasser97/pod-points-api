const handleGetLeaderboard = (req, res, db) => {

  const leaderboard = db.users.sort((a,b)=> b.score - a.score);
  const usersInLeaderboard = [];

  for(let i = 0; i < leaderboard.length; i++) {
    usersInLeaderboard[i] = {
      id: leaderboard[i].id, 
      username:leaderboard[i].username, 
      score:leaderboard[i].score,
      position: leaderboard.indexOf(leaderboard[i]) + 1, 
    }
  }
  res.json(usersInLeaderboard);
}

module.exports = {
  handleGetLeaderboard
}