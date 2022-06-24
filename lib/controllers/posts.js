const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  })

  .post('/', authenticate, async (req, res, next) => {
    try {
      const posts = await Post.create(req.body);
      res.json(posts);
    } catch (error) {
      next(error);
    }
  });
