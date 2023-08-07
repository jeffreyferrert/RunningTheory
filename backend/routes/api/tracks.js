const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Track = mongoose.model('Track');
const Comment = mongoose.model('Comment');
const { requireUser } = require('../../config/passport');
const validateTrackInput = require('../../validations/tracks');

router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find()
                              .populate("author", "_id username")
                              .sort({ createdAt: -1 });
    return res.json(tracks);
  }
  catch(err) {
    return res.json([]);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const tracks = await Track.find({ author: user._id })
                              .sort({ createdAt: -1 })
                              .populate("author", "_id username");
    return res.json(tracks);
  }
  catch(err) {
    return res.json([]);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const track = await Track.findById(req.params.id)
                             .populate("author", "_id username");
    return res.json(track);
  }
  catch(err) {
    const error = new Error('Track not found');
    error.statusCode = 404;
    error.errors = { message: "No track found with that id" };
    return next(error);
  }
});

router.post('/', requireUser, validateTrackInput, async (req, res, next) => {
  try {
    const newTrack = new Track({
      author: req.user._id,
      name: req.body.name,
      location: req.body.location,
      miles: req.body.miles,
      description: req.body.description,
    });

    let track = await newTrack.save();
    track = await track.populate('author', '_id username');
    return res.json(track);
  }
  catch(err) {
    next(err);
  }
});

module.exports = router;
