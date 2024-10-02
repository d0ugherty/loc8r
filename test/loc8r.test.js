const mongoose = require('mongoose');
require('../app_api/models/locations');
const ObjectId = mongoose.Types.ObjectId;
const Location = mongoose.model('Location');
const request = require('supertest');
const express = require('express');
const app = require('../app.js');
const { expect } = require('chai');
const url = require("node:url");
const locationId1 = new ObjectId();
const locationId2 = new ObjectId();
const locationId3 = new ObjectId();

const reviewId1 = new ObjectId();
const reviewId2 = new ObjectId();

before(async () => {
    await mongoose.disconnect();
    await mongoose.connect('mongodb://localhost/loc8r-test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true
    });
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await Location.insertMany([
        {
            _id: locationId1,
            name: "Saxby's",
            address: "104 Kings Hwy E, Haddonfield, NJ 08033",
            rating: 4,
            coords: [-75.0374, 39.8995],
            facilities: ["Hot Drinks", "Hot Food", "Hot WiFi"],
            openingTimes: [
                { days: "Monday-Friday", opening: "07:00", closing: "19:00", closed: false },
                { days: "Saturday", opening: "07:00", closing: "17:00", closed: false },
                { days: "Sunday", opening: "07:00", closing: "17:00", closed: false }
            ],
            reviews: [
                {
                    _id: new ObjectId(),
                    author: "Bob Muffin",
                    rating: 5,
                    reviewText: "Best Chai Latte in the Greater Philadelphia Area",
                    createdOn: new Date("2024-02-14")
                }
            ]
        },
        {
            _id: locationId2,
            name: "Starbucks",
            address: "214 Kings Hwy E, Haddonfield, NJ 08033",
            rating: 5,
            coords: [-75.0372, 39.8993],
            facilities: ["Hot Drinks", "Hot Food", "Hot WiFi"],
            openingTimes: [
                { days: "Monday-Friday", opening: "06:00", closing: "21:00", closed: false },
                { days: "Saturday", opening: "07:00", closing: "20:00", closed: false },
                { days: "Sunday", opening: "07:00", closing: "19:00", closed: false }
            ],
            reviews: [
                {
                    _id: reviewId1,
                    author: "Jane Doe",
                    rating: 5,
                    reviewText: "Great coffee, but it's usually crowded during peak hours.",
                    createdOn: new Date("2024-09-10")
                },
                {
                    _id: reviewId2,
                    author: "John Smith",
                    rating: 5,
                    reviewText: "Friendly staff, but the WiFi can be a bit slow.",
                    createdOn: new Date("2024-09-12")
                }
            ]
        },
        {
            _id: locationId3,
            name: "Jersey Java",
            address: "140 Haddon Ave, Haddonfield, NJ 08033",
            rating: 4,
            coords: [-75.0380, 39.9000],
            facilities: ["Hot Drinks", "Hot Food", "Hot WiFi"],
            openingTimes: [
                { days: "Monday-Friday", opening: "07:00", closing: "18:00", closed: false },
                { days: "Saturday", opening: "08:00", closing: "16:00", closed: false },
                { days: "Sunday", opening: "08:00", closing: "15:00", closed: false }
            ],
            reviews: [
                {
                    _id: new ObjectId(),
                    author: "Alice Green",
                    rating: 5,
                    reviewText: "Cozy atmosphere with excellent coffee and pastries.",
                    createdOn: new Date("2024-08-15")
                },
                {
                    _id: new ObjectId(),
                    author: "Michael Brown",
                    rating: 4,
                    reviewText: "A quiet place to get some work done. Love the cold brew.",
                    createdOn: new Date("2024-08-20")
                }
            ]
        }
    ]);
    await Location.ensureIndexes();
});


/**
describe('GET /locations', function () {
    const url = '/api/locations';

    it("responds with 'success' status code", function(done) {
        request(app)
            .get(url)
            .end(function(err, res) {

                if(err) {
                    return done(err);
                }

                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it("responds with JSON", function(done) {
        request(app)
            .get(url)
            .end(function(err, res) {
                if(err) {
                    return done(err);
                }
                expect(res).not.to.be.undefined;
                expect(res).not.to.be.null;
                expect(res.type).to.equal('application/json');
                done();
            });
    });
});
**/

