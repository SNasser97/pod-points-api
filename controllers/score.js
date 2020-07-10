
const handleScoreUpdate = (req, res, db) => {
  const { id } = req.body;
  const generateRandReward = () => Math.floor(Math.random() * 250) + 75
  
  // match id from body to that in pgsql
  db.select("*").from("Users")
      .where("id", "=", id)
      .increment("score", generateRandReward())
      .returning("score")
      .then(score => {
        if (score.length) {
          return res.json(score[0]) // param score returns arr of score as str ['100']
        } else {
          throw new Error("score not found"); // error message we throw to catch if else condition met
        }
      })
      .catch(error => res.status(400).json(error.message))
}

module.exports = {
  handleScoreUpdate,
}