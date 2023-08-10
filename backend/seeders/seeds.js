const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Track = require('../models/Track')
const Comment = require('../models/Comment');
const Time = require('../models/Time')
const Event = require('../models/Event')
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');


const NUM_SEED_USERS = 5;
const NUM_SEED_TRACKS = 7;
const NUM_SEED_COMMENTS = 20;
const NUM_SEED_TIMES = 20;

const addresses = ["123 Riverside Drive, New York City", "456 West End Avenue, New York City", "789 Harlem Lane, New York City", "101 East 110th Street, New York City", "222 Morningside Heights, New York City", "333 Upper West Side, New York City", "444 Washington Heights, New York City", "555 Lenox Hill, New York City", "666 Yorkville Avenue, New York City", "777 East Harlem, New York City", "888 Central Park North, New York City", "999 Columbus Circle, New York City", "111 Lincoln Square, New York City", "222 Hudson Heights, New York City", "333 Manhattan Valley, New York City", "444 East 96th Street, New York City", "555 Sutton Place, New York City", "666 Inwood Hill Park, New York City", "777 Carnegie Hill, New York City", "888 Roosevelt Island, New York City", "999 Gramercy Park, New York City", "111 Lenox Avenue, New York City", "222 Battery Park City, New York City", "333 Astor Row, New York City", "444 Peter Cooper Village, New York City", "555 Tudor City, New York City", "666 East River Plaza, New York City", "777 Stuyvesant Town, New York City", "888 Chelsea Waterside Park, New York City", "999 York Avenue, New York City", "111 Hamilton Heights, New York City", "222 West 87th Street, New York City", "333 Sutton Place South, New York City", "444 East End Avenue, New York City", "555 Randalls Island, New York City", "666 Fort George, New York City", "777 Lower East Side, New York City", "888 Kips Bay, New York City", "999 Marcus Garvey Park, New York City", "111 Waterside Plaza, New York City", "222 Tudor City Place, New York City", "333 East River Esplanade, New York City", "444 Chelsea Piers, New York City", "555 Frederick Douglass Boulevard, New York City", "666 West 96th Street, New York City", "777 Randalls Island Park, New York City", "888 St. Nicholas Avenue, New York City", "999 Wards Island, New York City", "111 East 84th Street, New York City", "222 Harlem River Park, New Yor City"]

const descriptions1 = ["Embark on a captivating urban adventure through NYCs most iconic sights.Begin at Times Square, pass by Central Parks serene pathways, and continue along Fifth Avenues elegant shops before concluding your invigorating journey back in the dazzling lights of Times Square.", "Lace up your sneakers and explore the citys vibrant neighborhoods.Start at the historic Flatiron Building, weave through Chelseas art galleries, and enjoy the scenic High Line Park, ending your satisfying workout where you started.", "Discover the citys rich history on this intriguing track.Commence at the Statue of Liberty, meander through Wall Streets financial district, and wind your way up through the charming streets of Tribeca, finally returning to the iconic statue.", "Experience the perfect balance of nature and urban energy.Start your run in Central Parks Reservoir Loop, enjoy the serene Jacqueline Kennedy Onassis Reservoir, and then head down to Columbus Circle and bustling Broadway, completing your revitalizing run in the heart of the park.", "Uncover NYCs cultural gems on this enriching track.Begin at the Metropolitan Museum of Art, explore the artistic allure of the Upper West Side, and make your way through the historic streets of Harlem, ultimately circling back to the museum.", "Immerse yourself in the citys diversity as you follow this dynamic track.Kick off your walk in Little Italy, admire the architecture of SoHos cast - iron buildings, and then venture towards the picturesque Hudson River Park.Conclude your journey back in the lively streets of Little Italy.", "Embrace the waterfront beauty on this refreshing track.Start at Battery Parks harbor views, run along the Hudson River Greenway, and experience the tranquility of Riverside Park, concluding your journey back at Battery Park.", "This track offers a taste of NYCs culinary and cultural delights.Begin in Koreatown, explore the vibrant streets of Midtown Manhattan, and end your adventure near the famous Grand Central Terminal.", "Journey through historic and modern NYC on this captivating track.Commence in the charming West Village, explore the architectural wonders of the Flatiron District, and embrace the vibrant energy of Times Square, circling back to the West Villages quaint streets."]

