const router = require('express').Router();
const Sequelize = require('sequelize');
const {Op} = require('sequelize')
const { response } = require('express');
const { User, UserPartners, Partners, Activities, Event } = require('../../models');

router.get('/getuserpart', async (req, res) => {
  console.log('test')
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
    console.log(req.body)
    try {
      const firstUser= req.body.firstUserID
      const secondUser= req.body.secondUserID
      const newPair = await Partners.create()
      console.log(newPair)
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

  async function findPartnersByUserID(userID) {
    const userPartners = await UserPartners.findAll({
      where: {
        user_id: userID
      },
      // include: [{ model: UserPartners}],
    });
    return userPartners;
  }

  async function findUsersByPartnerID(partnerID, userID) {
    console.log(partnerID)
    let partnerData = await UserPartners.findAll({
      where: {
        partners_id: partnerID,
      },
      // include: [{ model: UserPartners}],
    });
    console.log(partnerData)
    partnerData = partnerData.filter(partner => partner.dataValues.user_id != userID)
    // partnerData = partnerData.map(async (user) => await findUserByUserID(user.dataValues.user_id))
    let result = []
    for (let i = 0; i<partnerData.length; i++){
      result.push(await findUserByUserID(partnerData[i].dataValues.user_id))
    }
    return result;
  }

  async function findUserByUserID(userid) {
    console.log(userid)
    const user = await User.findOne({
      where: {
        id: userid
      },
    });
    console.log(user)
    return user;
  }

  // Get all partnerships
  router.get('/test/:username', async (req, res) => {
    // try {
      console.log(req.params)
      const userData = await User.findOne({
        where: {
          username: req.params.username
        }
      })
      console.log(userData)
      const partners = await findPartnersByUserID(userData.id)
      const partnerships = []
      for (let i = 0; i<partners.length; i++){
        partnerships.push(await findUsersByPartnerID(partners[i].partners_id, userData.id))
      }
      
      res.status(200).json({userData, partners, partnerships})
    // } catch (err){
    //   res.status(500).json(err);
    // }
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