const mongoose = require('mongoose');
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 1000;

// Create users
const users = [];

const randomSeed1 = faker.random.alphaNumeric(5);
const randomSeed2 = faker.random.alphaNumeric(5);
users.push(
  new User({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10),
    profilePic: `https://picsum.photos/seed/${randomSeed1}/400/400`,
    backgroundPic: `https://picsum.photos/seed/${randomSeed2}/400/400`
  })
);

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const randomSeed1 = faker.random.alphaNumeric(5);
  const randomSeed2 = faker.random.alphaNumeric(5);
  users.push(
    new User({
      username: `${firstName} ${lastName}`,
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
      profilePic: `https://picsum.photos/seed/${randomSeed1}/400/400`,
      backgroundPic: `https://picsum.photos/seed/${randomSeed2}/400/400`
    })
  );
}

// Generate random followings
for (const user of users) {
  const randomIndexes = [];
  for (let i = 0; i < Math.floor(Math.random() * 10) + 1; i++) {
    randomIndexes.push(Math.floor(Math.random() * 1000));
  }
  for (let i of randomIndexes) {
    if (users[i]._id !== user._id && !user.follows.includes(users[i]._id)) {
      user.follows.push(users[i]._id);
      users[i].followers.push(user._id);
    }
  }
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
  })
;

// Reset and seed db
function insertSeeds() {
  console.log("Resetting db and seeding users...");

  User.collection
    .drop()
    .then(() => User.insertMany(users))
    .then(() => {
      console.log("Done!");
      mongoose.disconnect();
    })
    .catch(err => {
      console.error(err.stack);
      process.exit(1);
    })
  ;
}