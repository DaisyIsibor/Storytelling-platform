// Routes to get all user details and post. 
const router = require('express').Router();
const { User } = require('../../models');

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
            req.session.loggedIn = true;        
        res.status(200).json({ message: "You are logged in!" });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Logging out the user
router.post('/logout', (req, res) => {
        if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
        } else {
            res.status(404).end();
    }
  });