const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000',
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://sleepy-mountain-06531-6c73a5d5bff4.herokuapp.com/';
}

const renderHomepage = (req, res, responseBody) => {
    let message = null;

    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody = [];
    } else if (!responseBody.length) {
        message = "No places found nearby.";
    }

    res.render('locations-list', {
        title: 'Loc8r - find a place to work with WiFi',
        pageHeader: {
            title: 'Loc8r',
            strapLine: 'Find a place to work with WiFi near you!',
        },
        sidebar: "This is the sidebar",
        locations: responseBody,
        message
    });
};

const homeList = (req, res) => {
    const path = '/api/locations';
    
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        qs: {
            lng: -75.0351117,
            lat: 39.8963309,
            maxDistance: 20000
        }
    };

    request(
        requestOptions,
        (err, response, body) => {
            renderHomepage(req, res, body);
        }
    );
};


const locationInfo = (req, res) => {
    const renderCallBack = (req, res, responseData) => {
        _renderDetailsPage(req, res, responseData);
    };
    _getLocationInfo(req, res, renderCallBack)
};

const addReview = (req, res) => {
    const renderCallBack = (req, res, responseData) => {
        _renderReviewForm(req, res, responseData);
    };
    _getLocationInfo(req, res, renderCallBack);
}

const doAddReview = (req, res) => {
    const locationId = req.params.locationId;
    const path = `/api/locations/${locationId}/reviews`;

    const postData = {
        author: req.body.name,
        rating: parseInt(req.body.rating, 10),
        reviewText: req.body.reviewText,
    };

    console.log(`POST DATA: ${postData.author}, ${postData.reviewText}, ${postData.rating}`); 

    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postData
    };

    request(
        requestOptions,
        (err, {statusCode}, body) => {
            if (statusCode === 201) {
                res.redirect(`/location/${locationId}`);
            } else {
                _showError(req, res, statusCode);
            }
        }
    );
};

/** Private Functions **/

const _renderDetailsPage = (req, res, location) => {
    res.render('location-info', {
        title: location.name,
        pageHeader: {
            title: location.name
        },
        sidebar: {
            context: 'is on Loc8r because it has accessible WiFi and space to sit down with your laptop and ' +
                'get some work done.',
            callToAction: "If you've been here before and you like it - or don't - please leave a review!"
        },
        location: location
    });
};

const _renderReviewForm = (req, res, {name}) => {
    res.render('location-review-form', {
        title: `Review ${name} on Loc8r`,
        pageHeader: {title: `Review ${name}`}
    });
}

const _showError = function (req, res, status) {
    let title = '';
    let content = '';
    if (status === 404) {
        title = `404, page not found`;
        content = "Can't find the page ¯\\_(ツ)_/¯";
    } else {
        title = `${status}, something's broken`;
        content = "Something is broken somewhere";
    }
    res.status(status);
    res.render('generic-text', {
        title: title,
        content: content,
    });
};

const _getLocationInfo = (req, res, callback) => {
    const path = `/api/locations/${req.params.locationId}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };

    request(
        requestOptions,
        (err, response, body) => {
            const data = body;
            if (response.statusCode === 200) {
                data.coords = {
                    lng: body.coords[0],
                    lat: body.coords[1]
                };
                callback(req, res, data);
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

module.exports = {
    homeList,
    locationInfo,
    addReview,
    doAddReview
};