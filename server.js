require('dotenv').config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/", (req, res) => {
	res.send("working!");
})

app.get("/testRoute", (req,res)=> {
	let url =
		"https://listen-api.listennotes.com/api/v2/search?q=star%20wars&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0";
	fetch(url, {
		headers: {
			"Content-Type": "application/json",
			"X-ListenAPI-Key": `${process.env.API_KEY}`
		}
	})
	.then(resp => resp.json())
	.then(data => {
		console.log(data);
		res.send(data);
	})
	.catch(console.error);
	
})

const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
	console.log(`App running on ${PORT}...`);
});

