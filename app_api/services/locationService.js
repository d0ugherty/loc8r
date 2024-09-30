const mongoose = require('mongoose');
const Location = mongoose.model('Location');

async function buildLocationList(maxDistance, limit, near){
    const results = await Location.aggregate([
        {
            $geoNear: {
                near,
                distanceField: "distance.calculated",
                key: 'coords',
                spherical: true,
                maxDistance: maxDistance,
            },
        },
        {
            $limit: limit
        }
    ]);

    const locations = results.map(result => { // create new array to hold mapped results data
        return {
            id: result._id,
            name: result.name,
            address: result.address,
            rating: result.rating,
            facilities: result.facilities,
            distance: `${result.distance.calculated.toFixed()}m` // get distance and fix it to nearest integer
        }
    });

    return locations;
}

function buildLocationData(req){
    try {
        const data = {
            name: req.body.name,
            address: req.body.address,
            facilities: req.body.facilities,
            coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
            openingTimes: []
        };

        if (Array.isArray(req.body.openingTimes)) {
            req.body.openingTimes.forEach((openingTime) => {
                data.openingTimes.push({
                    days: openingTime.days,
                    opening: openingTime.opening,
                    closing: openingTime.closing,
                    closed: openingTime.closed,
                });
            });
        }
        return data;
    } catch(err) {
        throw(err);
    }
}

module.exports = {
    buildLocationList,
    buildLocationData
};