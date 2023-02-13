require('dotenv').config();
const Sequelize = require('sequelize');


let sequelize;
//link up sequelize with Heroku deploy
if (process.env.JAWSDB_URL){
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else{
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            //'127.0.0.1' -- for mac
            port: 3306,
            dialect: 'mysql'
        }
    );
}

module.exports = sequelize;