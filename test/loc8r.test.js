const mongoose = require('mongoose');
require('../app_api/models/locations');
const ObjectId = mongoose.Types.ObjectId;
const Location = mongoose.model('Location');
const request = require('supertest');
const express = require('express');
const app = require('../app.js');
const { expect } = require('chai');

const locationId1 = new ObjectId();
const locationId2 = new ObjectId();
const locationId3 = new ObjectId();

const reviewId1 = new ObjectId();
const reviewId2 = new ObjectId();

before(async () => {
    await mongoose.disconnect();
    await mongoose.connect('mongodb://localhost/loc8r-test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
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
            rating: 3,
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
                    rating: 4,
                    reviewText: "Great coffee, but it's usually crowded during peak hours.",
                    createdOn: new Date("2024-09-10")
                },
                {
                    _id: reviewId2,
                    author: "John Smith",
                    rating: 3,
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
});

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
                expect(res.body.review.rating).to.equal(3);
                expect(res.body.review.reviewText).to.equal("Friendly staff, but the WiFi can be a bit slow.");
                done();
            });
    });
});

