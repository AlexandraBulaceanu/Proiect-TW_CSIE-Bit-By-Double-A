const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const port = process.env.PORT;

//sequelize
const db = require("./models/index.js");
const { getReview, deleteReview, createReview, updateReview, getAllReviews, getAllReviewsByUser, getAllReviewsForLocation, getAllReviewsForCompany } = require("./repository/Reviews.js");
const { getUserById, deleteUser, createUser, updateUser, getAllUsers } = require("./repository/users.js");
const { getCompany, deleteCompany, createCompany, updateCompany, getAllCompanies } = require("./repository/companies.js");
const { getRoute, deleteRoute, createRoute, updateRoute, getAllRoutes } = require("./repository/routes.js");
const { getLocation, deleteLocation, createLocation, updateLocation, getAllLocations } = require("./repository/locations.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());


//REST for Reviews

//Post
app.post("/reviews", async (req, res) => {
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
		function_response = await createReview(req.body)
		if (function_response === null)
			res.status(400).send()
		else
			res.status(200).send()
	} } catch (err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	  }
});

//Get ALL
app.get("/reviews", async (req, res) => {
	try{
		const reviewsList = await getAllReviews();
		console.log(reviewsList);
		res.status(200).json(reviewsList);
	} catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
		  }
});

//Get one by ID
/*app.get("/reviews/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const review = await getReview(id);
	
		if (review !== null) {
			res.json(review);
		} else { 
			res.status(404).send(`review ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});*/

