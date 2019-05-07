"use strict";

var ObjectId = require('mongoose').Types.ObjectId;

const Paedagog = require('../models/Paedagog');
const Blaeksprutte = require('../models/Blaeksprutte');
const Rum = require('../models/Rum');

// paedagog
exports.getPaedagoger = function() {
    return Paedagog.find().exec();
}

exports.getPaedagog = function(paedagogID) {
    return Paedagog.findOne({_id: paedagogID}).exec();
}

exports.createPaedagog = function(navn, initialer) {
    Paedagog.findOne({
        initialer: initialer
    }).exec().then((thereturned) => {
        if (!thereturned) {
            const paedagogCreated = new Paedagog({navn : navn, initialer : initialer});
            return paedagogCreated.save();
        }
    })
}



exports.deletePaedagog = function(paedagogID) {
    return Paedagog.findOne({_id: paedagogID}).deleteOne().exec();
}

// blæksprutte
exports.getBlaeksprutte = function() {
    return Blaeksprutte.find().exec();
}

exports.createBlaeksprutte = function(navn, initialer) {
    const blaeksprutteCreated = new Blaeksprutte({navn : navn, initialer : initialer});
    return blaeksprutteCreated.save();
}

exports.updateBlaeksprutte = function(id, navn, initialer) {
    return Blaeksprutte.findOneAndUpdate({_id: id}, {navn: navn, initialer: initialer}).exec();
}

// rum
exports.getRum = function() {
    return Rum.find().exec();
}

exports.getRum_dagsdato = function() {

    // henter dato i formatet DD-MM-ÅÅÅÅ
    let dato = new Date();
    let datoString =
        ("0" + dato.getUTCDate()).slice(-2) + "-" +
        ("0" + (dato.getUTCMonth()+1)).slice(-2) + "-" +
        dato.getUTCFullYear();

    return Rum.find({dato: datoString}).sort({ index: +1 }).collation({locale: "en_US", numericOrdering: true}).exec();
}

exports.createRum = function(paedagogInitialer, paedagogClasses, index, dato, aaben) {
    const rumCreated = new Rum({paedagogInitialer: paedagogInitialer, paedagogClasses: paedagogClasses, index: index, dato: dato, aaben: aaben});
    return rumCreated.save();
}

exports.updateRum = function(id, paedagogInitialer, paedagogClasses, index, dato, aaben) {
    return Rum.findOneAndUpdate({_id: id}, {paedagogInitialer: paedagogInitialer, paedagogClasses: paedagogClasses, index: index, dato: dato, aaben: aaben}).exec();
}

// collection- connections
exports.connectPaedagogTilRum = function(paedagog, rum) {
    paedagog.rum = rum;
    rum.paedagoger.push(paedagog);
    return Promise.all([rum.save(), paedagog.save()]);
}

exports.addPaedagogTilRum = async function(paedagogInit, rumIndex) {
    let paedagog = await Paedagog.findOne({initialer: paedagogInit}).exec();
    let rum = await Rum.findOne({index: rumIndex}).exec();
    await connectPaedagogTilRum(paedagog, rum);
    console.log('addPaedagogTilRum: %s <-> %s', paedagogInit, rumIndex);
}