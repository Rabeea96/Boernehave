const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    brugernavn : String,
    passwordHash : String,
    level : String
});

module.exports = mongoose.model('logins', loginSchema);