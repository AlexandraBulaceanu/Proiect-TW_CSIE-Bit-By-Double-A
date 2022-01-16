const jwt = require("jsonwebtoken");
const { KEY } = require("../config/jwt");
const db = require("../models");
const crypto = require("crypto");

const loginHandler = async (email, password) => {
	const hashedPassword = crypto
		.createHash("sha256")
		.update(password)
		.digest("hex");
	const user = await db.User.findOne({
		where: {
			email,
			password: hashedPassword,
		},
	});

	if (user) {
		return jwt.sign(
			{
				id: user.id,
				name: user.name,
				email: user.email,
			},
			KEY
		);
	} else {
		return null;
	}
};

module.exports = loginHandler;
