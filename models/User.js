const { DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
	class User extends Model {
		static associate(models) {
			User.belongsToMany(models.Route, {
				foreignKey: "userId",
				through: models.Review,
			});
		}
	}

	User.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},

			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ sequelize }
	);
	return User;
};
