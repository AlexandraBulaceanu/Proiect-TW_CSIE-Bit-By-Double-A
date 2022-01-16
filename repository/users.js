const db = require("../models");
const crypto = require("crypto");

module.exports.getAllUsers = async () => {
	try {
		const allUsers = await db.User.findAll();
		return allUsers;
	} catch (error) {
		console.error("Something went wrong");
		return null;
	}
};

module.exports.getUserById = async (id) => {
	return await db.User.findByPk(id);
};

module.exports.createUser = async (args) => {
	console.log("look i am here")
	const { email, name } = args;
    console.log("in createUser")
	console.log(email)
	console.log(name)
	const password = crypto
		.createHash("sha256")
		.update(args.password)
		.digest("hex");
	console.log(password)
	try {
		const newUser = await db.User.create({
			email,
			password,
			name,
		});
		console.log(newUser)

		return newUser;
	} catch (error) {
		console.error(error);
		return null;
	}
};

// Updated User
module.exports.updateUser = async (id, args) => {

	const { email, name } = args;
	const password = crypto
		.createHash("sha256")
		.update(args.password)
		.digest("hex");

	try {
		await db.User.update(
			{
				email,
				name,
				password
			},
			{ where: { id } }
		);

		return await db.User.findByPk(id);
	} catch (e) {
		console.error(e);
		return null;
	}
};

module.exports.deleteUser = async (id) => {
	//const { id } = args;
	try {
		const userToDelete = await db.User.findOne({
			where: {
				id,
			},
		});
		if (userToDelete == null) {
			return {
				status: "no user with said id",
			};
		}
		await db.sequelize.query("SET FOREIGN_KEY_CHECKS=0");
		userToDelete.destroy();
		return { status: "success" };
	} catch (err) {
		console.error(err);
		return null;
	}
};
