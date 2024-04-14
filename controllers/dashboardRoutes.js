const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../controllers');
const withAuth = require('../utils/auth')

// Using the GET method to get all the posts from a user if that user is logged in
router.get('/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ['id', 'title', 'story_content'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'post_id'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    })
      .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
        res.render('profile', { posts, logged_in: true, name: req.session.name,});       
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Using the GET method to search for a specific post via the user ID if that user is logged in
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'story_content'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'post_id'],
          include: {
            model: User,
            attributes: ['name'],
          },
        },
        {
            model: User,
            attributes: ['name'],
        },
      ],
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: 'There are no stories under this id.' });
          return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('edit-story', { post, logged_in: true, name: req.session.name });         
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//  Using the GET method to add a new post
router.get('/new', withAuth, (req, res) => {
    res.render('new-story', { logged_in: true });
});

module.exports = router; 

