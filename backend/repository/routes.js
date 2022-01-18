const db = require("../models");

module.exports.createRoute = async (args) => {
	try {
		const newRoute = await db.Route.create({
			destinationId: args.destinationId,
			departureId: args.departureId,
			companyId: args.companyId,
			wayOfTransport: args.wayOfTransport,
		});

		const destination = await db.Location.findOne({
			where: { id: args.destinationId },
		});
		const departure = await db.Location.findOne({
			where: { id: args.departureId },
		});
		const company = await db.Company.findOne({ where: { id: args.companyId } });

		if (!destination || !departure || !company) {
			await newRoute.destroy();
			throw "invalid id for route nested objects";
		}
		return {
			wayOfTransport: newRoute.dataValues.wayOfTransport,
			id: newRoute.dataValues.id,
			destination,
			departure,
			company,
		};
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.updateRoute = async (id, args) => {
	const { wayOfTransport, destinationId, departureId, companyId } = args;

	try {
		await db.Route.update(
			{
				wayOfTransport, 
				destinationId, 
				departureId, 
				companyId
			},
			{ where: { id } }
		);

		return await db.Route.findByPk(id);
	} catch (e) {
		console.error(e);
		return null;
	}

}

module.exports.deleteRoute = async (id) => {
	try {
		const routeToDelete = await db.Route.findOne({
			where: {
				id,
			},
		});
		if (routeToDelete == null) {
			return {
				status: "no Route with said id",
			};
		}
		await db.sequelize.query("SET FOREIGN_KEY_CHECKS=0");
		routeToDelete.destroy();
		return { status: "success" };
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getAllRoutes = async () => {
	try {
		const routes = await db.Route.findAll();

		const routesArr = [];
		if (routes.length) {
			for (let route of routes) {
				console.log(route)
				try{
				const departure = await db.Location.findOne({
					where: { id: route.dataValues.departureId },
				});
				const destination = await db.Location.findOne({
					where: { id: route.dataValues.destinationId },
				});
				
				const company = await db.Company.findOne({
					where: { id: route.dataValues.companyId },
				});
				
				
				routesArr.push({
					wayOfTransport: route.dataValues.wayOfTransport,
					id: route.dataValues.id,
					destination: destination.dataValues,
					departure: departure.dataValues,
					company: company.dataValues,
				});

				} catch(err) {
					console.log(err)
				}
			}
		}
		return routesArr;
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getRoute = async (id) => {
	try {
		const route = await db.Route.findOne({ where: { id } });
		const departure = await db.Location.findOne({
			where: { id: route.dataValues.departureId },
		});
		const destination = await db.Location.findOne({
			where: { id: route.dataValues.destinationId },
		});
		const company = await db.Company.findOne({
			where: { id: route.dataValues.companyId },
		});
		return {
			wayOfTransport: route.dataValues.wayOfTransport,
			id: route.dataValues.id,
			destination: destination.dataValues,
			departure: departure.dataValues,
			company: company.dataValues,
		};
	} catch (err) {
		console.error(err);
		return null;
	}
};


module.exports.getAllCompanysRoutes = async (companyId) =>{
	try{
		const routes = await db.Route.findAll({where: {companyId : companyId} })
		const routesArr = await getAllRoutesData(routes)
	
		return routesArr
	}
	catch (err){
		console.error(err)
		return null
	}
}