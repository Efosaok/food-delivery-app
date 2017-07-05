
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
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo")(session);

//configuring environmental variiables


// Init App
const app = express();
//connect to mongoDB


const routes = require('./routes/index');
const userRoutes = require('./routes/users');



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

// Express Session

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ mongooseConnection : mongoose.connection}),
    cookie : {maxAge : 180 * 60 * 1000}
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: (param, msg, value)=> {
      let namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.session = req.session
  next();
});

app.use('/user', userRoutes);
app.use('/', routes);


// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), ()=>{
  console.log('Server started on port '+app.get('port'));
});