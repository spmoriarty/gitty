const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const { Post } = require('../models/Post');

module.exports = Router() 


  .post('/', authenticate, async (req, res, next) => {
    try {
      const post = await Post.insert(req.body);
      res.json(post);
    } catch(err) {
      next(err);
    }
  })
  
  .get('/', authenticate, async (req, res, next) => {
    try {
      const allPost = await Post.getAll();
      res.json(allPost);
    } catch(err) {
      next(err);
    }
  }
  );
