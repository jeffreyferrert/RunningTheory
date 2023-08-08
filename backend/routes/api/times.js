const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Track = mongoose.model('Track');
const Time = mongoose.model('Time');

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

router.post('/', async (req, res, next) => {
    try {
      const newTime = new Time({
        description: req.body.description,
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
