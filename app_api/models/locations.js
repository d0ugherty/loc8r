const mongoose = require("mongoose");

const openingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    }
});

const reviewSchema = new mongoose.Schema({
    author: String,
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 5
    },
    reviewText: String,
    createdOn: {
        type: Date,
        'default': Date.now
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    }
});

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 5
    },
    coords: {
        type: [Number],
        index : '2dsphere'
    },
    facilities: [String],
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema],
});

module.exports = mongoose.model('Location', locationSchema);