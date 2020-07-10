const handleSignIn = (req, res, db, bcrypt) => {
  const {username, password} = req.body
  
  if (username && password) {
    db.select("*").from("Login")
      .where("username", "=", username)
      .then(data => {
        const [user] = data;
        const isHashValid = bcrypt.compareSync(password, user.hash);

        if (user.username && isHashValid) {
          db.select("*").from("Users").where("id", "=", user.id)
          .then(user => res.json({
            id: user[0].id, 
            username: user[0].username, 
            score: user[0].score, 
            joined: user[0].joined
          }));
        } else {
          throw new Error("Incorrect username or password");
        }
      })
      .catch(err => res.status(400).json(err.message))
  } else {
    res.status(400).json("Please enter your details");
  }
}

module.exports = {
  handleSignIn,
}
