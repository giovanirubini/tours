const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tourDb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to tourDatabase!'));

// type = in-person/video toggle. call = checkbox for financing call.
const userSchema = new mongoose.Schema({
  name: String,
  number: String,
  email: String,
  type: String,
  date: String,
  time: String,
  call: Boolean,
});

// Later, refactor to add agent photo!
const agentSchema = new mongoose.Schema({
  name: String,
  title: String,
  number: String,
  stars: Number,
  reviews: Number,
  sales: Number,
  photo: String,
});

const User = mongoose.model('User', userSchema);
const Agent = mongoose.model('Agent', agentSchema);

module.exports = {
  User,
  Agent,
  connection: db,
};
