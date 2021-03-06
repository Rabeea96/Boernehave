"use strict";

// INITIALIZATION
const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));
app.use(session({secret: 'hemmelig', saveUninitialized: true, resave: true}));
app.use(cookieParser());

// MONGODB & MONGOOSE SETUP
const mongoose = require('mongoose');
// når man opdaterer i MongoDB med funktionen findOneAndUpdate() vil den ikke længere vise en advarsel om at funktionen er forældet
mongoose.set('useFindAndModify', false);
mongoose.Promise = Promise;

// lokal mongoDB database - database-navn: Boernehaven_Praestevangen
// mongoose.connect(config.localMongoDB + '/Boernehaven_Praestevangen', {useNewUrlParser: true});

// atlas mongoDB server database - database-navn: Boernehaven_Praestevangen
mongoose.connect(config.atlasMongoDB + '/Boernehaven_Praestevangen?retryWrites=true', {useNewUrlParser: true});

// ROUTES FOR THE APP
const paedagogRouter = require('./routes/paedagog');
const blaeksprutteRouter = require('./routes/blaeksprutte');
const adminRouter = require('./routes/admin');
const checkinRouter = require('./routes/check-in');
app.use('/paedagog', paedagogRouter);
app.use('/blaeksprutte', blaeksprutteRouter);
app.use('/admin', adminRouter);
app.use('/checkin', checkinRouter);

// START THE SERVER
const port = process.env.PORT || config.localPort;
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app;