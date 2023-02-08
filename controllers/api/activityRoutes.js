const router = require('express').Router();
const { Activities } = require ('../../models');

//get activity
router.get('/activity', async(req,res)=>{
    try{
        const activtyData = await Activities.findByPk(req.params.id)

        res.render('activity', {Activities, loggedIn: req.session.loggedIn});
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});
 

//make sure user is logged on
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
  });
  
 module.exports = router;