// Router for all post to get all post.
const router = require('express').Router();
const { User, Post, Story  } = require('../../models');

// Creating a new post
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({ ...req.body, user_id: req.session.user_id });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Deleting a post
router.delete('/:id', async (req, res) => {
    try {
        const storyData = await Comment.destroy({
            where: { postId: req.params.id },
        });
        const postData = await Post.destroy({
            where: { id: req.params.id, user_id: req.session.user_id, },
        });
        if (!postData) {
        res.status(404).json({
            message: 'No project found with this id!' });
        return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Editing a Post 
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {id: req.params.id},
        });
        if (!updatedPost) {
            res.status(404).json({ message: "No Post found with that ID"});
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;