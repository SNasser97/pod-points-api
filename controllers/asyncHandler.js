
// handle simple requests to Listen Notes API
const asyncHandler = async (req, res, fetch, fetch_url) => {
  try {
    const respData = await fetch(fetch_url, {
      headers: {
        "Content-Type": "application/json",
        "X-ListenAPI-Key": `${process.env.API_KEY}` //! YOUR API KEY HERE
      }
    });
    const respJSON = await respData.json();
    res.json(respJSON);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = {
  asyncHandler
}