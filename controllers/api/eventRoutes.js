const router = require('express').Router();
const { response } = require('express');
const { User, UserPartners, Partners, Activities, Event } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const eventData = await Event.findAll({
        });
        res.status(200).json(eventData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', async (req, res) => {
    try {
      const newEvent = await Event.create({
        date: req.body.date,
        winner: req.body.winner,
      })
      res.status(200).json(newEvent)
    }
    catch (err) {
      res.status(500).json(err);
    };
  });

  module.exports = router;