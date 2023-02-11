const router = require('express').Router();
const userRoutes = require('./userRoutes');
const activityRoutes = require('./activityRoutes');
const partnerRoutes = require('./partnerRoutes');
const eventRoutes = require('./eventRoutes');



router.use('/activities', activityRoutes);
router.use('/users', userRoutes);
router.use('/partners', partnerRoutes);
router.use('/event', eventRoutes);
module.exports = router