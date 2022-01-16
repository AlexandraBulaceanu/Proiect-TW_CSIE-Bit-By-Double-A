"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Routes", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
			},
			destinationId: {
				type: Sequelize.UUID,
				references: {
					model: {
						tableName: "Locations",
					},
					key: "id",
					onDelete: "cascade",
				},
			},
			departureId: {
				type: Sequelize.UUID,
				references: {
					model: {
						tableName: "Locations",
					},
					key: "id",
					onDelete: "cascade",
				},
			},
			companyId: {
				type: Sequelize.UUID,
				references: {
					model: {
						tableName: "Companies",
					},
					key: "id",
					onDelete: "cascade",
				},
			},
			wayOfTransport: {
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
		await queryInterface.dropTable("Routes");
	},
};