app.get("/reviews/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const review = await getAllReviewsByUser(id);
	
		if (review !== null) {
			res.json(review);
		} else { 
			res.status(404).send(`review ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});


//Update one by ID
app.put("/reviews/:id", async (req, res) => {
	try{
		let id = req.params.id;
		let reviewToUpdate = await updateReview(id, req.body);
		
		if (reviewToUpdate !== null) {
		res.json(reviewToUpdate);
		} else {
		res.status(404).send(`review ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });

//Delete one by ID
app.delete("/reviews/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const reviewToDelete = await deleteReview(id);

		if (reviewToDelete.status === "success") {
			res.status(200).send(`review ${id} was removed`);
		} else {
		res.status(404).send(`review ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });


app.get("/reviewsbylocation/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const reviewsByLoc = await getAllReviewsForLocation(id);
		if (reviewsByLoc !== null) {
			res.json(reviewsByLoc);
		} else { 
			res.status(404).send(`location ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}

	}
);

app.get("/reviewsbycompany/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const reviewsByComp = await getAllReviewsForCompany(id);
		if (reviewsByComp !== null) {
			res.json(reviewsByComp);
		} else { 
			res.status(404).send(`company ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}

	}
);

//REST for Users

//Post
app.post("/users", async (req, res) => {
	console.log("in post")
	try {
	if (req.body === undefined || (Object.keys(req.body ).length === 0 && Object.getPrototypeOf(req.body ) === Object.prototype))
    {
		console.log("in post 1")
      res.status(400).json({message:"body is missing"})
    } 
	else if(!req.body.hasOwnProperty('email') || !req.body.hasOwnProperty('name'))
    {
		console.log("in post 2")
      res.status(400).json({message:"malformed request"})
    }
	else {
		console.log("in post 3")
		function_response = await createUser(req.body)
		if (function_response === null)
			res.status(400).send()
		else
			res.status(200).send({message: "created"})
	} } catch (err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	  }
});

//Get for all
app.get("/users", async (req, res) => {
	try{
		const usersList = await getAllUsers();
		console.log(usersList)
		res.json(usersList);
	} catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
		  }
});

//get one by id
app.get("/users/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const user = await getUserById(id);
	
		if (user !== null) {
			res.json(user);
		} else { 
			res.status(404).send(`user ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});

//update one by id
app.put("/users/:id", async (req, res) => {
	try{
		let id = req.params.id;
		let userToUpdate = await updateUser(id, req.body);
		
		if (userToUpdate !== null) {
		res.json(userToUpdate);
		} else {
		res.status(404).send(`user ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});

//delete one by id
app.delete("/users/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const userToDelete = await deleteUser(id);

		if (userToDelete.status === "success") {
			res.status(200).send(`user ${id} was removed`);
		} else {
		res.status(404).send(`user ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});


//REST for Companies

//post
app.post("/companies", async (req, res) => {
	try {
	if (req.body === undefined || (Object.keys(req.body ).length === 0 && Object.getPrototypeOf(req.body ) === Object.prototype))
    {
      res.status(400).json({message:"body is missing"})
    } 
	else if(!req.body.hasOwnProperty('name'))
    {
      res.status(400).json({message:"malformed request"})
    }
	else {
		function_response = await createCompany(req.body)
		if (function_response === null)
			res.status(400).send()
		else
			res.status(200).send()
	} } catch (err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	  }
});

//get all
app.get("/companies", async (req, res) => {
	try{
		const companiesList = await getAllCompanies();
		console.log(companiesList)
		res.json(companiesList);
	} catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
		  }
});

//get one by id
app.get("/companies/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const company = await getCompany(id);
	
		if (company !== null) {
			res.json(company);
		} else { 
			res.status(404).send(`company ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});

//update one by id
app.put("/companies/:id", async (req, res) => {
	try{
		let id = req.params.id;
		let companyToUpdate = await updateCompany(id, req.body); 
		
		if (companyToUpdate !== null) {
		res.json(companyToUpdate);
		} else {
		res.status(404).send(`company ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });

//delete one by id
app.delete("/companies/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const companyToDelete = await deleteCompany(id);

		if (companyToDelete.status === "success") {
			res.status(200).send(`company ${id} was removed`);
		} else {
		res.status(404).send(`company ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });


//REST for locations

//post 
app.post("/locations", async (req, res) => {
	try {
	if (req.body === undefined || (Object.keys(req.body ).length === 0 && Object.getPrototypeOf(req.body ) === Object.prototype))
	{
		res.status(400).json({message:"body is missing"})
	} 
	else if(!req.body.hasOwnProperty('address'))
	{
		res.status(400).json({message:"malformed request"})
	}
	else {
		function_response = await createLocation(req.body)
		if (function_response === null)
			res.status(400).send()
		else
			res.status(200).send()
	} } catch (err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
		}
});

//get all
app.get("/locations", async (req, res) => {
	try{
		const locationsList = await getAllLocations();
		res.json(locationsList);
	} catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
		  }
});

//get one by id
app.get("/locations/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const location = await getLocation(id);
	
		if (location !== null) {
			res.json(location);
		} else { 
			res.status(404).send(`location ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});

//update one by id
app.put("/locations/:id", async (req, res) => {
	try{
		let id = req.params.id;
		let locationToUpdate = await updateLocation(id, req.body); 
		
		if (locationToUpdate !== null) {
		res.json(locationToUpdate);
		} else {
		res.status(404).send(`location ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });

//detele one by id
app.delete("/locations/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const locationToDelete = await deleteLocation(id);

		if (locationToDelete.status === "success") {
			res.status(200).send(`location ${id} was removed`);
		} else {
		res.status(404).send(`location ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });


//REST for routes

//post
app.post("/routes", async (req, res) => {
	try {
	if (req.body === undefined || (Object.keys(req.body ).length === 0 && Object.getPrototypeOf(req.body ) === Object.prototype))
    {
      res.status(400).json({message:"body is missing"})
    } 
	else if(!req.body.hasOwnProperty('wayOfTransport'))
    {
      res.status(400).json({message:"malformed request"})
    }
	else {
		function_response = await createRoute(req.body)
		if (function_response === null)
			res.status(400).send()
		else
			res.status(200).send()
	} } catch (err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	  }
});

//get all
app.get("/routes", async (req, res) => {
	try{
		const routesList = await getAllRoutes();
		res.json(routesList);
	} catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
		  }
});

//get one by id
app.get("/routes/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const route = await getRoute(id);
	
		if (route !== null) {
			res.json(route);
		} else { 
			res.status(404).send(`route ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});

//update by id
app.put("/routes/:id", async (req, res) => {
	try{
		let id = req.params.id;
		let routeToUpdate = await updateRoute(id, req.body); 
		
		if (routeToUpdate !== null) {
		res.json(routeToUpdate);
		} else {
		res.status(404).send(`route ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });

//delete by id
app.delete("/routes/:id", async (req, res) => {
	try{
		const id = req.params.id;
		const routeToDelete = await deleteRoute(id);

		if (routeToDelete.status === "success") {
			res.status(200).send(`route ${id} was removed`);
		} else {
		res.status(404).send(`route ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });





app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
