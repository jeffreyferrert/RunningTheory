const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Track = require('../models/Track')
const Comment = require('../models/Comment');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 5;
const NUM_SEED_TRACKS = 30;
const NUM_SEED_COMMENTS = 2;

const addresses= ["123 Riverside Drive, New York City", "456 West End Avenue, New York City", "789 Harlem Lane, New York City", "101 East 110th Street, New York City", "222 Morningside Heights, New York City", "333 Upper West Side, New York City", "444 Washington Heights, New York City", "555 Lenox Hill, New York City", "666 Yorkville Avenue, New York City", "777 East Harlem, New York City", "888 Central Park North, New York City", "999 Columbus Circle, New York City", "111 Lincoln Square, New York City", "222 Hudson Heights, New York City", "333 Manhattan Valley, New York City", "444 East 96th Street, New York City", "555 Sutton Place, New York City", "666 Inwood Hill Park, New York City", "777 Carnegie Hill, New York City", "888 Roosevelt Island, New York City", "999 Gramercy Park, New York City", "111 Lenox Avenue, New York City", "222 Battery Park City, New York City", "333 Astor Row, New York City", "444 Peter Cooper Village, New York City", "555 Tudor City, New York City", "666 East River Plaza, New York City", "777 Stuyvesant Town, New York City", "888 Chelsea Waterside Park, New York City", "999 York Avenue, New York City", "111 Hamilton Heights, New York City", "222 West 87th Street, New York City", "333 Sutton Place South, New York City", "444 East End Avenue, New York City", "555 Randalls Island, New York City", "666 Fort George, New York City", "777 Lower East Side, New York City", "888 Kips Bay, New York City", "999 Marcus Garvey Park, New York City", "111 Waterside Plaza, New York City", "222 Tudor City Place, New York City", "333 East River Esplanade, New York City", "444 Chelsea Piers, New York City", "555 Frederick Douglass Boulevard, New York City", "666 West 96th Street, New York City", "777 Randalls Island Park, New York City", "888 St. Nicholas Avenue, New York City", "999 Wards Island, New York City", "111 East 84th Street, New York City", "222 Harlem River Park, New Yor City"]

// Create users
const users = [];

users.push(
    new User({
        username: 'demo-user',
        email: 'demo-user@appacademy.io',
        hashedPassword: bcrypt.hashSync('starwars', 10)
    }),

    new User({
        username: 'user',
        email: "123@123.com",
        hashedPassword: bcrypt.hashSync('password', 10)
    })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    users.push(
        new User({
            username: faker.internet.userName({ firstName, lastName }),
            email: faker.internet.email({ firstName, lastName }),
            hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
        })
    )
}

// Create tracks
const tracks = [];

for (let i = 0; i < NUM_SEED_TRACKS; i++) {
    tracks.push(
        new Track({
            author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
            name: faker.vehicle.manufacturer() + " Track",
            location: "New York City",
            miles: faker.number.int({ min: 0, max: 100 }),
            description: faker.hacker.phrase(),
            startAddress: addresses[Math.floor(Math.random() * 50) + 1],
            endAddress: addresses[Math.floor(Math.random() * 50) + 1]
        })
    )
}

//Create Comments
const comments = []
for (let i = 0; i < NUM_SEED_COMMENTS; i++) {
    comments.push(
        new Comment({
            author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
            track: tracks[0]._id,
            description: faker.hacker.phrase()
        })
    )
}

// Connect to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        insertSeeds();
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });

// Reset and seed db
const insertSeeds = () => {
    console.log("Resetting db and seeding users...");

    User.collection.drop()
        .then(() => Track.collection.drop())
        .then(() => Comment.collection.drop())
        .then(() => User.insertMany(users))
        .then(() => Track.insertMany(tracks))
        .then(() => Comment.insertMany(comments))
        .then(() => {
            console.log("Done!");
            mongoose.disconnect();
        })
        .catch(err => {
            console.error(err.stack);
            process.exit(1);
        });
}


