// Router for all post to get all post.
const router = require('express').Router();
const { User, Post, Comment  } = require('../../models');
const withAuth = require('../../utils/auth')

// Creating a new post
router.post('/', withAuth, async (req, res) => {
    console.log(req.body)
    try {
        const newPost = await Post.create({ ...req.body, user_id: req.session.user_id });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Deleting a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: { post_id: req.params.id },
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
router.put('/:id', withAuth, async (req, res) => {
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

// All posts with for one specific user
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            // attributes could also be "name"
            include: [{model: User, attributes: ["name"]}], 
        });
        res.status(200).json(postData);
    } catch (err){
        res.status(500).json(err);
    }
});

// Render the page to create a new story
// router.get('/write', withAuth, (req, res) => {
//     res.render('write');
// });

// Create a new story
// router.post('/write', withAuth, async (req, res) => {
//     try {
//         const newPost = await Post.create({
//             title: req.body.title,
//             content: req.body.content,
//             theme: req.body.theme, 
//             user_id: req.session.user_id
//         });
//         res.status(200).json(newPost);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

router.post('/', withAuth, async (req, res) => {
    try {
        const eventData = await Event.create({
            title: req.body.title,
            content: req.body.content,
            theme: req.body.theme, 
            user_id: req.session.user_id
        });
        eventData = eventData.get({plain: true});
        res.send(eventData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;