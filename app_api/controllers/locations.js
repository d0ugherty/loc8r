const mongoose = require('mongoose');
const Location = mongoose.model('Location');
const locService = require('../services/locationService');

const locationsListByDistance = async (req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const maxDistance = parseFloat(req.query.maxDistance);
    const limit = 10;
    // construct the geoJSON
    const near = {
        type: "Point",
        coordinates: [lng, lat]
    };

    if(!lng || !lat) {
        return res.status(404).json({"message": "lng and lat parameters required"});
    }

    try {
        const locations = await locService.buildLocationList(maxDistance, limit, near);
        res.status(200).json(locations);

    } catch (err) {

        res.status(404).json({"message": "location not found"});

    }};

const locationsCreate = async (req, res) => {
    const data = locService.buildLocationData(req);
    try {
        const location = await Location.create(data);
        res.status(201).json(location);
    } catch(err){
        console.log(err);
        res.status(400).json({"message": "location not created"});
    }
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

const locationsUpdateOne = async (req, res) => {
    const id = req.params.locationId;

    if (!id) {
        return res.status(400).json({ "message": "Location ID is required" });
    }

    let location = await Location.findById(id);
    try {
        if (!location) {
            return res.status(404).json({"message": "location not found"});
        }

        location = await locService.updateLocationData(req, location);

        return res.status(200).json(location);
    } catch (error){
        return res.status(400).json({"message": error});
    }
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