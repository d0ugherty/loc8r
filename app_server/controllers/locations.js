const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000',
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://sleepy-mountain-06531-6c73a5d5bff4.herokuapp.com/';
}

const renderHomepage = (req, res, responseBody) => {
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with WiFi',
        pageHeader: {
            title: 'Loc8r',
            strapLine: 'Find a place to work with WiFi near you!',
        },
        sidebar: "This is the sidebar",
        locations: responseBody
    });
    console.log(responseBody);
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
    res.render('location-info', {
        title: 'Loc8r - find a place to work with WiFi',
            pageHeader : {
                title: 'Loc8r',
                strapLine: 'Find a place to work with WiFi near you!',
        },
        location:
            {
                name: "Saxby's",
                address: "104 Kings Hwy E, Haddonfield, NJ 08033",
                openingTimes: [
                    {
                        days: 'Monday - Friday',
                        opening: '7:00am',
                        closing: '7:00pm',
                        closed: false
                    },
                    {
                        days: 'Saturday',
                        opening: '8:00am',
                        closing: '5:00pm',
                        closed: false
                    },
                    {
                        days: 'Sunday',
                        closed: true
                    }
                ],
                rating: 4,
                facilities: ['Hot Drinks', 'Hot Food', 'Hot WiFi'],
                distance: '100m',
                reviews: [
                    {
                        author: "Bob Muffin",
                        rating: 4,
                        timestamp: "14 February 2024",
                        reviewText: "Best Chai Latte in the Greater Philadelphia Area"
                    },
                    {
                        author: "John Smith",
                        rating: 3,
                        timestamp: "12 September 2024",
                        reviewText: "Friendly staff, but the WiFi can be a bit slow."
                    }
                ],
                coords: {
                    lat: 39.8959107,
                    lon: 1
                }
            },
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        }
    });
};

const addReview = (req, res) => {
    res.render('location-review-form', {
        title: 'Add Review',
        pageHeader: { title: "Review Saxby's" }
    });
}

module.exports = {
    homeList,
    locationInfo,
    addReview
};