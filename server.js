const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/", (req, res) => {
	res.send("working!");
})


app.get("/testRoute", (req,res)=> {
	// let key = "5bc09b556c3f4175b51bfef06a27543c";
	// let url = "https://listen-api.listennotes.com/api/v2/search?q=star%20wars&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0";
	// // req.get("X-ListenAPI-Key", "5bc09b556c3f4175b51bfef06a27543c");
	// // res.json();
	// fetch(url, {
	// 	method:"GET",
	// 	"X-ListenAPI-Key":key
	// }).then(resp => {
	// 	// console.log(resp.data.status);
	// 	// res.send(res.data.status);
	// }).catch(err=>console.log(err));
	// res.set("X-ListenAPI-Key", "5bc09b556c3f4175b51bfef06a27543c");
	// res.send;
})

app.listen(3001);
console.log("App is running on 3001...");
