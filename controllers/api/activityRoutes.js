const router = require('express').Router();
const { User, UserPartners, Partners, Activities, Event } = require('../../models');

//get activity
router.get('/', async (req, res) => {
    try {
        const activityData = await Activities.findAll({
        });
        res.status(200).json(activityData);
    } catch (err) {
        res.status(500).json(err)
    }
});
 
router.post('/', async (req, res) => {
    try {
      const newPair = await Activities.create({
        activity_name: req.body.activity_name,
      })
      res.status(200).json(newPair)
    }
    catch (err) {
      res.status(500).json(err);
    };
  });

 module.exports = router;