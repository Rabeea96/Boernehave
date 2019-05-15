const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();
const path = require('path');
const cookieParser = require('cookie-parser');

// blæksprutte relaterede endpoints
router.get('/', (request, response) => {
// hvis man prøver at gå ind på blæksprutte-vinduet, tjekker den om et blæksprutte-cookie er sat - hvis den ikke er sat navigerer den tilbage til forsiden
// blæksprutte-cookie bliver sat når man klikker på "Ændre dagsplan" og indtaster blæksprutte-pinkoden
// blæksprutte-cookie bliver fjernet igen når man klikker på "Tilbage til dagsplan" eller når blæksprutten gemmer dagsplanen
    if(request.cookies['blaeksprutteCookie'] == "Blaeksprutte") {
        response.sendFile(path.join(__dirname, '../public', 'blaeksprutte.html'));
    } else {
        response.redirect('/');
    }
});

router.get('/valgt-blaeksprutte', (request, response) => {
    controller.getBlaeksprutte()
        .then(blaeksprutte => {
            response.send(blaeksprutte);
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
});

router.post('/', (request, response) => {
    controller.createBlaeksprutte(request.body.navn, request.body.initialer, request.body.pinkode);
    response.send(request.body);
});

router.put('/valgt-blaeksprutte', (request, response) => {
    controller.updateBlaeksprutte(request.body.id, request.body.navn, request.body.initialer, request.body.pinkode)
    response.send(request.body);
});

// kalender/rum relaterede endpoints
router.get('/rum', (request, response) => {
    controller.getRum()
        .then(val => response.json(val))
        .catch(fejl => console.log('Fejl: ' + fejl));
});

router.get('/rum/dagsdato', (request, response) => {
    controller.getRum_dagsdato()
        .then(val => response.json(val))
        .catch(fejl => console.log('Fejl: ' + fejl));
});

router.post('/rum', (request, response) => {
    controller.createRum(request.body.paedagogInitialer, request.body.paedagogClassArray, request.body.index, request.body.dato, request.body.aaben);
    response.send(request.body);
});

router.put('/rum/dagsdato', (request, response) => {
    controller.updateRum(request.body.id, request.body.paedagogInitialer, request.body.paedagogClassArray, request.body.index, request.body.dato, request.body.aaben);
    response.send(request.body);
});

module.exports = router;