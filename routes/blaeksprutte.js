const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();
const path = require('path');

// blæksprutte relaterede endpoints
router.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../public', 'blaeksprutte.html'));
});

router.get('/valgt-blaeksprutte', (request, response) => {
    controller.getBlaeksprutte()
        .then(blaeksprutte => {
            response.send(blaeksprutte);
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
});

router.post('/', (request, response) => {
    controller.createBlaeksprutte(request.body.navn, request.body.initialer);
    response.send(request.body);
});

router.put('/valgt-blaeksprutte', (request, response) => {
    controller.updateBlaeksprutte(request.body.id, request.body.navn, request.body.initialer)
    response.send(request.body);
});

// kalender/rum relaterede endpoints
router.get('/rum', (request, response) => {
    controller.getRum()
        .then(val => response.json(val))
        .catch(fejl => console.log('Fejl: ' + fejl));
});

router.post('/rum', (request, response) => {
    let rum = undefined;
    controller.createRum(request.body.index, request.body.dato)
        .then(rumOprettet => {
            rum = rumOprettet;
            return rumOprettet;
        })
        .then(rummet => {
            for(let i = 0; i < request.body.paedagogInitialer.length; i++) {
                controller.addPaedagogTilRum(request.body.paedagogInitialer[i], request.body.index);
            }
            response.send(request.body);
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
});

router.put('/rum', (request, response) => {
    controller.updateRum(request.body.id, request.body.index, request.body.dato);
    response.send(request.body);
});

module.exports = router;