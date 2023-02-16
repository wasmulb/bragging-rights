const { User, UserPartners, Partners, Activities, Event } = require('../models');

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

  async function findUsersByPartnerID(partnerID, userID) {
    console.log(partnerID)
    let partnerData = await UserPartners.findAll({
      where: {
        partners_id: partnerID,
      },
    });
    console.log(partnerData)
    partnerData = partnerData.filter(partner => partner.dataValues.user_id != userID)
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

    async function findPartnersByUserID(userID) {
    const userPartners = await UserPartners.findAll({
      where: {
        user_id: userID
      },
      // include: [{ model: UserPartners}],
    });
    return userPartners;
  }

  async function findUserByUsername(username) {
    const user = await User.findOne({
      where: {
        username: username
      },
      include: [{ model: UserPartners}],
    });
    return user;
  }

  module.exports = {
    findUserByUserID,
    findUsersByPartnerID,
    findUserByUserID,
    findPartnersByUserID,
    findUserByUsername,
  };