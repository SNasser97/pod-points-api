require('dotenv').config();
const fetch = require("node-fetch"); // fetch is not part of Node
const express = require("express");
const cors = require("cors");
const knex = require("knex");
// const DATABASE = knex({
// 	client:'psql',
// })
// CONTROLLERS
const signIn = require(`${__dirname}/controllers/signIn`);
const register = require(`${__dirname}/controllers/register`);
const episodes = require(`${__dirname}/controllers/episodes`);
const randomEpisodes = require(`${__dirname}/controllers/randomEpisodes`);
const profile = require(`${__dirname}/controllers/profile`);
const score = require(`${__dirname}/controllers/score`);
const leaderboard = require(`${__dirname}/controllers/leaderboard`);

const { uuid } = require("uuidv4");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/", (req, res) => {
	res.sendFile(__dirname+"/index.html");
});

// dummy data
const test_db = {
	users: [
		{
			id: "1",
			username: "DoesPods12",
			password: "pods321",
			email: "jdoe@example.com",
			score: 200,
			joined: new Date()
		},
		{
			id: "2",
			username: "MaggieA",
			password: "cookies1",
			email: "maggie@gmail.com",
			score: 1220,
			joined: new Date()
		}
	]
}
//* main requests
app.post('/sign_in', (req, res) => {
	signIn.handleSignIn(req,res, test_db);
});
app.post('/register', (req, res) => {
	register.handleRegister(req,res,test_db);
});
app.get("/profile/:id", (req, res) => {
	profile.handleProfileGet(req,res, test_db);
});
app.put("/score", (req, res) => {
	score.handleScoreUpdate(req, res, test_db);
});
app.get("/leaderboard", (req, res) => {
	leaderboard.handleGetLeaderboard(req,res,test_db);
})
//* vendor requests
app.post("/episodes", (req, res) => {
	episodes.getEpisodesAPI(req, res, fetch)
});
app.get("/random_episode", (req, res) => {
	randomEpisodes.getRandomEpisodesAPI(req, res, fetch)
});



const PORT = process.env.SERVER_PORT || 3002;
app.listen(PORT, () => {
	console.log(`App running on ${PORT}...`);
});
console.log('s', test_db);

// // TODO: ROUTE - /episode_random - GET
// // TODO: ROUTE - /episode
// TODO: ROUTE - /signin - POST
// TODO: ROUTE - /register - POST
// TODO: ROUTE - /profile - GET
// TODO: ROUTE - /leaderboard - GET
// TODO: ROUTE - /score - PUT
