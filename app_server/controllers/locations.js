const homeList = (req, res) => {
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with WiFi',
        pageHeader : {
            title: 'Loc8r',
            strapLine: 'Find a place to work with WiFi near you!',
        },
        locations: [
            {
                name: "Saxby's",
                address: "104 Kings Hwy E, Haddonfield, NJ 08033",
                rating: 4,
                facilities: ['Hot Drinks', 'Hot Food', 'Hot WiFi'],
                distance: '100m'
            },
            {
                name: "Starbucks",
                address: "214 Kings Hwy E, Haddonfield, NJ 08033",
                rating: 3,
                facilities: ['Hot Drinks', 'Hot Food', 'Hot WiFi'],
                distance: '200m'
            },
            {
                name: "Jersey Java",
                address: "140 Haddon Ave, Haddonfield, NJ 08033",
                rating: 4,
                facilities: ['Hot Drinks', 'Hot Food', 'Hot WiFi'],
                distance: '300m'
            }
        ],
        sidebar: 'Loc8r helps you find places to work when out and about. '
    });
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
                    lon: -75.0336839
                }
            },
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        }
    });
};

const addReview = (req, res) => {
    res.render('location-review-form', { title: 'Add Review' });
}

module.exports = {
    homeList,
    locationInfo,
    addReview
};