const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models')

router.get('/', (req, res) => {
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


  router.get('/login', (req,res)=>{
      if(req.session.loggedIn){
          res.redirect('/');
          return;
      }
      req.session.loggedIn = true;
      res.render('login', { loggedIn: req.session.loggedIn });
  });
  

  
  router.get('/signup', (req,res)=>{
      if(req.session.loggedIn){
          res.redirect('/');
          return;
      }
      res.render('signup', { loggedIn: req.session.loggedIn });
  });

  router.get('/competitors', (req, res) => {
    res.render('competitors', { 
    }); 
});
  

router.get('/event', (req, res) => {
    res.render('event', { 
    }); 
});
  

  router.get('/logout', (req, res) => {
      res.render('login', req.session.loggedIn = false) ;
  });

  module.exports =router