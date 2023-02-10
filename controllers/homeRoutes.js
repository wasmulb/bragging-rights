const router = require('express').Router();
const sequelize = require('../config/connection');
const { User } = require('../models')

router.get('/', (req, res) => {
    console.log("hitting home")
    res.render('home', { 
        loggedIn: req.session.loggedIn, 
        username: req.session.username,
    });
        // console.log(username)
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
  


  router.get('/logout', (req, res) => {
      req.session.loggedIn = false;
      res.render('login', { loggedIn: req.session.loggedIn });
  });

  module.exports =router