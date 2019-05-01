"use strict";

const Paedagog = require('../models/Paedagog');

exports.getPaedagoger = function() {
    return Paedagog.find().exec();
}

exports.getPaedagog = function(paedagogID) {
    return Paedagog.findOne({_id: paedagogID}).exec();
}

exports.createPaedagog = function(navn, initialer) {
    const paedagogCreated = new Paedagog({navn : navn, initialer : initialer});
    return paedagogCreated.save();
}