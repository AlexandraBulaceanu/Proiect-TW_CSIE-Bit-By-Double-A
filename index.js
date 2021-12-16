const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const cors = require("cors");
const uuidv1 = require('uuid/v1');
const fs = require("fs");

const port = process.env.PORT;

//sequelize
const db = require("./models/index.js");
const { getReview, deleteReview } = require("./repository/Reviews.js");
const { getUserById } = require("./repository/users.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());


//REST for Reviews
app.post("/reviews", (req, res) => {
	try {
	if (req.body === undefined || (Object.keys(req.body ).length === 0 && Object.getPrototypeOf(req.body ) === Object.prototype))
    {
      res.status(400).json({message:"body is missing"})
    } 
	else if(!req.body.hasOwnProperty('departureTime') || !req.body.hasOwnProperty('arrivalTime') || !req.body.hasOwnProperty('comfortRating')
				|| !req.body.hasOwnProperty('trafficRating') || !req.body.hasOwnProperty('generalRating') || !req.body.hasOwnProperty('notes'))
    {
      res.status(400).json({message:"malformed request"})
    }
	else {
		function_response = createReview(req.body)
		if (function_response === null)
			res.status(400).send()
		else
			res.status(200).send()
	} } catch (err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	  }
});


app.get("/reviews", (req, res) => {
	try{
		const reviewsList = getAllReviews();
		res.json(reviewsList);
	} catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
		  }
});


app.get("/reviews/:id", (req, res) => {
	try{
		const id = req.params.id;
		const review = getReview(id);
	
		if (review !== null) {
			res.json(review);
		} else { 
			res.status(404).send(`review ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});


app.put("/reviews/:id", (req, res) => {
	try{
		let id = req.params.id;
		let reviewToUpdate = updateReview(id); //TO BE ADDED
		
		if (reviewToUpdate !== null) {
		res.json(reviewToUpdate);
		} else {
		res.status(404).send(`review ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });

app.delete("/reviews/:id", (req, res) => {
	try{
		const id = req.params.id;
		const reviewToDelete = deleteReview(id);

		if (reviewToDelete.status === "success") {
			res.status(200).send(`review ${id} was removed`);
		} else {
		res.status(404).send(`review ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });

//REST for Users
app.post("/users", (req, res) => {
	try {
	if (req.body === undefined || (Object.keys(req.body ).length === 0 && Object.getPrototypeOf(req.body ) === Object.prototype))
    {
      res.status(400).json({message:"body is missing"})
    } 
	else if(!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('name'))
    {
      res.status(400).json({message:"malformed request"})
    }
	else {
		function_response = createUser(req.body)
		if (function_response === null)
			res.status(400).send()
		else
			res.status(200).send()
	} } catch (err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	  }
});


app.get("/users", (req, res) => {
	try{
		const usersList = getAllUsers();
		res.json(usersList);
	} catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
		  }
});


app.get("/users/:id", (req, res) => {
	try{
		const id = req.params.id;
		const user = getUserById(id);
	
		if (user !== null) {
			res.json(user);
		} else { 
			res.status(404).send(`user ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});


app.put("/users/:id", (req, res) => {
	try{
		let id = req.params.id;
		let userToUpdate = updateUser(id);
		
		if (userToUpdate !== null) {
		res.json(userToUpdate);
		} else {
		res.status(404).send(`user ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});

//For delete - deleteLocation

// app.delete("/users/:id", (req, res) => {
// 	try{
// 		const id = req.params.id;
// 		const userToDelete = deleteUser(id);

// 		if (userToDelete.status === "success") {
// 			res.status(200).send(`user ${id} was removed`);
// 		} else {
// 		res.status(404).send(`user ${id} was not found`);
// 	}} catch(err) {
// 		console.warn(err.stack)
// 		res.status(500).json({ message: 'server error' })
// 	}
// });


app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
