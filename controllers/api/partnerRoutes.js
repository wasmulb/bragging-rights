const router = require('express').Router();
const Sequelize = require('sequelize');
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

router.get('/', async (req, res) => {
  try {
      const partnerData = await Partners.findAll();
      res.status(200).json(partnerData);
  } catch (err) {
      res.status(500).json(err)
  }
});

router.get('/:id', async (req,res)=>{
    try{
        const partnerData = await Partners.findByPk(req.params.id, {
            include: [{ model: User }]
        });
        res.status(200).json(partnerData);
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});



router.post('/', async (req, res) => {
    console.log(req.body)
    try {
      const firstUser= req.body.firstUser
      const secondUser= req.body.secondUser
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

module.exports = router