const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');

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



//Login 
router.get("/login", (req, res) => {
    if (req.session.logged_in){
        res.redirect('/');
        return;
    }
    res.render('login');
})


module.exports = router;