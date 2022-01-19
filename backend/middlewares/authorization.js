const jwt = require("jsonwebtoken");
const { KEY } = require("../config/jwt");
const db = require("../models");

const authorizationMiddleware = async (req, res, next) => {
	const authorization = req.headers.authorization;
	if (authorization) {
		try {
			const decoded = jwt.verify(authorization.replace("Bearer ", ""), KEY);
			const userId = decoded.id;
			let user = null;
			if (userId) {
				user = await db.User.findByPk(userId);
			}
			if (user) {
				req.user = user;
				next();
			}
		} catch (e) {
			console.error("error", e);
			next();
		}
	} else {
		next();
	}
};

module.exports = authorizationMiddleware;