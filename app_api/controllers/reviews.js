const mongoose = require('mongoose');
const Location = mongoose.model('Location');

const reviewCreate = (req, res) => {
    res.status(201).json({
        "status" : "success",
    });
}

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

const reviewsUpdateOne = (req, res) => {
    res.status(200).json({
        "status" : "success",
    });
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