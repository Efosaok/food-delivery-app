
//init modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongo = require('mongodb');
const mongoose = require('mongoose');

//configuring environmental variiables


// Init App
const app = express();
//connect to mongoDB


const routes = require('./routes/index');



//Configure View Engine
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash

app.use('/', routes);


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), ()=>{
  console.log('Server started on port '+app.get('port'));
});