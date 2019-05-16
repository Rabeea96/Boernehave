const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkinSchema = new Schema({
    paedagogInitialer : String,
    dato : String,
    tjekketInd : String
    },
    { collection: 'Tjekind' });

module.exports = mongoose.model('Tjekind', checkinSchema);