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


  router.get('/login', (req,res)=>{
    console.log(req.session)
      if(req.session.loggedIn){
          res.redirect('/');
          return;
      }
      req.session.save(()=>{
        req.session.cookie
        req.session.loggedIn = true;
        req.session.userId = 7;
        res.render('login', { loggedIn: req.session.loggedIn });
      })
     
  });
  

  
  router.get('/signup', (req,res)=>{
      if(req.session.loggedIn){
          res.redirect('/');
          return;
      }
      res.render('signup');
  });

  router.get('/competitors', (req, res) => {
    console.log(req.session)
    console.log("comp user name", req.session.username)
    res.render('competitors', { 
        
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