"use strict";

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
    const paedagogCreated = new Paedagog({navn : navn, initialer : initialer});
    return paedagogCreated.save();
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

exports.createRum = function(index, dato) {
    const rumCreated = new Rum({index: index, dato: dato});
    return rumCreated.save();
}

exports.updateRum = function(id, index, dato) {
    return Rum.findOneAndUpdate({_id: id}, {index: index, dato: dato}).exec();
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