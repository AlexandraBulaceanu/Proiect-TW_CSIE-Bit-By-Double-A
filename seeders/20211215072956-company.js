"use strict";
const faker = require("faker");
const db = require("../models");
const fs = require("fs");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const companyIds = [];
		const data_to_push = [];
		for (let it = 0; it < 100; ++it) {
			const id = faker.datatype.uuid();
			data_to_push.push({
				id,
				name: faker.company.companyName(),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
			companyIds.push(id);
		}
		await queryInterface.bulkInsert("Companies", data_to_push, {});
		// await fs.writeFile(
		// 	"seeders/companyIds.json",
		// 	JSON.stringify(companyIds),
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
		await queryInterface.bulkDelete("Companies", null, {});

	},
};
