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
	const { email, name } = args;

	const password = crypto
		.createHash("sha256")
		.update(args.password)
		.digest("hex");
	try {
		const newUser = await db.User.create({
			email,
			password,
			name,
		});

		return newUser;
	} catch (error) {
		console.error(error);
		return null;
	}
};

// Updated User
module.exports.updateUser = async (args, context) => {
	const { user } = context;

	if (!user) {
		return null;
	}

	const { id } = user;

	const { email, firstName, lastName } = args;

	try {
		await db.User.update(
			{
				email,
				firstName,
				lastName,
			},
			{ where: { id } }
		);

		return await db.User.findByPk(id);
	} catch (e) {
		console.error(e);
		return null;
	}
};

module.exports.deleteLocation = async (args) => {
	const { id } = args;
	try {
		const userToDelete = await db.User.findOne({
			where: {
				id,
			},
		});
		if (userToDelete == null) {
			return {
				status: "no location with said id",
			};
		}
		userToDelete.destroy();
		return { status: "success" };
	} catch (err) {
		console.error(err);
		return null;
	}
};
