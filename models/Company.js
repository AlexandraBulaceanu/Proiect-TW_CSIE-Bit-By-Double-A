const { DataTypes, Model, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
	class Company extends Model {
		static associate(models) {
			Company.hasMany(models.Route, { foreignKey: "companyId" });
		}
	}

	Company.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{ sequelize }
	);
	return Company;
};
