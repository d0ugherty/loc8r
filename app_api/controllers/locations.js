const mongoose = require('mongoose');
const Location = mongoose.model('Location');

const locationsListByDistance = (req, res) => {
    res.status(200).json({
        "status" : "success",
    });
};

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