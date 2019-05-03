const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blaeksprutteSchema = new Schema({
    navn : String,
    initialer : String
});

module.exports = mongoose.model('blaekspruttes', blaeksprutteSchema);