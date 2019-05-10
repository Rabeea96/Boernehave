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
    let userFound = "";
    controller.getPaedagogInitialer(request.body.initialer)
        .then(user => {
            if(user != null) {
                if (user.initialer == request.body.initialer) {
                    userFound = user;
                    response.send({ok: false});
                }
            } else {
                if (userFound == "") {
                    controller.createPaedagog(request.body.navn, request.body.initialer, request.body.pinkode);
                    response.send({ok: true});
                }
            }
        })
        .catch(fejl => { console.log('Fejl: ' + fejl)
            console.log(request.body);
        })
});

router.delete('/:id', (request, response) => {
    controller.removePaedagog(request.params.id);
    response.send([""]);
});

router.put('/:id', (request, response) => {

    controller.getPaedagog(request.params.id)
        .then(paedagog => controller.updatePaedagog(request.params.id, request.body.navn, request.body.initialer, request.body.pinkode))
        .catch(fejl => console.log('Fejl: ' + fejl));

    response.send([request.body]);
});

module.exports = router;