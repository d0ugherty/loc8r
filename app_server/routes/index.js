var express = require('express');
var router = express.Router();

const controllerLocations = require('../controllers/locations');
const controllerOthers = require('../controllers/others');
const controllerReviews = require("../../app_api/controllers/reviews");

/* Locations */
router.get('/', controllerLocations.homeList);
router.get('/location/:locationId', controllerLocations.locationInfo);
router
    .route('/location/:locationId/review/new')
    .get(controllerLocations.addReview)
    .post(controllerLocations.doAddReview);


/** Other */
router.get('/about', controllerOthers.about);

module.exports = router;
