const router = require('express').Router();
const Sequelize = require('sequelize');
const {Op} = require('sequelize')
// const helper = require('../../helper.helpers.js');
const { response } = require('express');
const { User, UserPartners, Partners, Activities, Event } = require('../../models');

router.get('/getuserpart', async (req, res) => {
  try {
    const userPartner = await UserPartners.findAll({
      attributes: [
        'partners_id',
        [Sequelize.fn('GROUP_CONCAT', Sequelize.col('user_id')), 'user_ids']
      ],
      group: ['partners_id']
    })
    res.status(200).json(userPartner);
  } catch(err){
    res.status(500).json(err)
  }
})

// router.get('/', async (req, res) => {
//   try {
//       const partnerData = await Partners.findAll();
//       res.status(200).json(partnerData);
//   } catch (err) {
//       res.status(500).json(err)
//   }
// });

// router.get('/:id', async (req,res)=>{
//     try{
//         const partnerData = await Partners.findByPk(req.params.id, {
//             include: [{ model: User }]
//         });
//         res.status(200).json(partnerData);
//     } catch(err){
//         console.log(err);
//         res.status(500).json(err);
//     }
// });



router.post('/', async (req, res) => {
  console.log("req session user id", req.session.userId)
    try {
      const firstUser= req.body.firstUserID
      const secondUser= req.body.secondUserID
      const newPair = await Partners.create()
      const newUserPartner = await UserPartners.bulkCreate([{
        user_id: firstUser,
        partners_id: newPair.dataValues.id
      },
      {
        user_id: secondUser,
        partners_id: newPair.dataValues.id
      }
    ])
      res.status(200).json({newUserPartner, newPair})
    }
    catch (err) {
      res.status(500).json(err);
    };
  });

// moved to helper.js
  async function findPartnersByUserID(userID) {
    const userPartners = await UserPartners.findAll({
      where: {
        user_id: userID
      },
    });
    return userPartners;
  }

  // Moved to helper.js
  async function findUsersByPartnerID(partnerID, userID) {
    let partnerData = await UserPartners.findAll({
      where: {
        partners_id: partnerID,
      },
    });
    partnerData = partnerData.filter(partner => partner.dataValues.user_id != userID)
    let result = []
    for (let i = 0; i<partnerData.length; i++){
      result.push(await findUserByUserID(partnerData[i].dataValues.user_id))
    }
    return result;
  }

  //Moved to helpler.js
  async function findUserByUserID(userid) {
    const user = await User.findOne({
      where: {
        id: userid
      },
    });
    return user;
  }

  // Get  partnerships by username
  router.get('/test/:username', async (req, res) => {
    console.log("req session log",req.session)
    console.log("signed in user", req.session.username)
    try {
      const userData = await User.findOne({
        where: {
          username: req.params.username
        }
      })
      const partners = await findPartnersByUserID(userData.id)
      const partnerships = []
      for (let i = 0; i<partners.length; i++){
        partnerships.push(await findUsersByPartnerID(partners[i].partners_id, userData.id))
      }
      
      res.status(200).json({userData, partners, partnerships})
    } catch (err){
      res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
  try {
      const partnerData = await Partners.findAll();
      res.status(200).json(partnerData);
  } catch (err) {
      res.status(500).json(err)
  }
});

module.exports = router