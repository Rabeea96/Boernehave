const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    brugernavn : String,
    passwordHash : String,
    level : String
    },
    { collection: 'Login' });

module.exports = mongoose.model('Login', loginSchema);