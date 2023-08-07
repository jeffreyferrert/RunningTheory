const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const validateCommentInput = require('../../validations/comments')

    router.post('/comments', validateCommentInput, async (req, res, next) => {
      try {
        const newComment = new Track({
          author: req.user._id,
          track: req.track_id,
          description: req.body.description
        });
    
        let track = await newComment.save();
        return res.json(track);
      }
      catch(err) {
        next(err);
      }
    });

    router.get('/comments',  (req, res) => {
        if (!req.user) return res.json(null);
        res.json({
          _id: req.comment._id,
          author: req.comment.author,
          discription: req.comment.discription,
          createdAt: req.comment.createdAt
        });
      });

    router.patch('/comments', async (req, res, next) => {
      if(!req.user) return res.json(null)
      try {
        const newComment = new Track({
          author: req.user._id,
          track: req.track_id,
          description: req.body.description
        });
    
    
        let track = await newTrack.save();
        track = await track.populate('author', '_id username');
        return res.json(track);
      }
      catch(err) {
        next(err);
      }
    })
      

    module.exports = router;
