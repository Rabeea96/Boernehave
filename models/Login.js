const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    navn : String,
    password : String,
    level : String
});

module.exports = mongoose.model('logins', loginSchema);