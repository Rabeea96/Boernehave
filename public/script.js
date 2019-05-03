let initialer = ""; // bruges til at indsætte den valgte pædagogs initialer i flere felter
let paedagogValgt = ""; // bruges til pædagog-feltet for den pædagog som er valgt (dvs. HTML elementet for pædagogen)
let åbenLuk = false; // Får en værdi alt efter om åben rum eller luk rum knap er valgt
let id_blaeksprutte;
let initialer_blaeksprutte = "";
let blaeksprutteFeltClicked = false;

// vælger en pædagog
function placerePaedagog(element) {

    //Hvis en åben/luk knap er valgt
    if (åbenLuk) {
        åbenLuk = false;
        document.getElementById('aaben-rum').style.border = '1px black solid';
        document.getElementById('luk-rum').style.border = '1px black solid';
    }

    // hvis der allerede er valgt en pædagog - skal den deSelectes
    if(paedagogValgt != "") {
        initialer = "";
        paedagogValgt.style.opacity = "0.5";
    }

    // en ny pædagog bliver valgt
    paedagogValgt = element;
    initialer = element.children[2].innerHTML;
    element.style.opacity = "1";
}

function åbenLukKnapper(id) {

    if (initialer != "") {
        initialer = "";
        paedagogValgt.style.opacity = '0.5';
        paedagogValgt = "";

    }

    //Hvis åben eller luk ikke er valgt
    if (åbenLuk === false) {
        document.getElementById(id).style.border = '2px red solid';
        åbenLuk = id;

        //Hvis åben eller luk er valgt
    } else {
        if (åbenLuk === id) {
            document.getElementById(id).style.border = '1px black solid';
            åbenLuk = false;
        } else {
            document.getElementById(id).style.border = '2px red solid';
            åbenLuk = id;
            if (id === "aaben-rum") {
                document.getElementById('luk-rum').style.border = '1px black solid';
            } else {
                document.getElementById('aaben-rum').style.border = '1px black solid';
            }
        }
    }

}

function lukLokale(element) {

    // Hvis der er pædagog i feltet
    if (!(element.children[0].innerHTML === "" && element.children[1].innerHTML === "" && element.children[2].innerHTML === "")) {

    } else {
        // Hvis åben-rum eller luk-rum funktion er aktiveret/under brug
        if (åbenLuk === "aaben-rum") {
            element.classList.remove('lukketRum');
        } else {
            element.classList.add('lukketRum');
        }
    }
}

// placerer pædagogen på et felt
function paedagogPlaceret(element) {
    //Hvis åben/luk ikke er valgt
    if (åbenLuk === false) {

        if (element.classList.contains('lukketRum')) {
            // Do nothing

        } else {
            // fjern-knap
            let fjernKnap = document.createElement("button");
            fjernKnap.innerHTML = "Fjern";

            // denne div-element bruges til at undgå float problemerne
            let divClear = document.createElement("div");
            divClear.style.clear = "both";
            divClear.style.height = "0 px";
            fjernKnap.style.float = "right";
            fjernKnap.onclick = function () {
                fjernPaedagog(this.parentElement, this)
            };

            // gemmer klassen som har baggrundfarven for den spedicfikke pædagog til feltet som er valgt
            let number = /\d+/.exec(paedagogValgt.id); // denne regex-expression gemmer tallet fra id'et (er id'et fx paedagog7 - gemmer den 7-tallet)
            let index = number - 1;
            let className = "paedagogFarve" + (index + 1); // i CSS-filen har pædagogernes felt-farver hver især en klasse (fx paedagogFarve7)

            // de 3 pædagoger-pladser som er i hvert felt
            let paedagog1 = element.children[0];
            let paedagog2 = element.children[1];
            let paedagog3 = element.children[2];

            // hvis pædagogen ikke allerede er tilføjet til denne felt i kalenderen - tjekker den om en af de 3 pædagogpladser i feltet er tomt
            if (!paedagog1.textContent.includes(initialer) && !paedagog2.textContent.includes(initialer) && !paedagog3.textContent.includes(initialer)) {
                // hvis første pædagog-plads er tomt og en pædagog er valgt - tilføjes pædagogen til feltet
                if (paedagog1.innerHTML == "" && initialer != "") {
                    paedagog1.innerHTML = "&nbsp;&nbsp;" + initialer + "&nbsp;&nbsp;&nbsp;&nbsp;"; // initialerne for den valgte pædagog tilføjes til feltet
                    paedagog1.appendChild(fjernKnap);
                    paedagog1.appendChild(divClear);
                    paedagog1.classList.add(className); // tilføjer klassen som har baggrundfarven for den spedicfikke pædagog til feltet som er valgt

                } else if (paedagog2.innerHTML == "" && initialer != "") {
                    paedagog2.innerHTML = "&nbsp;&nbsp;" + initialer + "&nbsp;&nbsp;&nbsp;&nbsp;";
                    paedagog2.appendChild(fjernKnap);
                    paedagog2.appendChild(divClear);
                    paedagog2.classList.add(className);

                } else if (paedagog3.innerHTML == "" && initialer != "") {
                    paedagog3.innerHTML = "&nbsp;&nbsp;" + initialer + "&nbsp;&nbsp;&nbsp;&nbsp;";
                    paedagog3.appendChild(fjernKnap);
                    paedagog3.classList.add(className);
                }
            }
        }
    } else {
        lukLokale(element);
    }
}

