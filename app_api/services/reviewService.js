const mongoose = require('mongoose');
const Location = mongoose.model('Location');

async function addReview(req, res, location) {
    try {
        location.reviews.push({
            author: req.body.author,
            reviewText: req.body.reviewText,
            rating: req.body.rating,
        });
        await location.save();

        await _updateRating(location._id);
        const review = location.reviews[location.reviews.length - 1];
        return review;
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

async function _updateRating(locationId) {
    try {
        let location = await Location.findById(locationId).select('name rating reviews');

        const count = location.reviews.length;
        const total = location.reviews.reduce(
            (accumulator, {rating}) => {
                return accumulator += rating
            }, 0);

        location.rating = parseInt(total / count, 10);
        await location.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addReview,
}