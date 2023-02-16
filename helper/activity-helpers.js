const { User, UserPartners, Partners, Activities, Event } = require('../models');

async function findPartnershipbyUserIDs (userIDs){
    let partnerData = await UserPartners.findOne({
      where: {partners_id : userIDs,
      },
    })
    console.log("teeeessssttt", partnerData.dataValues.partners_id)
  }

module.exports = {
findPartnershipbyUserIDs,
  };