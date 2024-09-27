const mongoose = require('mongoose');
const Location = mongoose.model('Location');

const locationsListByDistance = async (req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const maxDistance = parseFloat(req.query.maxDistance);

    console.log(`LAT LON DISTANCE ${lng}, ${lat}, ${maxDistance}`);
    // construct the geoJSON
    const near = {
        type: "Point",
        coordinates: [lng, lat]
    };

    if(!lng || !lat) {
        return res.status(404).json({"message": "lng and lat parameters required"});
    }
    try {
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
                $limit: 10
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
        res.status(200).json(locations);
    } catch (err) {
        console.log(err);
        res.status(404).json({"message": "location not found"});
    }};

const locationsCreate = (req, res) => {
    res.status(201).json({
        "status" : "success",
    });
};

const locationsReadOne = (req, res) => {
    const id = req.params.locationId;
    Location.findById(id)
        .then(function (location) {

            if(!location){
                return res.status(404).json({"message": "Location not found"});
            }

            res.status(200).json(location);
    })
        .catch(function (error) {
            return res.status(404).json(error);
        });
};

const locationsUpdateOne = (req, res) => {
    res.status(200).json({
        "status" : "success",
    });
};

const locationsDeleteOne = (req, res) => {
    res.status(204).json({
        "status" : "success",
    });
};

module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
};