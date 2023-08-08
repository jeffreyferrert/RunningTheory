const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Track = mongoose.model('Track');
const Comment = mongoose.model('Comment');
const validateCommentInput = require('../../validations/comments')

router.get('/', async (req, res) => {
  console.log('im being called')
  try {
    const comments = await Comment.find()
                              .populate("author", "_id username")
                              .populate("track", "_id name")
                              .sort({ createdAt: -1 });
    return res.json(comments);
  }
  catch(err) {
    return res.json([]);
  }
});


router.post('/', validateCommentInput, async (req, res, next) => {
  try {
    const newComment = new Comment({
      author: req.user._id,
      track: req.track._id,
      description: req.body.description
    });

    let comment = await newComment.save();
    comment = await comment.populate('author', '_id username')
    comment = await comment.populate('track', "_id name")
    
    return res.json(comment);
  }
  catch(err) {
    next(err);
  }
});


router.get('/:commentId', (req, res) => {
    if (!req.user) return res.json(null);
    res.json({
      _id: req.comment._id,
      author: req.comment.author,
      discription: req.comment.discription,
      createdAt: req.comment.createdAt
    });
  });

router.patch('/:commentId', validateCommentInput, async (req, res, next) => {
  if(!req.user) return res.json(null)
  try {
    const newComment = new Comment({
      author: req.user._id,
      track: req.track_id,
      description: req.body.description
    });


    let comment = await newComment.save();
    comment = await comment.populate('author', '_id username');
    comment = await comment.populate('track', "_id name")
    return res.json(comment);
  }
  catch(err) {
    next(err);
  }
})
  

module.exports = router;