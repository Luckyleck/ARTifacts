const mongoose = require('mongoose');
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const { getRandomUsers } = require("../controllers/api/usersController.js");

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
    randomIndexes.push(i);
  }
  for (let i of randomIndexes) {
    user.follows.push(users[i]._id);
    users[i].followers.push(user._id);
  }
  // const randomFollows = await User.aggregate([{ $sample: { size: Math.floor(Math.random() * 10) + 1 } }]).exec();
  // for (let i = 0; i < randomFollows.length; i++) {
  //   user.follows.push(randomFollows[i]._id);
  //   randomFollows[i].followers.push(user._id);
  //   randomFollows[i].save();
  // }
  // const randomFollowers = await User.aggregate([{ $sample: { size: Math.floor(Math.random() * 10) + 1 } }]).exec();
  // for (let i = 0; i < randomFollowers.length; i++) {
  //   user.followers.push(randomFollowers[i]._id);
  // }
  // user.save();
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
  console.log("Resetting db and seeding users and tweets...");

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