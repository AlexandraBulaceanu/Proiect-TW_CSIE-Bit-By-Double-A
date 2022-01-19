const db = require("../models");
const { Sequelize } = require("sequelize");

module.exports.createReview = async (args) => {
	try {
		const review = await db.Review.create({
			departureTime: args.departureTime,
			arrivalTime: args.arrivalTime,
			comfortRating: args.comfortRating,
			trafficRating: args.trafficRating,
			generalRating: args.generalRating,
			notes: args.notes,
			routeId: args.routeId,
			userId: args.userId,
		});
        
        console.log(review)

		const route = await db.Route.findOne({ where: { id: args.routeId } });
		console.log(args.routeId)
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

		const user = await db.User.findOne({ where: { id: args.userId } });

		if (!user || !route) {
			review.destroy();
			throw "invalid id for review nested objects";
		}

		if (!user) {
			review.destroy();
			throw "invalid id for review nested objects";
		}

		return {
			id: Sequelize.UUIDV4,
			departureTime: review.dataValues.departureTime,
			arrivalTime: review.dataValues.arrivalTime,
			comfortRating: review.dataValues.comfortRating,
			trafficRating: review.dataValues.trafficRating,
			generalRating: review.dataValues.generalRating,
			notes: review.dataValues.notes,
			route: hydratedRoute,
			//routeId: review.dataValues.routeId,
			user: user.dataValues,
		};
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.updateReview = async (id, args) => {
	const { departureTime, arrivalTime, comfortRating, trafficRating, generalRating, notes } = args;

	try {

		/*const reviewToUpdate = await db.Review.findByPk(id);
        if (reviewToUpdate.dataValues.userId !== id) {
			return null;
		}*/

		await db.Review.update(
			{
				departureTime, 
				arrivalTime, 
				comfortRating, 
				trafficRating, 
				generalRating, 
				notes
			},
			{ where: { id } }
		);

		return await db.Review.findByPk(id);
	} catch (e) {
		console.error(e);
		return null;
	}

}

module.exports.deleteReview = async (id) => {
	//const { id } = args;
	console.log(id)
	try {
		const reviewToDelete = await db.Review.findOne({
			where: {
				id
			}
		});
		console.log(reviewToDelete)
		if (reviewToDelete == null) {
			return {
				status: "no review with said id",
			};
		}
		await db.sequelize.query("SET FOREIGN_KEY_CHECKS=0");
		reviewToDelete.destroy();
		console.log("sters")
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
		/*for (let review of reviews) {
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
		}*/
		return reviews;
	} catch (err) {
		console.error(err);
		return null;
	}
};

module.exports.getReview = async (id) => {
	try {
		const review = await db.Review.findOne({ where: { id } });
		console.log(review)
		/*const route = await db.Route.findOne({
			where: { id: review.dataValues.routeId },
		});*/

		/*const destination = await db.Location.findOne({
			where: { id: route.dataValues.destinationId },
		});
		const departure = await db.Location.findOne({
			where: { id: route.dataValues.departureId },
		});
		const company = await db.Company.findOne({
			where: { id: route.dataValues.companyId },
		});*/

		/*const hydratedRoute = {
			wayOfTransport: route.dataValues.wayOfTransport,
			id: route.dataValues.id,
			destination,
			departure,
			company,
		};*/

		/*const user = await db.User.findOne({
			where: { id: review.dataValues.userId },
		});*/

		return {
			id: review.dataValues.id,
			departureTime: review.dataValues.departureTime,
			arrivalTime: review.dataValues.arrivalTime,
			comfortRating: review.dataValues.comfortRating,
			trafficRating: review.dataValues.trafficRating,
			generalRating: review.dataValues.generalRating,
			notes: review.dataValues.notes,
			routeId: review.dataValues.routeId,
			userId: review.dataValues.userId
		};
	} catch (err) {
		console.error(err);
		return null;
	}
};


async function getAllReviewsAttributes(reviews) {
	const reviewsArr = [];
	for (let review of reviews) {
		try {
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
		} catch (err) {
			console.error(err);
		}
	}

	return reviewsArr;
}



module.exports.getAllReviewsByUser = async (userId) => {
	try { 
		const reviews = await db.Review.findAll({ where: { userId: userId }})
		//const reviewsArr = await getAllReviewsAttributes(reviews)
		
		return reviews;
	}
	catch(err){
		console.error(err)
		return null
	}
}

module.exports.getAllReviewsForCompany = async (companyId) => {
	try{
		const allReviews = await db.Review.findAll()
		const filteredReviews = []

		for (let review of allReviews){
			const route = await db.Route.findOne({
				where: { id: review.dataValues.routeId,
						 companyId : companyId },
			});
			if (route !== null){
				filteredReviews.push(review)
			}
		}
		//const reviewsArr = await getAllReviewsAttributes(filteredReviews);

		return filteredReviews	
	}
	catch(err){
		console.error(err)
		return null;
	}
}

module.exports.getAllReviewsForLocation = async (locationId) => {
	try{
		const allReviews = await db.Review.findAll()
		const filteredReviews = []

		for (let review of allReviews){
			const route = await db.Route.findOne({
				where: { id: review.dataValues.routeId,
						 destinationId : locationId },
			});
			if (route !== null){
				filteredReviews.push(review)
			}
		}
		//const reviewsArr = await getAllReviewsAttributes(filteredReviews);

		return filteredReviews	
	}
	catch(err){
		console.error(err)
		return null;
	}
}