describe('GET /api/locations/:locationId', function() {
    const url= `/api/locations/${locationId1}`;

    it("responds with 'success status code", function(done) {
        request(app)
            .get(url)
            .end(function(err, res) {
                if(err) {
                    return done(err);
                }
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it("responds with JSON", function(done) {
        request(app)
            .get(url)
            .end(function(err, res) {
                if(err){
                    return done(err);
                }
                expect(res).not.to.be.undefined;
                expect(res).not.to.be.null;
                expect(res.type).to.equal('application/json');
                done();

            });
    });

    it("Has correct data", function(done) {
        request(app)
            .get(url)
            .end(function(err, res) {
                if(err){
                    return done(err)
                }
                expect(res.statusCode).to.equal(200);
                expect(res.body._id).to.equal(locationId1.toString());
                expect(res.body.name).to.equal("Saxby's");
                done();
            });
    });
});

describe('GET /api/locations/:locationId/reviews/:reviewId', function() {
    const url =`/api/locations/${locationId2}/reviews/${reviewId2}`;

    it("Responds with success status code", function(done) {
        request(app)
            .get(url)
            .end(function(err, res) {
                if(err) {
                    return done(err);
                }
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it("Responds with JSON", function(done) {
        request(app)
            .get(url)
            .end(function(err, res) {
                if(err) {
                    return done(err);
                }
                expect(res).not.to.be.undefined;
                expect(res).not.to.be.null;
                expect(res.type).to.equal('application/json');
                done();
            });
    });

    it("Responds with correct data", function(done) {
        request(app)
            .get(url)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.statusCode).to.equal(200);
                expect(res.body.review._id).to.equal(reviewId2.toString());
                expect(res.body.review.author).to.equal("John Smith");
                expect(res.body.review.rating).to.equal(5);
                expect(res.body.review.reviewText).to.equal("Friendly staff, but the WiFi can be a bit slow.");
                done();
            });
    });
});

describe('GET /api/locations?lng=&lat=&maxDistance=', function () {

    const url = '/api/locations/';
    console.log(url);

    it("responds with 'success' status code", function (done) {
        request(app)
            .get(url)
            .query({lng: -75.0374, lat: 39.8995, maxDistance: 1000})
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.statusCode).to.equal(200);
                done();
            });
    });

    it("responds with JSON", function (done) {
        request(app)
            .get(url)
            .query({lng: -75.0374, lat: 39.8995, maxDistance: 1000})
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.statusCode).to.equal(200);
                expect(res.type).to.equal('application/json');
                done();
            });
    });

    it("Responds with locations within maximum distance", function (done) {
        request(app)
            .get(url)
            .query({lng: -75.0374, lat: 39.8995, maxDistance: 1000})
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.above(0);
                done();
            });
    });

    it("Responds with no locations outside of maximum distance", function (done) {
        request(app)
            .get(url)
            .query({lng: -80.0008279, lat: 40.4400874, maxDistance: 1000})
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(0);
                done();
            });
    });
});

