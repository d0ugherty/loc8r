const dir = "/run/media/thom/data/repos/loc8r/test/addData.js"

db.locations.insertMany([
    {
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
                author: "Bob Muffin",
                rating: 5,
                reviewText: "Best Chai Latte in the Greater Philadelphia Area",
                createdOn: new Date("2024-02-14")
            }
        ]
    },
    {
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
                author: "Jane Doe",
                rating: 4,
                reviewText: "Great coffee, but it's usually crowded during peak hours.",
                createdOn: new Date("2024-09-10")
            },
            {
                author: "John Smith",
                rating: 3,
                reviewText: "Friendly staff, but the WiFi can be a bit slow.",
                createdOn: new Date("2024-09-12")
            }
        ]
    },
    {
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
                author: "Alice Green",
                rating: 5,
                reviewText: "Cozy atmosphere with excellent coffee and pastries.",
                createdOn: new Date("2024-08-15")
            },
            {
                author: "Michael Brown",
                rating: 4,
                reviewText: "A quiet place to get some work done. Love the cold brew.",
                createdOn: new Date("2024-08-20")
            }
        ]
    }
]);
