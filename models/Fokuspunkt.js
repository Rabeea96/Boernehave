const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fokuspunktSchema = new Schema({
    fokuspunkt : String
});

module.exports = mongoose.model('fokuspunkters', fokuspunktSchema);