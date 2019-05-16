const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/paedagoger', (request, response) => {
    controller.getPaedagoger()
        .then(val => response.json(val))
        .catch(fejl => console.log('Fejl: ' + fejl));
});

router.get('/numpad', (request, response) => {
    response.sendFile(path.join(__dirname, '../public', 'numpad.html'));
});

router.get('/numpad.css', (request, response) => {
    response.sendFile(path.join(__dirname, '../public', 'numpad.css'));
});

router.get('/numpad.js', (request, response) => {
    response.sendFile(path.join(__dirname, '../public', 'numpad.js'));
});

router.get('/script.js', (request, response) => {
    response.sendFile(path.join(__dirname, '../public', 'script.js'));
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
    let userFound = "";
    controller.getPaedagogInitialer(request.body.initialer)
        .then(user => {
            if(user != null) {
                if (user.initialer == request.body.initialer) {
                    userFound = user;
                    response.send({message: "Pædagog-initialerne findes i forvejen"});
                }
            } else {
                if (userFound == "") {
                    controller.createPaedagog(request.body.navn, request.body.initialer, request.body.pinkode);
                    response.send({message: "Pædagogen er nu registreret i systemet!"});
                }
            }
        })
        .catch(fejl => { console.log('Fejl: ' + fejl)
            console.log(request.body);
        })
});

router.delete('/:id', (request, response) => {
    controller.removePaedagog(request.params.id);
    response.send({message: "Pædagogen er nu slettet fra systemet!"});
});

router.put('/:id', (request, response) => {

    controller.getPaedagog(request.params.id)
        .then(paedagog => controller.updatePaedagog(request.params.id, request.body.navn, request.body.initialer, request.body.pinkode))
        .catch(fejl => console.log('Fejl: ' + fejl));

    response.send({message: "Pædagogen er nu opdateret i systemet!"});
});

module.exports = router;