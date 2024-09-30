const mongoose = require('mongoose');
const Location = mongoose.model('Location');

function addReview(req, res, location) {
    let review;

    location.reviews.push({
        author: req.body.author,
        reviewText: req.body.reviewText,
        rating: req.body.rating,
    });

    location.save((err, location) => {
        if (err) {
            res.status(400).json({"message": err});
        } else {
            review = location.reviews[location.reviews.length - 1];
        }
    });
    return review;
}

function _updateRating(locationId){
    let location = Location.findById(locationId);
    let total = 0;

    for(let review of location.reviews){
        
    }
}

module.exports = {
    addReview
}