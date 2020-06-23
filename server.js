require('dotenv').config();
const fetch = require("node-fetch"); // fetch is not part of Node
const express = require("express");
const cors = require("cors");

// CONTROLLERS
const signIn = require("./controllers/signIn");
const register = require("./controllers/register");
const episodes = require("./controllers/episodes");
const randomEpisodes = require("./controllers/randomEpisodes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/", (req, res) => {
	res.send("working!");
});

// dummy data
const test_db = [
	{
		id: 1,
		username:'DoesPods12',
		password:'pods321',
		email: 'jdoe@example.com',
		score: 200,
		joined: new Date()
	},
	{
		id: 2,
		username: 'MaggieA',
		password: 'cookies1',
		email: 'maggie@gmail.com',
		score: 1220,
		joined: new Date()
	}
]
// requests
app.post('/sign_in', (req, res) => {
	signIn.handleSignIn(req,res, test_db);
});

app.post('/register', (req, res) => {
	register.handleRegister(req,res,test_db);
});

app.get("/random_episode", (req, res) => {
	randomEpisodes.getRandomEpisodesAPI(req, res, fetch)
});

app.post("/episodes", (req, res) => {
	episodes.getEpisodesAPI(req, res, fetch)
});

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
	console.log(`App running on ${PORT}...`);
});


// // TODO: ROUTE - /episode_random - GET
// // TODO: ROUTE - /episode
// TODO: ROUTE - /signin - POST
// TODO: ROUTE - /register - POST
// TODO: ROUTE - /profile - GET
// TODO: ROUTE - /leaderboard - GET
// TODO: ROUTE - /score - PUT
