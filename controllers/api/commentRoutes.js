const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')
// Using the GET method to get all the comments from the various posts
router.get('/', async (req, res) => {
    try{ 
        const dbCommentData = await Comment.findAll({});
        if (dbCommentData.length === 0) {
          res.status(404).json({ message: "You have no comments."});
          return;
        };
        res.status(200).json(dbCommentData);
      } catch (err) {
        res.status(500).json(err);
      }
});

// Using the GET method to get all the comments from one post
router.get('/:id', async (req, res) => {
    try{ 
        const dbCommentData = await Comment.findAll({
            where: {id: req.params.id},
        });
        if (dbCommentData.length === 0) {
          res.status(404).json({ message: `Stories belonging to ${req.params.name} has no comments`});
          return;
        };
        res.status(200).json(dbCommentData);
      } catch (err) {
        res.status(500).json(err);
      }
});

// Using the POST method to create a new comment
router.post('/', withAuth, async (req, res) => {
    // const body = req.body;
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json({ newComment, success: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Using the DELETE method to delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const dbCommentData = await Comment.destroy({
        where: {id: req.params.id},
      });        
      if (!dbCommentData) {
        res.status(404).json({
          message: `No comments were found for = ${req.params.name}`,
        });
        return;
      }  
      res.status(200).json({dbCommentData, success: true});
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
