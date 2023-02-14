const router = require('express').Router()
const { Event } = require('../models');

 router.get('/scores', async (req, res) => {
    try {
      const eventScores= await Event.findByPk(req.params.id, {
        include: [
          {
            model: Event,
            attributes: [
              'id',
              'winner',
              'score1',
              'score2',
              'date',
            ],
          },
        ],
      });

      const scores = eventScores.map((score) =>
      gallery.get({ plain: true })
    );
    res.render('scores', {
      scores,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router