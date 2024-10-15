const express = require('express');
const router = express.Router();

const controllerLocations = require("../controllers/locations");
const controllerReviews = require("../controllers/reviews");

router
    .route('/locations')
    .get(controllerLocations.locationsListByDistance)
    .post(controllerLocations.locationsCreate);

router
    .route('/locations/:locationId')
    .get(controllerLocations.locationsReadOne)
    .put(controllerLocations.locationsUpdateOne)
    .delete(controllerLocations.locationsDeleteOne);

router
    .route('/locations/:locationId/reviews')
    .post(controllerReviews.reviewCreate);

router
    .route('/locations/:locationId/reviews/:reviewId')
    .get(controllerReviews.reviewsReadOne)
    .put(controllerReviews.reviewsUpdateOne)
    .delete(controllerReviews.reviewsDeleteOne);

module.exports = router;