// placerer pædagogen på et felt - denne funktion virker kun på morgensamling-felterne (køkken & badeværelse)
function paedagogPlaceret_morgensamling(element) {
    let fjernKnap = document.createElement("button");
    fjernKnap.innerHTML = "Fjern";
    let divClear = document.createElement("div");
    divClear.style.clear = "both";
    divClear.style.height = "0 px";
    fjernKnap.style.float = "right";
    fjernKnap.onclick = function() {fjernPaedagog(this.parentElement, this)};

    // tilføjer klassen som har baggrundfarven for den spedicfikke pædagog
    let number = /\d+/.exec(paedagogValgt.id);
    let index = number-1;
    let className = "paedagogFarve" + (index+1);

    // i køkken samt badeværelse under morgensamling er der kun plads til én pædagog
    let paedagog1 = element.children[0];

    // hvis pædagogen ikke allerede er tilføjet til denne felt i kalenderen
    if(!paedagog1.textContent.includes(initialer)) {
        if (paedagog1.innerHTML == "" && initialer != "") {
            paedagog1.innerHTML = "&nbsp;&nbsp;" + initialer + "&nbsp;&nbsp;&nbsp;&nbsp;";
            paedagog1.appendChild(fjernKnap);
            paedagog1.appendChild(divClear);
            paedagog1.classList.add(className);
        }
    }
}

// fjerner en pædagog fra et felt
function fjernPaedagog(parent, element) {
    // hvis der allerede er valgt en pædagog - skal den deSelectes
    if(paedagogValgt != "") {
        initialer = "";
        paedagogValgt.style.opacity = "0.5";
    }

    // parent er i det her tilfælde en af de 3 pædagog-pladser i feltet og element er fjern-knappen
    parent.removeChild(element);
    parent.innerHTML = "";

    // fjerner klassen som har baggrundfarven for den spedicfikke pædagog og dermed også farven fra feltet
    // klassen er som regel den sidste klasse og derfor er det den sidste klasse der fjernes
    parent.classList.remove(parent.classList.item(parent.classList.length-1));
}

