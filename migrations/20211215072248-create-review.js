"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Reviews", {
			userId: {
				type: Sequelize.UUID,
				references: {
					model: {
						tableName: "Users",
					},
					key: "id",
					onDelete: "cascade",
				},
			},
			routeId: {
				type: Sequelize.UUID,
				references: {
					model: {
						tableName: "Routes",
					},
					key: "id",
					onDelete: "cascade",
				},
			},

			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			departureTime: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			arrivalTime: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			comfortRating: {
				allowNull: false,
				type: Sequelize.DOUBLE,
			},
			trafficRating: {
				allowNull: false,
				type: Sequelize.DOUBLE,
			},
			generalRating: {
				allowNull: false,
				type: Sequelize.DOUBLE,
			},
			notes: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Reviews");
	},
};
