// Routes to get all user details and post. 
const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/', async (req, res) => {
    try {
      const dbUserData = await User.findAll({
        attributes: { exclude: ['password'] },
      });
      res.status(200).json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.get('/:id', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [
          {
            model: Post,
            attributes: ['id', 'title', 'story_content'],
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text'],
            include: {
              model: Post,
              attributes: ['title'],
            },
          },
          {
            model: Post,
            attributes: ['title'],
          },
        ],
      });
      console.log(dbUserData);
      if (!dbUserData) {
        res.status(404).json({ message: `No such user id ${req.params.id}` });
        return;
      }
      res.status(200).json(dbUserData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// Signing up the user (need the id and user name)

router.post('/', async (req, res) => {
  try {
      const dbUserData = await User.create(req.body);
      req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.name = dbUserData.name;
          req.session.logged_in = true;
          res.redirect('/profile'); // Redirect to profile page after signup
      });
  } catch (err) {
      res.status(400).json(err);
  }
});

// router.post('/', async (req, res) => {
//     try {
//         const dbUserData = await User.create(req.body);
//         req.session.save(() => {
//             req.session.user_id = dbUserData.id;
//             req.session.name = dbUserData.name;
//             req.session.logged_in = true;
//             res.status(200).json({ message: `Account created for ${dbUserData.name}`});
//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// Logging in the user
// Route for user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const dbUserData = await User.findOne({ where: { email } }); // Corrected from 'name' to 'email'
    if (!dbUserData || !(await dbUserData.checkPassword(password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.name = dbUserData.name;
      req.session.logged_in = true;
      res.status(200).json({ message: 'Login successful' });
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// module.exports = router;



// router.post('/login', async (req, res) => {
//     try {
//         const dbUserData = await User.findOne({
//             where: {name: req.body.name}
//         });
//         if (!dbUserData) {
//             res.status(400).json({ message: `User id ${req.params.id} is not valid.` });
//             return;
//         }
//         // Checking Password
//         const validPassword = await dbUserData.checkPassword(req.body.password)
//         if (!validPassword) {
//             res.status(400).json({ message: "Incorrect password!" });
//             return;
//         }
//         req.session.save(() => {
//             req.session.user_id = dbUserData.id;
//             req.session.name = dbUserData.name;
//             req.session.logged_in = true;        
//         res.status(200).json({ message: "You are logged in!" });
//         });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });



router.post('/signup', async (req, res) => {
  try {
      const dbUserData = await User.create(req.body);
      req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.name = dbUserData.name;
          req.session.logged_in = true;
          res.status(200).json({ message: 'Account created successfully', redirectTo: '/profile' }); // JSON response with redirection info
      });
  } catch (err) {
      res.status(400).json(err);
  }
});




// router.post('/logout', withAuth, async (req, res) => {
//   try {
//       if (req.session.logged_in) {
//           // Destroy the session
//           req.session.destroy(() => {
//               // Redirect to the home page after successful logout
//               res.redirect('/');
//           });
//       } else {
//           res.status(404).end(); // Respond with 404 if user not logged in
//       }
//   } catch (err) {
//       console.error('Logout error:', err);
//       res.status(500).json({ message: 'An error occurred during logout' });
//   }
// });



// Using the DELETE method to delete a user
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const dbUserData = await User.destroy({
        where: {id: req.params.id},
      });        
      if (!dbUserData) {
        res.status(404).json({
        });
        return;
      }  
      res.status(200).json({dbUserData, success: true});
    } catch (err) {
      res.status(500).json(err);
    }
});

// router.get('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.redirect('/'); // Redirect to home page or any other page after logout
//     });
//   } else {
//     res.status(404).end();
//   }
// });


// Logging out the user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;