// pædagogerne hentes fra databasen
function hentPaedagoger(){

    let url = "/paedagog/paedagoger";

    fetch(url)
        .then(response => {
            if (response.status >= 400)
                throw new Error(response.status);
            else
                return response.json();
        })
        .then(resultat => {

            // henter pædagogernes navne & initialer fra databasen, opretter dem som objekter, tilføjer dem til paedagoger arrayet -
            // samt tilføjer dem til pædagog-felterne
            for(let i = 0; i < resultat.length; i++){
                let element = document.querySelector("#grid-paedagog" +(i+1));
                element.children[0].innerHTML = resultat[i].navn;
                element.children[2].innerHTML = resultat[i].initialer;
            }
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
}

function visForside() {
    window.location = "/";
}

function visBlaeksprutteVindue() {
    window.location = "/blaeksprutte";
}

function vaelgeBlaeksprutte() {
    let paedagoger = document.querySelectorAll(".paedagoger");
    for(let i = 0; i < paedagoger.length; i++) {
        paedagoger[i].style.opacity = "0.5";
    }
    blaeksprutteFeltClicked = true;
}

function blaeksprutteValgt(element) {
    if(blaeksprutteFeltClicked == true) {
        let paedagoger = document.querySelectorAll(".paedagoger");
        for(let i = 0; i < paedagoger.length; i++) {
            paedagoger[i].style.opacity = "1";
        }
        let navn_blaeksprutte = element.children[0].innerHTML;
        initialer_blaeksprutte = element.children[2].innerHTML;

        let blaeksprutte = document.querySelector("#blaeksprutte-felt");
        blaeksprutte.innerHTML = initialer_blaeksprutte;

        // hvis der ingen blæksprutte er i databasen - så oprettes en blæksprutte i databasen
        if(id_blaeksprutte == "" || id_blaeksprutte == undefined) {
            postBlaeksprutte(navn_blaeksprutte, initialer_blaeksprutte);

            // ellers så opdateres blæksprutten i databasen
        } else {
            putBlaeksprutte(id_blaeksprutte, navn_blaeksprutte, initialer_blaeksprutte);
        }

        blaeksprutteFeltClicked = false;

        initialer_blaeksprutte = "";
    }
}

function blaeksprutteId() {
    let usersUrl = "/blaeksprutte/valgt-blaeksprutte";

    fetch(usersUrl)
        .then(response => {
            if (response.status >= 400)
                throw new Error(response.status);
            else
                return response.json();
        })
        .then(resultat => {
            if(resultat.length != 0) {
                id_blaeksprutte = resultat[0]._id;
            }
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
}

function hentBlaeksprutte() {
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
            }
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
}

function postBlaeksprutte(navn, initialer) {

    let url = "/blaeksprutte";
    let data = {navn: navn, initialer: initialer};

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })
        .then(resultat => {
            if (resultat.status >= 400)
                throw new Error(resultat.status);
            else
                return resultat.json();
        })
        .then(resultat => console.log(`Resultat: %o`, resultat))
        .catch(fejl => console.log('Fejl: ' + fejl));
}

function putBlaeksprutte(id, navn, initialer) {
    let url = '/blaeksprutte/valgt-blaeksprutte';
    let data = {id: id, navn: navn, initialer: initialer };

    fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            if (response.status >= 400)
                throw new Error(response.status);
            else
                return response.json();
        })
        .then(resultat => console.log(`Resultat: %o`, resultat))
        .catch(fejl => console.log('Fejl: ' + fejl));
}

function postRum(paedagogInitArray, index, dato) {
    let url = "/blaeksprutte/rum";
    let data = { paedagogInitialer: paedagogInitArray, index: index, dato: dato };

    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(resultat => {
            if (resultat.status >= 400)
                throw new Error(resultat.status);
            else
                return resultat.json();
        })
        .then(resultat => {
            console.log(`Resultat: %o`, resultat)
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
}

hentPaedagoger();
blaeksprutteId();
hentBlaeksprutte();

// function myFunction() {
//     let url = "/blaeksprutte/rum";
//
//     fetch(url)
//         .then(response => {
//             if (response.status >= 400)
//                 throw new Error(response.status);
//             else
//                 return response.json();
//         })
//         .then(resultat => {
//             console.log(resultat[1].paedagoger[0]);
//         })
//         .catch(fejl => console.log('Fejl: ' + fejl));
// }
//
// myFunction();