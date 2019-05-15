const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');

router.get('/', (request, response) => {
    const navn = request.session.navn;
    if (!navn) {
        response.sendFile(path.join(__dirname, '../public', 'admin.html'));
    }
    else {
        response.redirect('/admin/session');
    }
});

router.get('/admin.css', (request, response) => {
    response.sendFile(path.join(__dirname, '../public', 'admin.css'));
});

router.get('/admin_script.js', (request, response) => {
    response.sendFile(path.join(__dirname, '../public', 'admin_script.js'));
});

router.get('/handlebars-v4.0.12.js', (request, response) => {
    response.sendFile(path.join(__dirname, '../public', 'handlebars-v4.0.12.js'));
});

router.get('/visFokuspunkter', (request, response) => {
    const navn = request.session.navn;
    if (navn) {
        response.sendFile(path.join(__dirname, '../public', 'admin_visFokuspunkter.html'));
    }
    else {
        response.redirect('/admin');
    }
});

router.get('/opretfokuspunkter', (request, response) => {
    const navn = request.session.navn;
    if (navn) {
        response.sendFile(path.join(__dirname, '../public', 'admin_opretFokuspunkter.html'));
    }
    else {
        response.redirect('/admin');
    }
});

router.get('/registrere_paedagog', (request, response) => {
    const navn = request.session.navn;
    if (navn) {
        response.sendFile(path.join(__dirname, '../public', 'admin_registrerePaedagog.html'));
    }
    else {
        response.redirect('/admin');
    }
});

router.get('/session', (request, response) => {
    const navn = request.session.navn;
    if (navn) {
         response.sendFile(path.join(__dirname, '../public', 'admin_session.html'));
    }
    else {
        response.redirect('/admin');
    }
});

router.get('/logout', (request, response) => {
    request.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            response.redirect('/admin');
        }
    });
});

router.get('/fokuspunkter', (request, response) => {
    controller.getFokuspunkter()
        .then(val => response.json(val))
        .catch(fejl => console.log('Fejl: ' + fejl));
});

router.get('/:id', (request, response) => {
    controller.getFokuspunkt(request.params.id)
        .then(fokuspunkt => {
            response.send(fokuspunkt);
        })
        .catch(fejl => {console.log('Fejl: ' + fejl)
            response.send("Fokuspunkt eksisterer ikke!")
        })
});

router.post('/opretAdmin', (request, response) => {
    const saltRounds = 10;
    const brugernavn = request.body.navn;
    const myPlaintextPassword = request.body.password;
    const level = request.body.level;


    // auto-genererer salt og hash
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {

        // gemmer brugernavn, password-hash samt level i databasen
        controller.createAdmin(brugernavn, hash, level);
    });
    response.send([request.body]);
});

router.post('/login', (request, response) => {
    const brugernavn = request.body.navn
    const myPlaintextPassword = request.body.password;

    controller.getAdmin()
        .then(user => {
            let hash = user.passwordHash;

            // tjekker om den indtastede password's hash svarer til password-hashet i databasen - derefter tjekker den også om brugernavnet stemmer
            bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
                // res == true hvis den indtastede password's hash svarer til password-hashet i databasen
                if(user.brugernavn == brugernavn && res == true) {
                    request.session.navn = brugernavn;
                    response.send({ok: true});
                } else {
                    response.send({ok: false});
                }
            });
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
});

router.post('/fokuspunkter', (request, response) => {
    controller.getFokuspunkter()
        .then(fokuspunkter => {
            if(fokuspunkter.length < 3) {
                controller.createFokuspunkt(request.body.fokuspunkt);
                response.send({ok: true});
            } else {
                response.send({ok: false});
            }
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
});

router.delete('/:id', (request, response) => {
    controller.removeFokuspunkt(request.params.id);
    response.send([""]);
});

router.put('/:id', (request, response) => {

    controller.getFokuspunkt(request.params.id)
        .then(fokuspunkt => controller.updateFokuspunkt(request.params.id, request.body.fokuspunkt))
        .catch(fejl => console.log('Fejl: ' + fejl));

    response.send([request.body]);
});

module.exports = router;