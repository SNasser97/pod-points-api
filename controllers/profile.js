
const handleProfileGet = (req,res,db) => {
  const { id } = req.params;

  db.select("*").from("Users").where("id", "=", id)
  .then(data => {
    const [user] = data
    // return data except email
    if (data.length) {
      return res.json({
        id: user.id,
        username: user.username,
        score: user.score,
        joined: user.joined
      })
    } else {
      throw new Error("Could not find user")
    }
  })
  .catch(err => res.status(404).json(err.message))
}

module.exports  = {
  handleProfileGet,
}