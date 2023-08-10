const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Track = mongoose.model('Track');
const Time = mongoose.model('Time');
const validateTimeInput = require('../../validations/times')

router.get('/', async (req, res) => {
  try {
    const times = await Time.find()
                              .populate("author", "_id username")
                              .populate("track", "_id name")
                              .sort({ hours: 1, minutes: 1, seconds: 1 });
    return res.json(times);
  }
  catch(err) {
    return res.json([]);
  }
});

router.post('/', validateTimeInput, async (req, res, next) => {
    try {
      const newTime = new Time({
        seconds: req.body.seconds,
        minutes: req.body.minutes,
        hours: req.body.hours,
        author: req.body.author._id,
        track: req.body.track._id
      });
  
      let time = await newTime.save();
      time = await time.populate('author', '_id username')
      time = await time.populate('track', "_id name")
      
      return res.json(time);
    }
    catch(err) {
      next(err);
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
    const times = await Time.find({ author: user._id })
                              .sort({ createdAt: -1 })
                              .populate("author", "_id username")
                              .populate("track", "_id name");
    return res.json(times);
  }
  catch(err) {
    return res.json([]);
  }
})

router.delete('/:timeId', async (req, res, next) => {
    try {
      const timeId = req.url.slice(1)
  
      const deletedTime = await Time.findByIdAndDelete(timeId);
  
      if (!deletedTime) {
        return res.status(404).json({ message: 'Time not found' });
      }
  
      return res.json();
    } catch (err) {
      next(err);
    }
  });
    
  
  module.exports = router;
