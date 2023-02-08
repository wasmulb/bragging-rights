const router = require('express').Router();
const { Activities } = require ('../../models');

//get activity
router.get('/activity', async(req,res)=>{
    try{
        const activtyData = await Activities.findByPk(req.params.id)

        res.render('activity', {Activities, logged_in: true});
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});
 

//make sure user is logged on
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.render('login', {'logged_in': true});

      return;
    }
    // Otherwise, render the 'login' template
    // res.render('login');
    req.session.loggedIn = true;
    res
    .render('login', {logged_in})
  });
  
 module.exports = router;