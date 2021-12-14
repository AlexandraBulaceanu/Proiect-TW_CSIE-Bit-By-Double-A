const { DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
	class Review extends Model {}

	Review.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},

			departureTime: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			arrivalTime: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			comfortRating: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			trafficRating: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			generalRating: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			notes: {
				type: DataTypes.STRING(1200),
				allowNull: false,
			},
		},
		{ sequelize }
	);
	return Review;
};
