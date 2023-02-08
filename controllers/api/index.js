const router = require('express').Router();
const userRoutes = require('./userRoutes');
const activityRoutes = require('./activityRoutes')

router.use('/activities', activityRoutes)
router.use('/users', userRoutes);
module.exports = router