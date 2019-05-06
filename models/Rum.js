const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rumSchema = new Schema({
    paedagogInitialer : Array,
    paedagogClasses : Array,
    index : String,
    dato : String,
    aaben : String
    // paedagoger: [{type: Schema.Types.ObjectId, ref: 'paedagogers'}] // 0..* link til paedagogers-collection
});

module.exports = mongoose.model('rums', rumSchema);