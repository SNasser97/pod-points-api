require('dotenv').config();
const fetch = require("node-fetch"); // for using fetch within Node
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const knex = require("knex");
//! controllers
const signIn = require(`${__dirname}/controllers/signIn`);
const register = require(`${__dirname}/controllers/register`);
const episodes = require(`${__dirname}/controllers/episodes`);
const randomEpisodes = require(`${__dirname}/controllers/randomEpisodes`);
const profile = require(`${__dirname}/controllers/profile`);
const score = require(`${__dirname}/controllers/score`);
const leaderboard = require(`${__dirname}/controllers/leaderboard`);
//! express 
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/", (req, res) => {
	res.send("online");
	// res.sendFile(__dirname+"/index.html");
});
//! pgsql DATABASE CONNECTION
const pg = knex({
	client:"pg",
	connection:{
		host: "127.0.0.1",
		user: "postgres",
		password: "admin",
		database: "pod-points",
	}
});

//* main requests
app.post("/sign_in", (req, res) => {
	signIn.handleSignIn(req,res, pg, bcrypt);
});
app.post("/register", (req, res) => {
	register.handleRegister(req, res, pg, bcrypt);
});
app.get("/profile/:id", (req, res) => {
	profile.handleProfileGet(req,res, pg);
});
app.put("/score", (req, res) => {
	score.handleScoreUpdate(req, res, pg);
});
app.get("/leaderboard", (req, res) => {
	leaderboard.handleGetLeaderboard(req,res, pg);
})
//* vendor requests
app.post("/episodes", (req, res) => {
	episodes.getEpisodesAPI(req, res, fetch)
});
app.get("/random_episode", (req, res) => {
	randomEpisodes.getRandomEpisodesAPI(req, res, fetch)
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`App running on ${PORT}...`);
});
