"use strict";

const Paedagog = require('../models/Paedagog');
const Blaeksprutte = require('../models/Blaeksprutte');
const Rum = require('../models/Rum');
const Login = require('../models/Login');
const Fokuspunkt = require('../models/Fokuspunkt');
const Checkin = require('../models/Check-in');

// paedagog
exports.getPaedagoger = function() {
    return Paedagog.find().exec();
}

exports.getPaedagog = function(paedagogID) {
    return Paedagog.findOne({_id: paedagogID}).exec();
}

exports.getPaedagogInitialer = function(paedagogInitialer) {
    return Paedagog.findOne({initialer: paedagogInitialer}).exec();
}

exports.createPaedagog = function(navn, initialer, pinkode) {
    const paedagogCreated = new Paedagog({navn : navn, initialer : initialer, pinkode : pinkode});
    return paedagogCreated.save();
}

exports.removePaedagog = function(paedagogID) {
    return Paedagog.findOneAndDelete({_id: paedagogID}).exec();
}

exports.updatePaedagog = function(paedagogID, navn, initialer, pinkode) {
    return Paedagog.findOneAndUpdate({_id: paedagogID}, {navn : navn, initialer : initialer, pinkode : pinkode}).exec();
}

// blæksprutte
exports.getBlaeksprutte = function() {
    return Blaeksprutte.find().limit(1).exec();
}

exports.createBlaeksprutte = function(navn, initialer, pinkode) {
    const blaeksprutteCreated = new Blaeksprutte({navn : navn, initialer : initialer, pinkode : pinkode});
    return blaeksprutteCreated.save();
}

exports.updateBlaeksprutte = function(id, navn, initialer, pinkode) {
    return Blaeksprutte.findOneAndUpdate({_id: id}, {navn: navn, initialer: initialer, pinkode: pinkode}).exec();
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

// admin
exports.getAdmin = function() {
    return Login.findOne({level: "1"}).exec(); // level 1 betyder admin
}

exports.createAdmin = function(brugernavn, passwordHash, level) {
    const adminCreated = new Login({brugernavn : brugernavn, passwordHash : passwordHash, level : level});
    return adminCreated.save();
}

// fokuspunkter
exports.getFokuspunkter = function() {
    return Fokuspunkt.find().exec();
}

exports.getFokuspunkt = function(fokuspunktID) {
    return Fokuspunkt.findOne({_id: fokuspunktID}).exec();
}

exports.createFokuspunkt = function(fokuspunkt) {
    const fokuspunktCreated = new Fokuspunkt({fokuspunkt : fokuspunkt});
    return fokuspunktCreated.save();
}

exports.removeFokuspunkt = function(fokuspunktID) {
    return Fokuspunkt.findOneAndDelete({_id: fokuspunktID}).exec();
}

exports.updateFokuspunkt = function(fokuspunktID, fokuspunkt) {
    return Fokuspunkt.findOneAndUpdate({_id: fokuspunktID}, {fokuspunkt : fokuspunkt}).exec();
}

// tjekind & tjekud
exports.getCheckins = function() {
    return Checkin.find().exec();
}

exports.getCheckins_dagsdato = function() {

    // henter dato i formatet DD-MM-ÅÅÅÅ
    let dato = new Date();
    let datoString =
        ("0" + dato.getUTCDate()).slice(-2) + "-" +
        ("0" + (dato.getUTCMonth()+1)).slice(-2) + "-" +
        dato.getUTCFullYear();

    return Checkin.find({dato: datoString}).exec();
}

exports.createCheckin = function(paedagogInitialer, dato, tjekketInd) {
    const checkinCreated = new Checkin({paedagogInitialer : paedagogInitialer, dato : dato, tjekketInd : tjekketInd});
    return checkinCreated.save();
}

exports.updateCheckin = function(checkinID, paedagogInitialer, dato, tjekketInd) {
    return Checkin.findOneAndUpdate({_id: checkinID}, {paedagogInitialer : paedagogInitialer, dato : dato, tjekketInd : tjekketInd}).exec();
}