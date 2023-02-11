const router = require('express').Router();
const { response } = require('express');
const { User, UserPartners, Partners, Activities, Event } = require('../../models');

//Get all users
router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll({
        include: [{ model: UserPartners}]
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err)
    }
  });

//CREATE new user
router.post('/', async (req, res)=> {
    console.log(req.body)
    try{const userData = await User.create({
            
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        //once created create session for user
        req.session.save(()=>{
            req.session.loggedIn = true;
            res.status(200).json(userData);
        });  
         //if user is already created send an error     
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});


//LOG IN 
router.post('/login', async(req,res)=>{
    try{
        const userData = await User.findOne({
            where:{
                email: req.body.email,
            },
        });

        //check if user input is correct
        if(!userData){
            res
            .status(400)
            .json({ message: 'Please Check Email/Password'});
            return;
        }

        //once user is logged in set up the logged in session 
        req.session.save(()=> {
            req.session.loggedIn = true;
            res
            .status(200)
            .json({ 
                loggedIn: true,
                username: userData.username, 
                message: 'Logged In'
            });
        });
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});


//LOG OUT
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });


module.exports = router