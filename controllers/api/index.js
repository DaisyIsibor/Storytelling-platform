// Router to the story, post and user routes
const router = require('express').Router();

const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');
const storyRoutes = require('./storyRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/storys', storyRoutes);

module.exports = router;