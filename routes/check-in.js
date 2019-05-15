const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    controller.getCheckins()
        .then(val => response.json(val))
        .catch(fejl => console.log('Fejl: ' + fejl));
});

router.get('/dagsdato', (request, response) => {
    controller.getCheckins_dagsdato()
        .then(val => response.json(val))
        .catch(fejl => console.log('Fejl: ' + fejl));
});

router.post('/', (request, response) => {
    controller.createCheckin(request.body.paedagogInitialer, request.body.dato, request.body.tjekketInd);
    response.send(request.body);
});

router.put('/dagsdato', (request, response) => {
    controller.updateCheckin(request.body.id, request.body.paedagogInitialer, request.body.dato, request.body.tjekketInd);
    response.send(request.body);
});

module.exports = router;