const mongoose = require('mongoose');
const Location = mongoose.model('Location');
const reviewService = require('../services/reviewService');

const reviewCreate = async (req, res) => {
    const locationId = req.params.locationId;

    if(locationId) {
        try {
            const location = await Location.findById(locationId).select('name reviews');
            const review = await reviewService.addReview(req, res, location);
            return res.status(200).json(review);

        } catch (error) {

            return res.status(400).json({"message": error});
        }
    } else {
        return res.status(404).json({"message": "Location not found"});
    }
};

const reviewsReadOne = async (req, res) => {
    const locationId = req.params.locationId;
    const reviewId = req.params.reviewId;

    if (!mongoose.isValidObjectId(locationId) || !mongoose.isValidObjectId(reviewId)) {
        return res.status(400).json({"message": "Invalid MongoDB ObjectID"});
    }

    try {
        const review = await reviewService.getReview(locationId, reviewId);
        return res.status(200).json(review);
    } catch (error) {
        return res.status(404).json({"message": error});
    }
}

const reviewsUpdateOne = async (req, res) => {
    const id = req.params.locationId;

    if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(req.params.reviewId)) {
        return res.status(400).json({message: "Invalid ID"});
    } else {
        const review = await reviewService.updateReview(req, res, id);
        return res.status(200).json(review);
    }
}

const reviewsDeleteOne = async (req, res) => {
    const locId = req.params.locationId;
    const revId = req.params.reviewId;

    if(!mongoose.isValidObjectId(locId) || !mongoose.isValidObjectId(revId)) {
        return res.status(400).json({"message": "Invalid ID"});
    } else {
        await reviewService.deleteReview(res, locId, revId);
    }
}

module.exports = {
    reviewCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne,
}