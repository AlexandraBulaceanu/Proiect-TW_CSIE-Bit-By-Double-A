const db = require("../models");

module.exports.createReview = async (args) => {
	try {
		const review = await db.Review.create({
			departureTime: args.departureTime,
			arrivalTime: args.arrivalTime,
			comfortRating: args.comfortRating,
			trafficRating: args.trafficRating,
			generalRating: args.generalRating,
			notes: args.notes,
			routeId: args.route,
			userId: args.user,
		});

		const route = await db.Route.findOne({ where: { id: args.route } });

		const destination = await db.Location.findOne({
			where: { id: route.dataValues.destinationId },
		});
		const departure = await db.Location.findOne({
			where: { id: route.dataValues.departureId },
		});
		const company = await db.Company.findOne({
			where: { id: route.dataValues.companyId },
		});

		const hydratedRoute = {
			wayOfTransport: route.dataValues.wayOfTransport,
			id: route.dataValues.id,
			destination,
			departure,
			company,
		};

		const user = await db.User.findOne({ where: { id: args.user } });

		if (!user || !route) {
			review.destroy();
			throw "invalid id for review nested objects";
		}

		return {
			id: review.dataValues.id,
			departureTime: review.dataValues.departureTime,
			arrivalTime: review.dataValues.arrivalTime,
			comfortRating: review.dataValues.comfortRating,
			trafficRating: review.dataValues.trafficRating,
			generalRating: review.dataValues.generalRating,
			notes: review.dataValues.notes,
			route: hydratedRoute,
			user: user.dataValues,
		};
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.deleteReview = async (args) => {
	const { id } = args;
	try {
		const reviewToDelete = await db.Review.findOne({
			where: {
				id,
			},
		});
		if (reviewToDelete == null) {
			return {
				status: "no review with said id",
			};
		}
		reviewToDelete.destroy();
		return { status: "success" };
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getAllReviews = async () => {
	try {
		const reviewsArr = [];
		const reviews = await db.Review.findAll();
		for (let review of reviews) {
			const route = await db.Route.findOne({
				where: { id: review.dataValues.routeId },
			});

			const destination = await db.Location.findOne({
				where: { id: route.dataValues.destinationId },
			});
			const departure = await db.Location.findOne({
				where: { id: route.dataValues.departureId },
			});
			const company = await db.Company.findOne({
				where: { id: route.dataValues.companyId },
			});

			const hydratedRoute = {
				wayOfTransport: route.dataValues.wayOfTransport,
				id: route.dataValues.id,
				destination,
				departure,
				company,
			};

			const user = await db.User.findOne({
				where: { id: review.dataValues.userId },
			});

			reviewsArr.push({
				id: review.dataValues.id,
				departureTime: review.dataValues.departureTime,
				arrivalTime: review.dataValues.arrivalTime,
				comfortRating: review.dataValues.comfortRating,
				trafficRating: review.dataValues.trafficRating,
				generalRating: review.dataValues.generalRating,
				notes: review.dataValues.notes,
				route: hydratedRoute,
				user: user.dataValues,
			});
		}
		return reviewsArr;
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getReview = async (id) => {
	try {
		const review = await db.Review.findOne({ where: { id: id } });
		const route = await db.Route.findOne({
			where: { id: review.dataValues.routeId },
		});

		const destination = await db.Location.findOne({
			where: { id: route.dataValues.destinationId },
		});
		const departure = await db.Location.findOne({
			where: { id: route.dataValues.departureId },
		});
		const company = await db.Company.findOne({
			where: { id: route.dataValues.companyId },
		});

		const hydratedRoute = {
			wayOfTransport: route.dataValues.wayOfTransport,
			id: route.dataValues.id,
			destination,
			departure,
			company,
		};

		const user = await db.User.findOne({
			where: { id: review.dataValues.userId },
		});

		return {
			id: review.dataValues.id,
			departureTime: review.dataValues.departureTime,
			arrivalTime: review.dataValues.arrivalTime,
			comfortRating: review.dataValues.comfortRating,
			trafficRating: review.dataValues.trafficRating,
			generalRating: review.dataValues.generalRating,
			notes: review.dataValues.notes,
			route: hydratedRoute,
			user: user.dataValues,
		};
	} catch (err) {
		console.error(err);
		return null;
	}
};
