const { DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
	class Location extends Model {
		static associate(models) {
			Location.hasMany(models.Route, { foreignKey: "destinationId" });
		}
	}

	Location.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			address: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ sequelize }
	);
	return Location;
};
