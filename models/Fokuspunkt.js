const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fokuspunktSchema = new Schema({
    fokuspunkt : String
    },
    { collection: 'Fokuspunkter' });

module.exports = mongoose.model('Fokuspunkter', fokuspunktSchema);