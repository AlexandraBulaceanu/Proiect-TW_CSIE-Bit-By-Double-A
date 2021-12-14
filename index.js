const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

//sequelize
const db = require("./models/index.js");

const app = express();

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
