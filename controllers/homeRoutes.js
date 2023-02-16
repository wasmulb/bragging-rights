const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models')

router.get('/', (req, res) => {
    console.log("username of logged user", req.session.username)
    console.log("hitting home")
    res.render('home', { 
        loggedIn: req.session.loggedIn, 
        username: req.session.username,
        
    });
        
});

router.get('/scores', (req, res) => {
    console.log("get scores")
    res.render('scores', { 
    }); 
});

router.get('/login', async (req,res)=>{
    console.log(req.session)
    //refactored login, removed session data
      if(req.session.loggedIn){
          res.redirect('/');
          return;
      }
        res.render('login', { loggedIn: req.session.loggedIn });
      })
  
 
router.get('/signup', (req,res)=>{
      if(req.session.loggedIn){
          res.redirect('/');
          return;
      }
      res.render('signup');
  });

router.get('/competitors', async(req, res) => {
    console.log(req.session)
    console.log("comp user name", req.session.username)
    // console.log("USER: ", username)
    res.render('competitors', { 
        // username,
        loggedIn: req.session.loggedIn,
        username: req.session.username,

    }); 
});
  

router.get('/event', (req, res) => {
    res.render('event', { 
    }); 
});
  

router.get('/logout', (req, res) => {
      res.render('login', req.session.loggedIn) ;
  });

module.exports =router