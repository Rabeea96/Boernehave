const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paedagogSchema = new Schema({
    navn : String,
    initialer : String
});

module.exports = mongoose.model('paedagogers', paedagogSchema);