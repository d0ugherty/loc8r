var express = require('express');
var router = express.Router();

const controllerLocations = require('../controllers/locations');
const controllerOthers = require('../controllers/others');

/* Locations */
router.get('/', controllerLocations.homeList);
router.get('/location', controllerLocations.locationInfo);
router.get('/location/review/new', controllerLocations.addReview);

/** Other */
router.get('/about', controllerOthers.about);

module.exports = router;
