const db = require("../models");

module.exports.createLocation = async (args) => {
	const { address } = args;
	try {
		const newLocation = await db.Location.create({
			address,
		});
		return newLocation;
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.updateLocation = async (id, args) => {
	const { address } = args;

	try {
		await db.Location.update(
			{
				address
			},
			{ where: { id } }
		);

		return await db.Location.findByPk(id);
	} catch (e) {
		console.error(e);
		return null;
	}

}

module.exports.deleteLocation = async (id) => {
	//const { id } = args;
	try {
		const locationToDelete = await db.Location.findOne({
			where: {
				id,
			},
		});
		if (locationToDelete == null) {
			return {
				status: "no location with said id",
			};
		}
		await db.sequelize.query("SET FOREIGN_KEY_CHECKS=0");
		locationToDelete.destroy();
		return { status: "success" };
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getAllLocations = async () => {
	try {
		const locations = await db.Location.findAll();
		return locations;
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getLocation = async (id) => {
	try {
		const locationById = await db.Location.findOne({ where: { id } });
		return locationById;
	} catch (err) {
		console.error(err);
		return null;
	}
};