const descriptions2 = ["Experience a scenic city escape on this revitalizing track.Start at the Brooklyn Bridge, cross the East River with stunning views of Manhattan, and continue along the Brooklyn Heights Promenade before looping back to the bridge.", "Explore NYCs artistic side on this creative track.Begin at the Museum of Natural History, wander through the bohemian streets of the East Village, and soak in the contemporary art scene of Chelsea, ultimately returning to the museum.", "Discover the citys green oases on this refreshing track.Start at Bryant Parks lush gardens, continue through the peaceful oasis of Gramercy Park, and finally loop back to Bryant Park, feeling recharged and connected to nature.", "Immerse yourself in the charming neighborhoods of NYC.Begin in the historic Lower East Side, meander through the quaint streets of Greenwich Village, and experience the cosmopolitan energy of Union Square, concluding your journey where it all began.", "Engage with the citys architectural wonders on this inspiring track.Start at the One World Trade Center, explore the historic streets of TriBeCa, and marvel at the modern structures of Hudson Yards, ultimately returning to the iconic skyscraper.", "This track offers a culinary and cultural exploration of NYC.Begin in Chinatown, savor the aromas of Little Italy, and then head uptown to Harlem for a taste of soul food, ending your journey near the bustling streets of Chinatown.", "Embrace the citys riverside beauty on this serene track.Start at the East River Esplanade, enjoy the picturesque views of the Brooklyn Bridge, and continue through the peaceful East Side, ultimately returning to the esplanade.", "Discover the citys literary history on this enlightening track.Begin at the New York Public Library, explore the intellectual charm of the Upper West Side, and wind your way through the storied streets of the West Village, circling back to the library.", "Engage in a scenic nature escape within the city.Start at Prospect Parks peaceful trails, follow the enchanting pathways of Greenwood Cemetery, and return to Prospect Park, feeling refreshed and connected to the outdoors.", "Experience a cultural and artistic journey through NYC.Begin at the Guggenheim Museum, traverse through the bohemian streets of the East Village, and immerse yourself in the creative vibes of Williamsburg, ultimately returning to the museum."]

const descriptions3 = ["Uncover the citys maritime history on this captivating track.Start at South Street Seaport, follow the historic paths of the Financial District, and continue along the Hudson River, eventually looping back to the seaport.", "Immerse yourself in the beauty of Central Park on this revitalizing track.Begin at the Bow Bridge, explore the parks winding trails, and make your way to the serene Conservatory Garden before completing your journey at the Bow Bridge.", "Discover the citys architectural diversity on this inspiring track.Start at the iconic Flatiron Building, explore the historic streets of NoHo, and marvel at the skyscrapers of Midtown Manhattan, concluding your journey near the Flatiron Building.", "Embrace the cultural fusion of NYC on this enriching track.Begin in the vibrant neighborhood of Jackson Heights, explore the diverse streets of Flushing, and experience the international flair of Times Square, ultimately returning to Jackson Heights.", "Journey through the citys iconic landmarks on this captivating track.Start at Rockefeller Center, pass by St.Patricks Cathedral, and continue through Central Parks meandering paths before circling back to the Rockefeller Center.", "Experience the citys dynamic waterfront on this invigorating track.Begin at the Williamsburg Bridge, enjoy the views of the East River, and explore the vibrant neighborhoods of DUMBO and Brooklyn Heights before concluding your journey at the bridge.", "Immerse yourself in the citys cultural tapestry on this diverse track.Start in the heart of Harlem, explore the artistic charm of the Upper West Side, and experience the bustling streets of Times Square, eventually returning to Harlem.", "Engage with NYCs historic and modern sites on this enlightening track.Begin at the New York Historical Society, explore the architectural wonders of the Flatiron District, and embrace the contemporary vibes of the Meatpacking District, circling back to the society.", "Discover the citys hidden gems on this enchanting track.Start in the enchanting Washington Square Park, explore the charming streets of the West Village, and meander through the artistic allure of Chelsea, concluding your journey back at the park.", "Embrace the citys natural beauty on this rejuvenating track.Begin at Hudson River Parks serene pathways, follow the tranquil Hudson River Greenway, and return to the park, feeling refreshed and rejuvenated."]

