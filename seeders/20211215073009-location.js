"use strict";
const faker = require("faker");
const db = require("../models");
const fs = require("fs");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const data_to_push = [];
		const locationIds = [];
		for (let it = 0; it < 100; ++it) {
			const id = faker.datatype.uuid();
			locationIds.push(id);
			data_to_push.push({
				id,
				address: faker.address.streetName(),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
		await queryInterface.bulkInsert("Locations", data_to_push, {});
		// await fs.writeFile(
		// 	"seeders/locationIds.json",
		// 	JSON.stringify(locationIds),
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
		await queryInterface.bulkDelete("Locations", null, {});

	},
};
