const User = require('./User');
const Activities = require('./Activities');
const Partners = require('./Partners');

User.belongsTo(Partners, {
  foreignKey: 'user_id',
})

Partners.hasMany(User, {
    foreignKey: 'partner_id',
})

Activities.belongsTo(Partners, {
  foreignKey: 'activities_id',
})

Partners.hasMany(Activities, {
    foreignKey: 'partners_id'
})




module.exports = {
  User,
  Partners,
  Activities
};