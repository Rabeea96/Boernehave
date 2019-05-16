const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 0..* link til paedagogers-collection
const rumSchema = new Schema({
    paedagogInitialer : Array,
    paedagogClasses : Array,
    index : String,
    dato : String,
    aaben : String
    },
    { collection: 'Rum' });

module.exports = mongoose.model('Rum', rumSchema);