const tryCatch = require(`${__dirname}/asyncHandler`);

const getEpisodesAPI = (req, res, fetch) => {
  // search param + offset sent from clientside (body of request)
  const {urlSearch, urlOffset} = req.body;
  const url = `https://listen-api.listennotes.com/api/v2/search?q=${urlSearch}&offset=${urlOffset ? urlOffset : 0}&scope=episode&language=Any language&len_min=0`
  
  if (urlSearch !== "") {
    tryCatch.asyncHandler(req, res, fetch, url);
  } else {
    res.status(400).json("Empty search query provided");
  }
}

module.exports = {
  getEpisodesAPI
}