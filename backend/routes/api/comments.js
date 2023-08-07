const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const validateCommentInput = require('../../validations/comments')

    router.post('/tracks/comments', validateCommentInput, (req, res) => {
      Comment.create(req.body).then((comment) => {
        console.log(comment)
        res.redirect(`/reviews/${comment.reviewId}`);
      }).catch((err) => {
        console.log(err.message);
      });
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
      

    module.exports = router;
