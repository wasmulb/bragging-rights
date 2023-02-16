const User = require('./User');
const Activities = require('./Activities');
const Partners = require('./Partners');
const UserPartners = require('./User-Partners');
const Event = require('./Event');


//all good
UserPartners.belongsTo(User, {
  foreignKey: 'user_id',
})

User.hasMany(UserPartners, {
  foreignKey: 'user-partner_id',
})

//all goood above

// User.belongsTo(Partners, {
//   through: 'user-partner_id'
// })

//New associations for acivities/partners
Activities.belongsTo(Partners, {
  foreignKey: 'partners_id'
})

Partners.hasMany(Activities, {
  foreignKey: 'activities_id'
})

//idk...
Activities.belongsTo(Event, {
  foreignKey: 'activities_id'
})

UserPartners.belongsTo(Event, {
  foreignKey: 'user-partner_id'
})


module.exports = {
  User,
  UserPartners,
  Partners,
  Activities,
  Event,

};