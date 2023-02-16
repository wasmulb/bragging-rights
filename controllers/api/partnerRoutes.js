const router = require('express').Router();
const Sequelize = require('sequelize');
const {Op} = require('sequelize')
const {findPartnersByUserID} = require('../../helper/helpers');
const {findUsersByPartnerID} = require('../../helper/helpers');
const {findUserByUserID} = require('../../helper/helpers');
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

  // Get  partnerships by username
  router.get('/test/:username', async (req, res) => {
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
      console.log(err)
      res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
  try {
      let partnerData = await Activities.findAll({
       include: [{model: Partners}]
      
      });
      let partnerList = partnerData.map(partner => partner.dataValues.partners_id)
      partnerList = [...new Set(partnerList)];
      const dict = {}
      console.log(partnerList)
      for (let i = 0; i < partnerList.length; i++){
        for (let j = 0; j<partnerData.length; j++){
          console.log(partnerList[i], partnerData[j].dataValues.partners_id)
          if(partnerList[i] in dict && partnerList[i] == partnerData[j].dataValues.partners_id){
            dict[partnerList[i]].activities.push(partnerData[j].dataValues)
          } else if (partnerList[i] == partnerData[j].dataValues.partners_id){
            dict[partnerList[i]] = {activities: [partnerData[j].dataValues]}
          }
        }
      }
      console.log(dict)
      partnerData.partnerActivities = dict
      res.status(200).json({dict});
  } catch (err) {
    console.log(err)
      res.status(500).json(err)
  }
});

module.exports = router