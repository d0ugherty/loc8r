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

const reviewsReadOne = (req, res) => {
    const locationId = req.params.locationId;
    const reviewId = req.params.reviewId;

    console.log(locationId);
    Location.findById(locationId)
        .select('name reviews')
        .then(function (location) {

            if (!location) {
                return res.status(404).json({"message": "Location not found"});
            }

            const review = location.reviews.id(reviewId);

            if(!review){
                return res.status(404).json({"message": "Review not found"});
            }

            let response = {
                location: {
                    name: location.name,
                    id: locationId
                },
                review
            }

            return res.status(200).json(response);

        })
        .catch(function (error) {
            return res.status(404).json(error);
        });
}

const reviewsUpdateOne = async (req, res) => {
    const id = req.params.locationId;
    const location = await Location.findById(id).select('name reviews');

    if(location) {
        try {
            if(location.reviews && location.reviews.length > 0){
                const currentReview = location.reviews.id(req.params.reviewId);

                if(!currentReview){
                    return res.status(404).json({"message": "Review not found"});
                } else {
                    currentReview.author = req.body.author;
                    currentReview.rating = req.body.rating;
                    currentReview.reviewText = req.body.reviewText;
                    await location.save();
                    await reviewService.updateRating(location._id);
                    return res.status(200).json(currentReview);
                }
            } else {
                return res.status(404).json({"message": "No reviews to update"});
            }
        } catch (error) {
            return res.status(404).json(error);
        }
    } else {
        return res.status(404).json({"message": "Location not found"});
    }
}

const reviewsDeleteOne = (req, res) => {
    res.status(204).json({
        "status" : "success",
    });
}

module.exports = {
    reviewCreate,
    reviewsReadOne,
    reviewsUpdateOne,
    reviewsDeleteOne,
}