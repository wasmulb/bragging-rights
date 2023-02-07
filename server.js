const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const path =require('path');
const mysql = require('mysql2');
const sequelize = require('./config/connection');

const PORT = 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
  });