const commentp = ["Such an iconic route, passing through the heart of the citys vibrant energy.", "Love the mix of urban sights and scenic pathways a runners paradise.", "A historical journey through the heart of NYC, with so much to explore.", "Central Parks beauty combined with city bustle an ideal jogging escape.", "An artistic adventure with a blend of culture and urban charm.", "A journey through cultures and neighborhoods NYCs diversity in every step.", "Running by the riverbanks offers a peaceful escape in the midst of the city.", "A culinary and cultural fusion that keeps you motivated and engaged.", "An architectural wonderland waiting to be explored on foot.", "A picturesque run with breathtaking views the Brooklyn Bridge at its best.", "Discover the citys hidden literary treasures with every stride.", "Nature meets city life a refreshing track for body and soul.", "Experience the citys diverse energy while keeping active what a treat.", "An architectural journey that unveils the citys rich history and modernity.", "A mouthwatering adventure with a taste of NYCs finest neighborhoods.", "Riverside tranquility combined with vibrant urban exploration simply amazing.", "Every step is a page of NYCs story, from the library to the East Village.", "Historic charm and modernity blend seamlessly on this captivating route.", "A cultural immersion that showcases NYCs neighborhoods at their best.", "From iconic landmarks to peaceful parks this track has it all.", "Central Parks beauty never disappoints, a perfect run through natures heart.", "Architectural wonders and city streets an inspiring route for any runner.", "A culinary adventure that takes you through the flavors of the city.", "A remarkable journey through history and urban allure a must-try.", "East River views and vibrant neighborhoods make this run unforgettable.", "Diverse neighborhoods and cultural hubs combine for an enriching experience.", "Historical landmarks and modern vibes a fascinating route for explorers.", "Discover hidden gems and artistic charm with every stride.", "Natures embrace within the city a perfect blend for a refreshing run.", "Art, culture, and scenic beauty this track has something for everyone.", "An artistic and cultural journey that keeps you engaged throughout.", "A waterfront paradise within the city the perfect track for a getaway.", "Literary history and intellectual charm make this track truly unique."]

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
const descriptionArrays = [descriptions1, descriptions2, descriptions3];
const flatDescriptions = descriptionArrays.flat();

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

for (let i = 0; i < NUM_SEED_TRACKS; i++) {
    tracks.push(
        new Track({
            author: users[getRandomIndex(users)]._id,
            name: faker.vehicle.manufacturer() + " Track",
            location: "New York City",
            miles: faker.number.int(100),
            description: flatDescriptions[getRandomIndex(flatDescriptions)],
            startAddress: addresses[getRandomIndex(addresses)],
            endAddress: addresses[getRandomIndex(addresses)],
        })
    );
}

//Create Comments
const comments = []
for (let i = 0; i < NUM_SEED_COMMENTS; i++) {
    comments.push(
        new Comment({
            author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
            track: tracks[Math.floor(Math.random() * NUM_SEED_TRACKS)]._id,
            description: commentp[getRandomIndex(commentp)]
        })
    )
}

//Create Times
const times = []
for (let i = 0; i < NUM_SEED_TIMES; i = i + 4) {
    for (let j = 0; j < 4; j++) {
        times.push(
            new Time({
                author: users[Math.floor((Math.random() * NUM_SEED_USERS) / 4 * (j + 1))]._id,
                track: tracks[j]._id,
                hours: Math.floor(Math.random() * 3),
                minutes: Math.floor(Math.random() * 60),
                seconds: Math.floor(Math.random() * 60)
            })
        )
    }
}

//Create Event
const events = []
events.push(
    new Event({
        track: tracks[1]._id,
        date: new Date('2023-08-12')
    })
)

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
        .then(() => Time.collection.drop())
        .then(() => Event.collection.drop())
        .then(() => User.insertMany(users))
        .then(() => Track.insertMany(tracks))
        .then(() => Comment.insertMany(comments))
        .then(() => Time.insertMany(times))
        .then(() => Event.insertMany(events))
        .then(() => {
            console.log("Done!");
            mongoose.disconnect();
        })
        .catch(err => {
            console.error(err.stack);
            process.exit(1);
        });
}



