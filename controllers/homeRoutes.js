const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth')
// const { logger } = require('sequelize/lib/utils/logger');

// Route for the Homepage 
router.get("/", async (req, res) => {
    try{
        const dbPostData = await Post.findAll({
            include: [{model: User, attributes: ["name"] }],
        });
        const posts = dbPostData.map((post) => post.get({plain: true}));
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Individual Post 
router.get('/post/:id', withAuth, async (req, res) => {
    try{
        const dbPostData = await Post.findOne({
            where: {id: req.params.id},
            attributes:['id', 'content', 'title', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'user_id', 'created_at'],
                    include:{
                        model: User,
                        // attribute could also be "name"
                        attributes: ['name'],
                    },
                },
                {
                    model: User,
                    // attribute could also be "name"
                    attributes: ['name'],
                },
            ],
        });
        if (dbPostData) {
            const post = dbPostData.get({plain: true});
            console.log(post);
            res.render('single-comment', {post, logged_in: req.session.logged_in, name: req.session.name,})
        } else {
            res.status(404).json({ message: "No Post with ID"});
            return;
        }
    } catch(err) {
        res.status(500).json(err);
    }
});


//Login 
router.get("/login", (req, res) => {
    if (req.session.logged_in){
        res.redirect('/');
        return;
    }
    res.render('login');
})

//Signup
router.get('/signup', async (req, res) => {
    res.render('login');
})

//testing
// render the new new post page
router.get('/newpost', (req, res) => {
    if (req.session.logged_in) {
        res.render('profile');
        return;
    }
    res.redirect('/login')
})

module.exports = router;