const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paedagogSchema = new Schema({
    navn : String,
    initialer : String,
    rum: {type: Schema.Types.ObjectId, ref: 'rums'} // 0..1 link til rums-collection
});

module.exports = mongoose.model('paedagogers', paedagogSchema);