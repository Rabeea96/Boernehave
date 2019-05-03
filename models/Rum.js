const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rumSchema = new Schema({
    index : String,
    dato : String,
    paedagoger: [{type: Schema.Types.ObjectId, ref: 'paedagogers'}] // 0..* link til paedagogers-collection
});

module.exports = mongoose.model('rums', rumSchema);