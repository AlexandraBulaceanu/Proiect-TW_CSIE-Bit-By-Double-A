const { DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
	class Route extends Model {
		static associate(models) {
			Route.belongsTo(models.Location, { foreignKey: "destinationId" });
			Route.belongsTo(models.Location, { foreignKey: "departureId" });
			Route.belongsTo(models.Company, { foreignKey: "companyId" });
			Route.belongsToMany(models.User, {
				through: models.Review,
				foreignKey: "reviewId",
			});
		}
	}

	Route.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			wayOfTransport: {
				type: DataTypes.STRING, //is actually an enum, will document possible values bcs mysql is retarded and doesn't have enum
				allowNull: false,
			},
		},
		{ sequelize }
	);
	return Route;
};
