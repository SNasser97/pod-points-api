const getEpisodesAPI = (req,res, fetch) => {
  // search param + offset sent from clientside (body of request)
  const urlOffset = req.body.urlOffset;
  const urlSearch = req.body.urlSearch;
  const url = `https://listen-api.listennotes.com/api/v2/search?q=${urlSearch}&offset=${urlOffset ? urlOffset : 0}&scope=episode&language=Any language&len_min=0`

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
  getEpisodesAPI
}