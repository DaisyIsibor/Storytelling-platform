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
            res.status(200).json({ message: `Account created for ${dbUserData.name}`});
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Logging in the user
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {name: req.body.name}
        });
        if (!dbUserData) {
            res.status(400).json({ message: `User id ${req.params.id} is not valid.` });
            return;
        }
        // Checking Password
        const validPassword = await dbUserData.checkPassword(req.body.password)
        if (!validPassword) {
            res.status(400).json({ message: "Incorrect password!" });
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.name = dbUserData.name;
            req.session.logged_in = true;        
        res.status(200).json({ message: "You are logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Logging out the user
router.post('/logout', withAuth, async (req, res) => {
        if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
        } else {
            res.status(404).end();
    }
});

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

module.exports = router;