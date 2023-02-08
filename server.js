const express = require('express');
const routes = require('./controllers')
const session = require('express-session');
const handlebars = require('express-handlebars');
const path =require('path');
const mysql = require('mysql2');
const sequelize = require('./config/connection');

const PORT = 3001;

const app = express();

// Middleware

var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
  });