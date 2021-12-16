const db = require("../models");

module.exports.createLocation = async (address) => {
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

module.exports.deleteLocation = async (args) => {
	const { id } = args;
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
