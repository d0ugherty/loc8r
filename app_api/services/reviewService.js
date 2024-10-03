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

        await updateRating(location);
        const review = location.reviews[location.reviews.length - 1];
        return review;
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

async function updateReview(req, res, locationId) {
    const location = await Location.findById(locationId).select('name rating reviews');

    if (location) {
        try {
            if (location.reviews && location.reviews.length > 0){
                const currentReview = location.reviews.id(req.params.reviewId);

                if (!currentReview){
                    return res.status(404).json({"message": "Review not found"});
                } else {

                    if (req.body.author !== undefined) {
                        currentReview.author = req.body.author;
                    }
                    if (req.body.rating !== undefined) {
                        currentReview.rating = req.body.rating;
                    }
                    if (req.body.reviewText !== undefined) {
                        currentReview.reviewText = req.body.reviewText;
                    }
                    await location.save();
                    await updateRating(location);
                    return currentReview;
                }
            } else {
                return res.status(404).json({"message": "No reviews to update"});
            }
        } catch (error) {
            console.log(error);
            return res.status(404).json(error);
        }
    } else {
        return res.status(404).json({"message": "Location not found"});
    }
}

async function deleteReview(res, locationId, reviewId){
    const location = await Location.findById(locationId).select('name rating reviews');
    try {
        if (location) {
            const reviews = location.reviews
            if (reviews && reviews.length > 0){
                const review = reviews.id(reviewId);
                if (review) {
                    reviews.pull(reviewId);
                    await updateRating(location);
                    return res.status(204).json({"message": "Review deleted"});
                } else {
                    return res.status(404).json({"message": "Review not found"});
                }
            } else {
                return res.status(404).json({"message": "No reviews to delete"});
            }
        } else {
            return res.status(404).json({"message": "Location not found"});
        }
    } catch (error) {
        console.log(error);
    }
}

async function updateRating(location) {
    try {
        const count = location.reviews.length;
        const total = location.reviews.reduce(
            (accumulator, {rating}) => {
                return accumulator + rating
            }, 0);

        location.rating = parseInt(total / count, 10);
        await location.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    addReview,
    updateReview,
    deleteReview
}