const db = require("../models");

module.exports.createCompany = async (args) => {
	const { name } = args;
	console.log("args are ", args);
	try {
		const newCompany = await db.Company.create({
			name,
		});
		return newCompany;
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.deleteCompany = async (id) => {
	try {
		const companyToDelete = await db.Company.findOne({
			where: {
				id,
			},
		});
		if (companyToDelete == null) {
			return {
				status: "no Company with said id",
			};
		}
		companyToDelete.destroy();
		return { status: "success" };
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getAllCompanies = async () => {
	try {
		const companies = await db.Company.findAll();
		return companies;
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getCompany = async (id) => {
	try {
		const CompanyById = await db.Company.findOne({ where: { id } });
		return CompanyById;
	} catch (err) {
		console.error(err);
		return null;
	}
};
