"use strict";
const faker = require("faker");
const db = require("../models");
const crypto = require("crypto");
const fs = require("fs");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const userIds = [];
		const data_to_push = [];
		for (let it = 0; it < 100; ++it) {
			const id = faker.datatype.uuid();
			userIds.push(id);
			data_to_push.push({
				id,
				password: crypto
					.createHash("sha256")
					.update(faker.internet.password())
					.digest("hex"),
				email: faker.internet.email(),
				name: faker.name.firstName(),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
		await queryInterface.bulkInsert("Users", data_to_push, {});
		// await fs.writeFile(
		// 	"seeders/userIds.json",
		// 	JSON.stringify(userIds),
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
		await queryInterface.bulkDelete("Users", null, {});
	},
};