describe("POST /api/locations", function() {
    const url = "/api/locations";
    const validLocation = {
        name: "Durango Doug's",
        address:"123 Fake Street, Haddonfield, NJ 08033",
        facilities: ['Hot Drinks', 'Hot Food', 'Hot WiFi'],
        lng: -75.0374,
        lat: 39.8995,
        openingTimes:[
            { days: "Monday-Friday", opening: "07:00", closing: "19:00", closed: false },
            { days: "Saturday", opening: "07:00", closing: "17:00", closed: false },
            { days: "Sunday", opening: "07:00", closing: "17:00", closed: false }
        ],
    };

    const invalidLocation = {
        address:"123 Fake Street, Haddonfield, NJ 08033",
        facilities: ['Hot Drinks', 'Hot Food', 'Hot WiFi'],
        coords: [-75.0374, 39.8995],
        openingTimes:[
            { days: "Monday-Friday", opening: "07:00", closing: "19:00", closed: false },
            { days: "Saturday", opening: "07:00", closing: "17:00", closed: false },
            { days: "Sunday", opening: "07:00", closing: "17:00", closed: false }
        ],
    };

    it("responds with success status code and JSON document", async function() {
        try {
            const res = await request(app)
                .post(url)
                .send(validLocation)
                .expect(201);

            expect(res.body).not.to.be.undefined;
            expect(res.body).not.to.be.null;
        } catch(err){
            console.log(err);
            throw(err);
        }
    });

    it("Responds with 400 error status code with invalid data", async function(){

        const res = await request(app)
            .post(url)
            .send(invalidLocation)
            .expect(400);

        expect(res.body).not.to.be.undefined;
        expect(res.body).not.to.be.null;

    });

    it("Data is created", async function() {
        try {
            const res = await request(app)
                .post(url)
                .send(validLocation)
                .expect(201);

            expect(res.body).to.have.property('_id');
            expect(res.body.name).to.equal("Durango Doug's");
        } catch(err){
            console.log(err);
            throw(err);
        }
    });
})

describe("PUT /api/:locationId/reviews", function() {
    const validUrl = `/api/locations/${locationId2}/reviews`;
    const validReview = {
        author: "Silky Johnson",
        rating: 1,
        reviewText: "\"Let me tell you somethin' about this so-called 'coffee shop,' if you can even call it that. " +
            "I walked in, and the place was colder than an ex-wife’s heart and emptier than my will to care about your problems. " +
            "They call it a café—more like a low-budget scam to charge $5 for some bean water and a tablespoon of milk. " +
            "I asked for a cappuccino, and what did I get? A sad, lukewarm cup of regret that had more foam than substance. " +
            "I don’t know if they were tryin’ to sell me coffee or a cloud that missed leg day.\n" +
            "\n" +
            "The barista? I’ve seen more life in a DMV employee. She had the nerve to ask if I wanted room for cream. " +
            "Room? How 'bout you leave room for competence next time? And don’t even get me started on the Wi-Fi. " +
            "Took longer to connect than it took for me to realize I hated the place.\n" +
            "\n" +
            "I sat down to enjoy my drink, and some fool next to me was tapping away on his laptop like he was about to cure world hunger. " +
            "Newsflash, genius: your screenplay ain’t gonna make it. So yeah, one star... and that’s me bein' generous, because the true rating is zero."
    }

    const invalidReview = {
        rating: 1,
        reviewText: "\"Let me tell you somethin' about this so-called 'coffee shop,' if you can even call it that. " +
            "I walked in, and the place was colder than an ex-wife’s heart and emptier than my will to care about your problems. " +
            "They call it a café—more like a low-budget scam to charge $5 for some bean water and a tablespoon of milk. "
    }

    it("Location is updated with new review", function () {
        Location.findById(locationId2)
            .select('name reviews')
            .then(function (location) {

                if(!location){
                    console.log("Location in test not found");
                }

                const originalLength = location.reviews.length;

                const res = request(app)
                    .put(validUrl)
                    .send(validReview)
                    .expect(200);

                const newLength = location.reviews.length;

                expect(res.review).to.have.property('_id');
                expect(newLength).is.greaterThan(originalLength);
                expect(res.author).to.equal("Silky Johnson");
                expect(location.reviews[newLength -1].author).to.equal("Silky Johnson");
            });
    });

    it("Location rating is updated after new review", async function () {
        let location = await Location.findById(locationId2).select('name rating reviews');
        const oldRating = location.rating;

        const res = await request(app)
            .put(validUrl)
            .send(validReview)
            .expect(200);

        const parsedData = JSON.parse(res.text);

        location = await Location.findById(locationId2).select('name reviews rating');
        const newRating = parseInt(location.rating);

        expect(parsedData).to.have.property('_id');
        expect(parsedData.author).to.equal("Silky Johnson");
        expect(newRating).to.be.lessThan(oldRating);
        expect(newRating).to.equal(3);
    });

    it("Return unsuccessful code with invalid data", async function () {

        await request(app)
            .put(validUrl)
            .send(invalidReview)
            .expect(400);
    });
})
