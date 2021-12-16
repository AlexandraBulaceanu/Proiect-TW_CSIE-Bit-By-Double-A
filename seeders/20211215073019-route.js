"use strict";

const faker = require("faker");
const db = require("../models");
const fs = require("fs");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const allRoutes = await db.Route.findAll();
		const routes_length = allRoutes.length;
		// todo : put this const in a global file
		const types_of_transport = ["Tram", "Bus", "Trolley", "Metro"];
		const length_of_types_of_transport = types_of_transport.length;

		const allLocations = await db.Location.findAll();
		const allCompanies = await db.Company.findAll();

		const locationIds = []
		const companyIds = []

		for (var elem in allLocations)
			locationIds.push(allLocations[elem].id)
		
		for (var elem in allCompanies)
			companyIds.push(allCompanies[elem].id)
		
		
		const routeIds = [];
		const data_to_push = [];
		for (let it = 0; it < 100; ++it) {
			// get id's
			let dest = faker.datatype.number({ min: 0, max: locationIds.length - 2 });
			let depart = faker.datatype.number({
				min: 0,
				max: locationIds.length - 1,
			});
			let companyId =
				companyIds[
					faker.datatype.number({ min: 0, max: locationIds.length - 2 })
				];
			let transportId = faker.datatype.number({
				min: 0,
				max: length_of_types_of_transport - 1,
			});

			if (dest == 0) dest = dest + 1;
			if (depart == 0) depart = depart + 1;

			if (dest == depart) depart += 1;
			if (depart > routes_length) depart = 1;

			const id = faker.datatype.uuid();
			routeIds.push(id);
			data_to_push.push({
				id,
				wayOfTransport: types_of_transport[transportId],
				destinationId: locationIds[dest],
				departureId: locationIds[depart],
				companyId: companyId,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
		await queryInterface.bulkInsert("Routes", data_to_push, {});
		// await fs.writeFile(
		// 	"seeders/routeIds.json",
		// 	JSON.stringify(routeIds),
		// 	(err) => {
		// 		console.error(err);
		// 	}
		// );
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		
		await db.sequelize.query("SET SQL_SAFE_UPDATES=0");		
		await queryInterface.bulkDelete("Routes", null, {});
		
	},
};
