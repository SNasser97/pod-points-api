
const handleScoreUpdate = (req, res, db) => {
  const { id } = req.body;
  const MAX_POINT = 250;
  const MIN_POINT = 75;
  const reward = Math.floor(Math.random() * (MAX_POINT - MIN_POINT + 1) + MIN_POINT) // generate score between 75 and 250
  // match id from body to that in pgsql
  db.select("*").from("Users")
      .where("id", "=", id)
      .increment("score", reward)
      .returning("score")
      .then(score => {
        if (score.length) {
          return res.json({reward, user_score_new:parseInt(score[0])}) // param score returns arr of score as str ['100']
        } else {
          throw new Error("score not found"); // error message we throw to catch if else condition met
        }
      })
      .catch(error => res.status(400).json(error.message))
}

module.exports = {
  handleScoreUpdate,
}