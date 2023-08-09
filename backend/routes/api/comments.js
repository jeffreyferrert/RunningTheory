const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Track = mongoose.model('Track');
const Comment = mongoose.model('Comment');
const validateCommentInput = require('../../validations/comments')

router.get('/', async (req, res) => {
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


router.post('/', async (req, res, next) => {
  try {
    const newComment = new Comment({
      description: req.body.description,
      author: req.body.author._id,
      track: req.body.track._id
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

router.patch('/:commentId', async (req, res, next) => {
  if(!req.body) return res.json(null)
  try {
    const commentId = req.url.slice(1)
    const updateData = {
      author: req.body.author,
      description: req.body.description,
      track: req.body.track
    };

    const updatedComment = await Comment.findByIdAndUpdate(commentId, updateData, { new: true });

    return res.json(updatedComment);
  }
  catch(err) {
    next(err);
  }
})

router.delete('/:commentId', async (req, res, next) => {
  try {
    const commentId = req.url.slice(1)

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    return res.json();
  } catch (err) {
    next(err);
  }
});
  

module.exports = router;
