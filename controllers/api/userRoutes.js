const router = require('express').Router();
const { response } = require('express');
// const helper = require('../../helper/helpers');
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

//Get user by searching a username
//moved to helper.js
async function findUserByUsername(username) {
  const user = await User.findOne({
    where: {
      username: username
    },
    include: [{ model: UserPartners}],
  });
  return user;
}

router.get('/:username', async (req, res) => {
  const username = req.params.username;
  const user = await findUserByUsername(username);
  if (!user) {
    return res.status(404).json({ error: `No user found with username: ${username}` });
  }
  res.json(user);
});

//I don't think we need this? duplicate?
async function findPartnersByUserID(userID) {
  const userPartners = await UserPartners.findAll({
    where: {
      user_id: userID
    },
  });
  return userPartners;
}

router.get('/:username', async (req, res) => {
  const username = req.params.username;
  const user = await findUserByUsername(username);
  if (!user) {
    return res.status(404).json({ error: `No user found with username: ${username}` });
  }
  res.json(user);
});


//CREATE new user
router.post('/', async (req, res)=> {
    try{const userData = await User.create({
            
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        //once created create session for user
        req.session.save(()=>{
            req.session.loggedIn = true;
            req.session.username =req.body.username
            
            res.status(200).json(userData);
        });  
         //if user is already created send an error     
    } catch (err){
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
          console.log("logging user data",userData)
          req.session.username = userData.username
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