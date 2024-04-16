const router = require('express').Router();
const { Post, User, Comment } = require('../models');
// const sequelize = require('../config/connection');
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

// get all posts
router.get('/', async (req, res) =>{
    try {
        const postData = await Post.findAll({
            attributes: ['id', 'comment_text', 'user_id', 'post_id'],
            include: [
                {
                    model: Comment,
                    attributes:['id', 'comment_text', 'user_id', 'post_id'],
                    include: {
                        model: User,
                        attributes: ['name'],
                    },
                },
                {
                    model:User,
                    attributes: ['name'],
                },
            ],
            order: [['title']],
        })
        const posts = postData.map((post) => post.get({ plain: true}));
        console.log(posts)
        res.render('profile',
        {posts,
            logged_in: req.session.logged_in,
            name: req.session.name
        })
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
                    attributes: ['id', 'comment', 'user_id', 'created_at'],// should we remove
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

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
        ...user,
        logged_in: true
    });
    } catch (err) {
    res.status(500).json(err);
    }
});

// router.get('/logout', (req, res)  
//     if (req.session.logged_in) {
    
//         res.redirect('/'); // Redirect to home page or any other page after logout
//     });
//  else {
//     res.status(404).end();
//     }



//Login 
router.get("/login", (req, res) => {
    if (req.session.logged_in){
        res.redirect('/profile');
        return;
    }
    res.render('login');
})

//Signup
// router.get('/signup', async (req, res) => {
//     res.render('login');
// })

//testing
//render the new new post page
router.get('/write', (req, res) => {
    if (req.session.logged_in) {
        res.render('write', {
            logged_in: true,
        });
        return;
    }
    // res.redirect('write')
})
// res.render('profile', {
//     ...user,
//     logged_in: true
// });
// } catch (err) {
// res.status(500).json(err);
// }
// });

// router.get('/write', withAuth, (req, res) => {
//     res.render('write');
// });


module.exports = router;