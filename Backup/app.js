"use strict";

// INITIALIZATION
const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));

// MONGODB & MONGOOSE SETUP
const mongoose = require('mongoose');
mongoose.Promise = Promise;

// lokal mongoDB database - database-navn: Boernehaven_Praestevangen
// mongoose.connect(config.localMongoDB + '/Boernehaven_Praestevangen', {useNewUrlParser: true});

// atlas mongoDB server database - database-navn: Boernehaven_Praestevangen
mongoose.connect(config.atlasMongoDB + '/Boernehaven_Praestevangen?retryWrites=true', {useNewUrlParser: true});

// ROUTES FOR THE APP
const paedagogRouter = require('./routes/paedagog');
const blaeksprutteRouter = require('./routes/blaeksprutte');
const adminRouter = require('./routes/admin');
app.use('/paedagog', paedagogRouter);
app.use('/blaeksprutte', blaeksprutteRouter);
// app.use('/admin', adminRouter);

// START THE SERVER
const port = process.env.PORT || config.localPort;
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app;