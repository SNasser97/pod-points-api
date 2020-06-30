
const getRandomEpisodesAPI = (req,res,fetch) => {
  let url = "https://listen-api.listennotes.com/api/v2/just_listen";

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-ListenAPI-Key": `${process.env.API_KEY}`
    }
  })
  .then(resp => resp.json())
  .then(data => res.json(data))
  .catch(err => console.error(err));
}

module.exports = {
  getRandomEpisodesAPI
}