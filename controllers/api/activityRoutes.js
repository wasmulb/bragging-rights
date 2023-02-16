const router = require('express').Router();
const { User, UserPartners, Partners, Activities, Event } = require('../../models');
const {findPartnershipbyUserIDs} = require('../../helper/activity-helpers');

//get activity
router.get('/', async (req, res) => {
    try {
        const activityData = await Activities.findAll({
        });
        res.status(200).json(activityData);
    } catch (err) {
        res.status(500).json(err)
    }
});
 
//create activity
router.post('/', async (req, res) => {
    try {
      
      const firstUser = req.body.userOne_id
      const secondUser = req.body.userTwo_id
      const partnerID = req.body.partners_id
      const newAct = await Activities.create({
        activity_name: req.body.activity_name,
        date: req.body.date,
        userOne_id: firstUser,
        userTwo_id: secondUser,
        userOne_score: req.body.userOne_score,
        userTwo_score: req.body.userTwo_score,
        partners_id: partnerID
      })
      res.status(200).json(newAct)
    }
    catch (err) {
      res.status(500).json(err);
    };
  });

  // router.get('/:partnerid', async (req, res) => {
  //   const partnerData = await Partners.findOne({
  //     where: {
  //       id: partnersid
  //     }
  //   })
  // })

  //Get partner pair by userIDs
// async function findPartnershipbyUserIDs (userIDs){
//       let partnerData = await UserPartners.findOne({
//         where: {partners_id : userIDs,
//         },
//       })
//       console.log("teeeessssttt", partnerData.dataValues.partners_id)
//     }

// findPartnershipbyUserIDs("3,4")

  //Get activities these partner pairs have
router.get('/actparts', (req, res) => {

})

  //Add new activiies to a partner pair

 module.exports = router;