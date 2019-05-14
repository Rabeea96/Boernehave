const NUMPAD = {

    password : [],
    pinkoder : [],
    pinkode : "",
    paedagog : "",
    blaekspruttePinkode : "",
    paedagog_checkin_ID : "",

    // sætter onclick på knapperne samt div-elementer der fungerer som knapper
    set_onclicks : function() {
        let tilbage = document.querySelector("#tilbage");
        let slet = document.querySelector("#removeADigit");
        let numbers = document.querySelectorAll(".number");

        if (tilbage != null) {
            tilbage.onclick = function () {
                NUMPAD.tilbage();
            }
        }
        if (slet != null) {
            slet.onclick = function () {
                NUMPAD.slet();
            }
        }
        for(let i = 0; i < numbers.length; i++) {
            if(numbers[i] != null) {
                numbers[i].onclick = function () {
                    NUMPAD.digitEntered(numbers[i].innerHTML);
                }
            }
        }
    },

    openNumpad : function(element) {
        // henter pædagog-id & handling fra forrige side
        let text = window.location.hash.substring(1);
        if(text == "" || text == undefined || text == null){
            NUMPAD.tilbage();
        } else {
            let resultat = text.split("#");
            NUMPAD.currentAction = resultat[1]; // handling/action
            let message = document.getElementById('message');

            switch (NUMPAD.currentAction) {
                case 'vaelg-blaeksprutte':
                    message.innerHTML = "Vælg blæksprutte";
                    let elementId1 = resultat[0]; // ID på pædagogfeltet
                    NUMPAD.paedagog = document.querySelector("#" + elementId1);
                    NUMPAD.paedagog.classList.remove("paedagogDeselected");
                    break;

                case 'aendre-dagsplan':
                    message.innerHTML = "Ændre dagsplan";
                    let elementId2 = resultat[0]; // ID på pædagogfeltet
                    NUMPAD.paedagog = document.querySelector("#" + elementId2);
                    NUMPAD.paedagog.classList.remove("paedagogDeselected");
                    break;

                case 'tjek-ind':
                    message.innerHTML = "Tjek ind";
                    let elementId3 = resultat[0]; // ID på pædagogfeltet
                    NUMPAD.paedagog = document.querySelector("#" + elementId3);
                    NUMPAD.paedagog.classList.remove("paedagogDeselected");
                    break;

                case 'tjek-ud':
                    message.innerHTML = "Tjek ud";
                    let elementId4 = resultat[0]; // ID på pædagogfeltet
                    NUMPAD.paedagog = document.querySelector("#" + elementId4);
                    NUMPAD.paedagog.classList.remove("paedagogDeselected");
                    break;
            }
        }
    },

    closeNumpad : function() {
        if (NUMPAD.currentAction == "aendre-dagsplan") {
            window.location = "/blaeksprutte"
        } else {
            window.location = "/";
        }

    },

    digitEntered : function(digit) {
        if (NUMPAD.password.length < 4) {
            NUMPAD.password.push(digit);
            NUMPAD.updateDisplay();
        } else {
            NUMPAD.passwordEntered();
        }
    },

    updateDisplay : function() {
        if (NUMPAD.password.length == 4) {
            NUMPAD.passwordEntered();
        }

        for (let i = 1; i < NUMPAD.password.length + 1; i++) {
            document.querySelector('.display' + i).innerText = NUMPAD.password[i - 1];
        }

    },

    passwordEntered : function() {
        switch (NUMPAD.currentAction) {
            case 'vaelg-blaeksprutte':
                if (NUMPAD.pinkoder.includes(NUMPAD.password.join(''))) {
                    NUMPAD.confirmPassword('correctPassword');
                    // Funktion der sætter den nye blaeksprutte
                    SCRIPT.blaeksprutteFeltClicked = true;
                    SCRIPT.blaeksprutteChanged(NUMPAD.paedagog);
                } else {
                    NUMPAD.confirmPassword('incorrectPassword');
                }
                break;

            case 'aendre-dagsplan':
                if (NUMPAD.password.join('') == NUMPAD.blaekspruttePinkode) {
                    NUMPAD.confirmPassword('correctPassword');
                    NUMPAD.closeNumpad();
                    // Funktion der giver lov til at ændre dagsplanen
                } else {
                    NUMPAD.confirmPassword('incorrectPassword');
                }
                break;

            case 'tjek-ind':
                if (NUMPAD.password.join('') == NUMPAD.pinkode) {
                    NUMPAD.confirmPassword('correctPassword');
                    // Funktion der tjekker pædagogen ind
                    SCRIPT.tjekInd(NUMPAD.paedagog.children[2].innerHTML, SCRIPT.getDato().datoString);
                } else {
                    NUMPAD.confirmPassword('incorrectPassword');
                }
                break;

            case 'tjek-ud':
                if (NUMPAD.password.join('') == NUMPAD.pinkode) {
                    NUMPAD.confirmPassword('correctPassword');
                    // Funktion der tjekker pædagogen ud
                    SCRIPT.tjekUd(NUMPAD.paedagog_checkin_ID, NUMPAD.paedagog.children[2].innerHTML, SCRIPT.getDato().datoString);
                } else {
                    NUMPAD.confirmPassword('incorrectPassword');
                }
                break;
        }
    },

    confirmPassword : function(result) {
        // Gør displayet grønt (rigtig pinkode)
        for (let i = 1; i <= 4; i++) {
            document.querySelector('.display' + i).classList.add(result);
        }

        // Tømmer displayet for tal
        setTimeout(() => {
            for (let i = 1; i <= 4; i++) {
                document.querySelector('.display' + i).innerText = "";
                document.querySelector('.display' + i).classList.remove(result);
                NUMPAD.password.pop();
            }
        }, 1000);

        // Luk numpad hvis korrekt pinkode
        if (result == 'correctPassword') {
            setTimeout(NUMPAD.closeNumpad, 1500);

        } else {
            // Gør displayet rødt (forkert pinkode)
            for (let i = 1; i <= 4; i++) {
                document.querySelector('.display' + i).classList.add(result);
            }
        }
    },

    tilbage : function() {
        window.location = "/";
    },

    slet : function() {
        // Sletter et tal fra displayet
        document.querySelector('.display' + NUMPAD.password.length).innerText = "";
        NUMPAD.password.pop();
    },

    getPinkode : function() {
        let url = "/paedagog/paedagoger";
        fetch(url)
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {
                for (let i = 0; i < resultat.length; i++) {
                    if (NUMPAD.paedagog.children[2].innerHTML == resultat[i].initialer) {
                        NUMPAD.pinkode = resultat[i].pinkode;
                    }
                }
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    },

    getPinkoder : function() {
        let url = "/paedagog/paedagoger";

        fetch(url)
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {

                for (let i = 0; i < resultat.length; i++) {
                    NUMPAD.pinkoder.push(resultat[i].pinkode);
                }
            })
            .catch(fejl => console.log('Fejl: ' + fejl));

        return NUMPAD.pinkoder;
    },

    getCheckinID : function() {
        let url = "/checkin/dagsdato";
        fetch(url)
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {
                if(resultat.length != 0) {
                    for (let i = 0; i < resultat.length; i++) {
                        if (NUMPAD.paedagog.children[2].innerHTML == resultat[i].paedagogInitialer) {
                            NUMPAD.paedagog_checkin_ID = resultat[i]._id;
                            break;
                        }
                    }
                }
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    },

    // pædagogerne hentes fra databasen
    getPaedagoger : function(){

        let url = "/paedagog/paedagoger";

        fetch(url)
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {

                // henter pædagogernes navne & initialer fra databasen og tilføjer dem til pædagog-felterne
                for(let i = 0; i < resultat.length; i++){
                    let element = document.querySelector("#grid-paedagog" +(i+1));
                    if(element != null) {
                        element.children[0].innerHTML = resultat[i].navn;
                        element.children[2].innerHTML = resultat[i].initialer;
                    }
                }
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    },

    getBlaeksprutte : function() {
        let blaeksprutte = document.querySelector("#blaeksprutte-felt");
        let url = "/blaeksprutte/valgt-blaeksprutte";
        fetch(url)
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {
                if(resultat.length != 0) {
                    if(blaeksprutte != null) {
                        blaeksprutte.innerHTML = resultat[0].initialer;
                    }
                    NUMPAD.blaekspruttePinkode = resultat[0].pinkode;
                }
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    }
}

NUMPAD.set_onclicks();
NUMPAD.openNumpad();
NUMPAD.getPaedagoger();
NUMPAD.getBlaeksprutte();
NUMPAD.getPinkoder();
NUMPAD.getPinkode();
NUMPAD.getCheckinID();