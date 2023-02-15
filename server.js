const express = require('express');
const routes = require('./controllers')
const session = require('express-session');
const path =require('path');
const mysql = require('mysql2');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars')
const hbs =exphbs.create({});

const PORT = 3001;

const app = express();

// Middleware

var sess = {
  secret: 'keyboard cat',
  cookie: {},
  resave: true,
  saveUninitialized: true

}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(session(sess))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('images'))

app.use(routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`The server is running on port http://localhost:${PORT}`));
  });
