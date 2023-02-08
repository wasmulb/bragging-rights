const router = require('express').Router();
const { Activities } = require ('../../models');

//get activity
router.get('/activity', async(req,res)=>{
    try{
        const activtyData = await Activities.findByPk(req.params.id)

        res.render('activity', {Activities, loggedIn: true});
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
});
 

 module.exports = router;