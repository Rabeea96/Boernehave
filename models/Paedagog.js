const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 0..1 link til rums-collection
const paedagogSchema = new Schema({
    navn : String,
    initialer : String,
    pinkode : String
});

module.exports = mongoose.model('paedagogers', paedagogSchema);