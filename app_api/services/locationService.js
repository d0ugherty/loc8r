const mongoose = require('mongoose');
const res = require("express/lib/response");
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

async function updateLocationData(req, location){
    try {
        if (req.body.name !== undefined) {
            location.name = req.body.name;
        }
        if (req.body.address !== undefined) {
            location.address = req.body.address;
        }
        if(req.body.rating !== undefined) {
            location.rating = req.body.rating;
        }
        if (req.body.facilities !== undefined) {
            location.facilities = req.body.facilities;
        }

        if (req.body.lng !== undefined && req.body.lat !== undefined) {
            location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        }

        if (req.body.openingTimes !== undefined) {
            location.openingTimes = [];

            if (Array.isArray(req.body.openingTimes)) {
                req.body.openingTimes.forEach((openingTime) => {
                    location.openingTimes.push({
                        days: openingTime.days,
                        opening: openingTime.opening,
                        closing: openingTime.closing,
                        closed: openingTime.closed,
                    });
                });
            }
        }
        await location.save();
        return Location.findById(location._id);
    } catch (err){
        console.log(err);
    }
}

async function deleteLocation(req, res, locationId){
    try {
        await Location.findByIdAndDelete(locationId);
        return res.status(204).json({"message": "Location deleted"});
    } catch (err) {
        console.log(err);
        return res.status(404).json({"message": err});
    }
}

module.exports = {
    buildLocationList,
    buildLocationData,
    deleteLocation,
    updateLocationData
};