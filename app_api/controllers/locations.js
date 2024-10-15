const mongoose = require('mongoose');
const Location = mongoose.model('Location');
const locService = require('../services/locationService');

const locationsListByDistance = async (req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const maxDistance = parseFloat(req.query.maxDistance);

    if(!lng && lng !== 0 || !lat && lat !== 0) {
        return res.status(400).json({"message": "lng and lat parameters required"});
    }

    try {
        const nearLocations = await locService.getNearLocations(lng, lat, maxDistance);
        const locations = await locService.buildLocationList(nearLocations);
        res.status(200).json(locations);
    } catch (err) {
        console.log(err);
        res.status(404).json({"message": err});
    }};

const locationsCreate = async (req, res) => {
    try {
        const data = locService.buildLocationData(req);
        const location = await locService.createLocation(data);
        res.status(201).json(location);
    } catch(err){
        console.log(err);
        res.status(400).json({"message": "location not created"});
    }
};

const locationsReadOne = async (req, res) => {
    const id = req.params.locationId;

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({"message": "Invalid MongoDB ObjectID"});
    } else {
        try {
            const location = await locService.getLocation(req, res, id);
            return res.status(200).json(location);
        } catch (error) {
            return res.status(404).json({"message" : error});
        }
    }
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

const locationsDeleteOne = async (req, res) => {
    const id = req.params.locationId;

    if(!mongoose.isValidObjectId(id)) {
        return res.status(400).json({"message": "Invalid ID"});
    } else {
        return await locService.deleteLocation(req, res, id);
    }
};

module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
};