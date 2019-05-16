const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blaeksprutteSchema = new Schema({
    navn : String,
    initialer : String,
    pinkode : String
    },

    // denne linje kode forhindrer MongoDB i at tilføje et 's' i slutningen af collection-navnet
    // fordi MongoDB tilføjer normalt automatisk et 's' i slutningen af hver collection navn hvis den ikke ender på et 's'
    { collection: 'Blaeksprutte' });

module.exports = mongoose.model('Blaeksprutte', blaeksprutteSchema);