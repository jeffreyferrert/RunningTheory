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
            username: faker.internet.userName({firstName, lastName}),
            email: faker.internet.email({firstName, lastName}),
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
            name: faker.hacker.phrase(),
            location: faker.location.city(),
            miles: faker.number.int({ min: 0, max: 100 }),
            description: faker.hacker.phrase()
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