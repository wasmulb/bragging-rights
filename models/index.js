const User = require('./User');
const Activities = require('./Activities');
const Partners = require('./Partners');
const Event = require('./Event');

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

Event.belongsTo(Activities, {
    foreignKey: 'event_id'
})

Activities.hasMany(Event, {
    foreignKey: 'activities_id'
})

module.exports = {
  User,
  Partners,
  Activities,
  Event
};