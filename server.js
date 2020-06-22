require('dotenv').config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get("/", (req, res) => {
	res.send("working!");
});

//! /just_listen route (random episode)
app.get("/random_episode", (req,res)=> {
	let url = (
		"https://listen-api.listennotes.com/api/v2/just_listen"
		);
	
	fetch(url, {
		headers: {
			"Content-Type": "application/json",
			"X-ListenAPI-Key": `${process.env.API_KEY}`
		}
	})
	.then(resp => resp.json())
	.then(data => res.json(data))
	.catch(err => console.error(err));
});

//! /listen
app.post("/episodes", (req, res) => {
	// search param + offset sent from clientside (body of request)
	const urlOffset = req.body.urlOffset;
	const urlSearch = req.body.urlSearch;
  const url =  `https://listen-api.listennotes.com/api/v2/search?q=${urlSearch}&offset=${urlOffset ? urlOffset : 0}&scope=episode&language=Any language&len_min=0`
	
	fetch(url, {
		headers: {
			"Content-Type":"application/json",
			"X-ListenAPI-Key": `${process.env.API_KEY}`
		}
	})
	.then(resp => resp.json())
	.then(data => res.json(data))
	.catch(err => console.error(err));
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

app.post('/sign_in', (req, res) => {

	// console.log('req', req)
	const username = req.body.username
	const password = req.body.password
	console.log('BODY', req.body)
	// console.log(req.query)
	// console.log('test')
	console.log('QUERY', req.query)
	if (test_db[1].username === username && test_db[1].password === password) {
		console.log('SUCCESS =>', {username, password})
		res.json(test_db[1])
	} else {
		console.log('FAILED =>', {username, password})
		res.status(400).send()
	}
})

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
