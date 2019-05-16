const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 0..1 link til rums-collection
const paedagogSchema = new Schema({
    navn : String,
    initialer : String,
    pinkode : String
    },
    { collection: 'Paedagoger' });

module.exports = mongoose.model('Paedagoger', paedagogSchema);