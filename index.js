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
const { getReview, deleteReview, createReview, updateReview, getAllReviews } = require("./repository/Reviews.js");
const { getUserById, deleteUser, createUser, updateUser, getAllUsers } = require("./repository/users.js");
const { getCompany, deleteCompany, createCompany, updateCompany, getAllCompanies } = require("./repository/companies.js");
const { getRoute, deleteRoute, createRoute, updateRoute, getAllRoutes } = require("./repository/routes.js");
const { getLocation, deleteLocation, createLocation, updateLocation, getAllLocations } = require("./repository/locations.js");

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


app.delete("/users/:id", (req, res) => {
	try{
		const id = req.params.id;
		const userToDelete = deleteUser(id);

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
app.post("/companies", (req, res) => {
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
		function_response = createCompany(req.body)
		if (function_response === null)
			res.status(400).send()
		else
			res.status(200).send()
	} } catch (err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	  }
});

app.get("/companies", (req, res) => {
	try{
		const companiesList = getAllCompanies();
		res.json(companiesList);
	} catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
		  }
});


app.get("/companies/:id", (req, res) => {
	try{
		const id = req.params.id;
		const company = getCompany(id);
	
		if (company !== null) {
			res.json(company);
		} else { 
			res.status(404).send(`company ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});

app.put("/companies/:id", (req, res) => {
	try{
		let id = req.params.id;
		let companyToUpdate = updateCompany(id); 
		
		if (companyToUpdate !== null) {
		res.json(companyToUpdate);
		} else {
		res.status(404).send(`company ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });

app.delete("/companies/:id", (req, res) => {
	try{
		const id = req.params.id;
		const companyToDelete = deleteCompany(id);

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

  app.post("/locations", (req, res) => {
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
		function_response = createLocation(req.body)
		if (function_response === null)
			res.status(400).send()
		else
			res.status(200).send()
	} } catch (err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	  }
});

app.get("/locations", (req, res) => {
	try{
		const locationsList = getAllLocations();
		res.json(locationsList);
	} catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
		  }
});


app.get("/locations/:id", (req, res) => {
	try{
		const id = req.params.id;
		const location = getLocation(id);
	
		if (location !== null) {
			res.json(location);
		} else { 
			res.status(404).send(`location ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});

app.put("/locations/:id", (req, res) => {
	try{
		let id = req.params.id;
		let locationToUpdate = updateLocation(id); 
		
		if (locationToUpdate !== null) {
		res.json(locationToUpdate);
		} else {
		res.status(404).send(`location ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });

app.delete("/locations/:id", (req, res) => {
	try{
		const id = req.params.id;
		const locationToDelete = deleteLocation(id);

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

app.post("/routes", (req, res) => {
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
		function_response = createRoute(req.body)
		if (function_response === null)
			res.status(400).send()
		else
			res.status(200).send()
	} } catch (err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	  }
});

app.get("/routes", (req, res) => {
	try{
		const routesList = getAllRoutes();
		res.json(routesList);
	} catch (err) {
			console.warn(err.stack)
			res.status(500).json({ message: 'server error' })
		  }
});


app.get("/routes/:id", (req, res) => {
	try{
		const id = req.params.id;
		const route = getRoute(id);
	
		if (route !== null) {
			res.json(route);
		} else { 
			res.status(404).send(`route ${id} was not found`);
	} } catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
});

app.put("/routes/:id", (req, res) => {
	try{
		let id = req.params.id;
		let routeToUpdate = updateRoute(id); 
		
		if (routeToUpdate !== null) {
		res.json(routeToUpdate);
		} else {
		res.status(404).send(`route ${id} was not found`);
	}} catch(err) {
		console.warn(err.stack)
		res.status(500).json({ message: 'server error' })
	}
  });

app.delete("/routes/:id", (req, res) => {
	try{
		const id = req.params.id;
		const routeToDelete = deleteRoute(id);

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
