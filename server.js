const express = require('express');
const routes = require('./controllers')
const session = require('express-session');
const path =require('path');
const exphbs = require('express-handlebars')
const hbs =exphbs.create({});
const cookieParser = require('cookie-parser')
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;



// Middleware

const sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  };

app.use(cookieParser())
app.use(session(sess))


// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('images'))

app.use(routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`The server is running on port http://localhost:${PORT}`));
  });
