const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');
// const { logger } = require('sequelize/lib/utils/logger');

// Route for the Homepage 
router.get("/", async (req, res) => {
    try{
        const postData = await Post.findAll({
            include: [{model: User, attributes: ["username"] }],
        });
        const posts = postData.map((post) => post.get({plain: true}));
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Individual Post 
router.get('/post/:id', async (req, res) => {
    try{
        const postData = await Post.findOne({
            where: {id: req.params.id},
            attributes:['id', 'content', 'title', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment', 'userId', 'created_at'],
                    include:{
                        model: User,
                        attributes: ['username'],
                    },
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        if (postData) {
            const post = postData.get({plain: true});
            console.log(post);
            res.render('single-post', {post, logged_in: req.session.logged_in, username: req.session.username,})
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
    res.render('signup');
})

//testing

module.exports = router;