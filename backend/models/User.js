const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
    type: String,
    required: true
  },
	email: {
    type: String,
    required: true,
    lowercase: true
  },
	hashedPassword: {
    type: String,
    required: true
  },
  profilePic: {
    type: String
  },
  follows: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  favorites: [{}]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);