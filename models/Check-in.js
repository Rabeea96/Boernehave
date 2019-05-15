const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkinSchema = new Schema({
    paedagogInitialer : String,
    dato : String,
    tjekketInd : String
});

module.exports = mongoose.model('check-ins', checkinSchema);