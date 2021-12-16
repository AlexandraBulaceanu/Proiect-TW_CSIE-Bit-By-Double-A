"use strict";
const faker = require("faker");
const db = require("../models");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const allRoutes = await db.Route.findAll();
		const allUsers = await db.User.findAll();

		const routeIds = []
		const userIds = []

		for (var elem in allRoutes)
				routeIds.push(allRoutes[elem].id)
		
		for (var elem in allUsers)
			userIds.push(allUsers[elem].id)

		const data_to_push = [];
		for (let it = 0; it < 100; ++it) {
			// get id's
			let routeId =
				routeIds[faker.datatype.number({ min: 0, max: routeIds.length - 1 })];
			let userId =
				userIds[faker.datatype.number({ min: 0, max: userIds.length - 1 })];
			let comfortRating = faker.datatype.number({ min: 1, max: 5 });
			let trafficRating = faker.datatype.number({ min: 1, max: 5 });
			let generalRating = faker.datatype.number({ min: 1, max: 5 });
			// make checks and make depart != dest

			data_to_push.push({
				id: faker.datatype.uuid(),
				userId: userId,
				routeId: routeId,
				departureTime: new Date(),
				arrivalTime: new Date(),
				comfortRating: comfortRating,
				trafficRating: trafficRating,
				generalRating: generalRating,
				notes: faker.lorem.words(5),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
		await queryInterface.bulkInsert("Reviews", data_to_push, {});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */

		await db.sequelize.query("SET SQL_SAFE_UPDATES=0");
		await queryInterface.bulkDelete("Reviews", null, {});
		
	},
};
