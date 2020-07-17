const tryCatch = require(`${__dirname}/asyncHandler`);

const getRandomEpisodesAPI = (req,res,fetch) => {
  const url = "https://listen-api.listennotes.com/api/v2/just_listen";
  tryCatch.asyncHandler(req,res,fetch,url);
}

module.exports = {
  getRandomEpisodesAPI
}