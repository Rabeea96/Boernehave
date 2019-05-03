const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

router.get('/paedagoger', (request, response) => {
    controller.getPaedagoger()
        .then(val => response.json(val))
        .catch(fejl => console.log('Fejl: ' + fejl));
});

router.get('/:id', (request, response) => {

    controller.getPaedagog(request.params.id)
        .then(paedagog => {
            response.send(paedagog);
        })
        .catch(fejl => {console.log('Fejl: ' + fejl)
            response.send("Pædagogen eksisterer ikke!")
        })
});

router.post('/paedagoger', (request, response) => {
    if(request.body.navn.length > 0 && request.body.initialer.length > 0) {
        controller.createPaedagog(request.body.navn, request.body.initialer);
        response.send(request.body);

    } else {
        response.send([""]);
    }
});

module.exports = router;