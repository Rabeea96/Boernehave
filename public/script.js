let currentAction = "";
let id_blaeksprutte; //refator
let initialer_blaeksprutte = ""; //refactor
let blaeksprutteFeltClicked = false; //refactor
let selectedPaedagog;

let workers = new Array(10);

let selectionButtons = document.getElementById("grid-knapper").children;
let timeslots = document.getElementsByClassName("felter");
// "felter" skal aendres ved integration til blaekspriuttefelter eller ngoet
let paedagogbuttons = document.getElementsByClassName("blaeksprutteVindue");
console.log("Antal paedagogelementer " + paedagogbuttons.length);


//!!!!!!!!!
//!!!!!!!!!
//CLASS METHODS
//!!!!!!!!!
//!!!!!!!!!


class Paedagog {
    constructor(name, initials) {
        this.name = name;
        this.initials = initials;
    }

    getName() {
        return this.name;
    }
    getInitials() {
        return this.initials
    }
}
function addPaedagog(paedagog) {
    for (var q = 0; q < workers.length; q++) {

        if(workers[q]== null) {//grid-paedagog3
            let fieldname = "grid-paedagog" + (q+1);
            console.log(fieldname);
            let field = document.getElementById(fieldname);
            console.log(field);
            workers[q] = paedagog;
            console.log(paedagog.getName() + " added");
            field.getElementsByClassName('navn')[0].innerText = paedagog.getInitials();
            field.getElementsByClassName('initialer')[0].innerText = paedagog.getName();
            let classname = "peda" + (q+1);
            field.classList.add(classname);
            return paedagog;
        }
    }
    console.log("No room for " + paedagog.getName() +"! Go home and have a nap :)");

}


//!!!!!!!!!!!!!
//!!!!!!!!!!!!!
//FUNCTION CONTROLL FUNCTIONS
//!!!!!!!!!!!!!
//!!!!!!!!!!!!!
function pickFunction(field) {
    console.log("Current action: " + currentAction);
    if (currentAction == "placerPaedagog") {
        timeFieldPlaceFunction(field);
    }
    else if (currentAction == "luk-rum" || currentAction == "aaben-rum") {
        console.log("Aaben/luk - pre funciotn");
        aabenLukRum(field);
    }
}

//!!!!!!!!!!!!!
//!!!!!!!!!!!!!
//AABEN LUK FUNKTIONER
//!!!!!!!!!!!!!
//!!!!!!!!!!!!!
function aabenLukBtns(button) {
    deselectAllPaedagoger();
    let aabenBtn = document.getElementById('aaben-rum');
    let lukBtn =  document.getElementById('luk-rum');
    aabenBtn.classList.remove('selectionButtonsSelected');
    lukBtn.classList.remove('selectionButtonsSelected');
    console.log("aabenlukunc");
    console.log(button.id);

    switch (button.id) {

        case 'aaben-rum':
            if (currentAction == "aaben-rum") {
                currentAction = "";
            } else {
                currentAction = "aaben-rum";
                aabenBtn.classList.add('selectionButtonsSelected');
            } break;
        case 'luk-rum':
            if (currentAction == "luk-rum") {
                currentAction = "";
            } else {
                currentAction = "luk-rum";
                lukBtn.classList.add('selectionButtonsSelected');
            } break;
    }
}


function aabenLukRum(field) {

    // Pædagog er i feltet -> Do nothing
    if (field.children[0].innerText) {

        // Feltet er tomt -> Åben eller luk feltet
    } else if (currentAction == "aaben-rum") {
        field.classList.remove( 'lukketRum');
    } else {
        field.classList.add('lukketRum');
    }
}


//!!!!!!!!!!!!!
//!!!!!!!!!!!!!
//PAEDAGOG PLACERINGS FUNKTIONER
//!!!!!!!!!!!!!
//!!!!!!!!!!!!!

// vælger en pædagog
function placerPaedagog(element) {
    let number = /\d+/.exec(element.id);
    let newselect = workers[number-1];



    if (selectedPaedagog == newselect) {
        element.classList.remove("paedagogSelected");
        selectedPaedagog = null;
        currentAction = null;
    }
    else if (selectedPaedagog != null) {
        removeSelection(selectedPaedagog);
        selectedPaedagog = workers[number - 1];
        element.classList.add("paedagogSelected");
        currentAction = "placerPaedagog";
    }
    else {
        selectedPaedagog = workers[number - 1];
        element.classList.add("paedagogSelected");
        currentAction = "placerPaedagog";
    }
    //Det udkommenteede er hvis man skal skifte onclicks
    // for (let i = 0; i < timeslots.length; i++) {
    //     console.log("Changing funtion on room");
    //     timeslots[i].onclick = function() {
    //         timeFieldPlaceFunction(timeslots[i]);
    //     }
    // }

}
// placerer pædagogen på et felt
function timeFieldPlaceFunction(element) {
    console.log("timefieldplacefunction");
    if (!element.classList.contains('lukketRum')  && selectedPaedagog != null) {
        //skal nok laves i handlebars
        let fjernKnap = document.createElement("button");
        fjernKnap.innerHTML = "Fjern";

        // denne div-element bruges til at undgå float problemerne
        let divClear = fixFloat(fjernKnap);
        // gemmer klassen som har baggrundfarven for den spedicfikke pædagog til feltet som er valgt

        let number = getIndex(selectedPaedagog) +1;

        //let number = /\d+/.exec(element.id); // denne regex-expression gemmer tallet fra id'et (er id'et fx paedagog7 - gemmer den 7-tallet)

        let className = "paedagogFarve" + (number); // i CSS-filen har pædagogernes felt-farver hver især en klasse (fx paedagogFarve7)

        // de 3 pædagoger-pladser som er i hvert felt
        let paedagog1 = element.children[0];
        let paedagog2 = element.children[1];
        let paedagog3 = element.children[2];


        // hvis pædagogen ikke allerede er tilføjet til denne felt i kalenderen - tjekker den om en af de 3 pædagogpladser i feltet er tomt
        if (!paedagog1.textContent.includes(selectedPaedagog.getInitials()) && !paedagog2.textContent.includes(selectedPaedagog.getInitials()) && !paedagog3.textContent.includes(selectedPaedagog.getInitials())) {

            // hvis første pædagog-plads er tomt og en pædagog er valgt - tilføjes pædagogen til feltet
            if (paedagog1.innerHTML == "" && selectedPaedagog!= null) {
                paedagog1.innerHTML = "&nbsp;&nbsp;" + selectedPaedagog.getInitials() + "&nbsp;&nbsp;&nbsp;&nbsp;"; // initialerne for den valgte pædagog tilføjes til feltet
                paedagog1.appendChild(fjernKnap);
                paedagog1.appendChild(divClear);

                paedagog1.classList.add(className); // tilføjer klassen som har baggrundfarven for den spedicfikke pædagog til feltet som er valgt

            } else if (paedagog2.innerHTML == "" && selectedPaedagog!= null) {
                paedagog2.innerHTML = "&nbsp;&nbsp;" + selectedPaedagog.getInitials() + "&nbsp;&nbsp;&nbsp;&nbsp;";
                paedagog2.appendChild(fjernKnap);
                paedagog2.appendChild(divClear);
                paedagog2.classList.add(className);

            } else if (paedagog3.innerHTML == "" && selectedPaedagog!= null) {
                paedagog3.innerHTML = "&nbsp;&nbsp;" + selectedPaedagog.getInitials() + "&nbsp;&nbsp;&nbsp;&nbsp;";
                paedagog3.appendChild(fjernKnap);
                paedagog3.classList.add(className);
            }
        }

    }
    //Hvis åben/luk ikke er valgt

}
//!!!!!!!!!!!!
//!!!!!!!!!!!!
//SPECIAL RUM
//!!!!!!!!!!!!
//!!!!!!!!!!!!

// placerer pædagogen på et felt - denne funktion virker kun på morgensamling-felterne (køkken & badeværelse)
function paedagogPlaceret_morgensamling(element) {
    let fjernKnap = document.createElement("button");
    fjernKnap.innerHTML = "Fjern";
    let divClear = fixFloat(fjernKnap);
    fjernKnap.onclick = function () {
        fjernPaedagog(this);
    };
    // tilføjer klassen som har baggrundfarven for den spedicfikke pædagog
    let number = /\d+/.exec(paedagogValgt.id);
    let index = number-1;
    let className = "paedagogFarve" + (index+1);

    // i køkken samt badeværelse under morgensamling er der kun plads til én pædagog
    let paedagog1 = element.children[0];

    let classRaekke = element.classList.item(element.classList.length-1);
    let felter_i_classRaekke = document.querySelectorAll("." + classRaekke);
    let init_findes_i_raekken = false;

    for(let i = 0; i < felter_i_classRaekke.length; i++) {
        let p1 = felter_i_classRaekke[i].children[0];

        if(p1.textContent.includes(initialer)) {
            init_findes_i_raekken = true;
            break;
        }
    }

    // hvis pædagogen ikke allerede er tilføjet til denne felt i kalenderen
    if(init_findes_i_raekken === false) {
        if (paedagog1.innerHTML == "" && initialer != "") {
            paedagog1.innerHTML = "&nbsp;&nbsp;" + initialer + "&nbsp;&nbsp;&nbsp;&nbsp;";
            paedagog1.appendChild(fjernKnap);
            paedagog1.appendChild(divClear);
            paedagog1.classList.add(className);
        }
    }
}

// !!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!
//HJAELPEFUNCTIONER!
// !!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!

// fjerner en pædagog fra et felt
// fjerner en pædagog fra et felt
function fjernPaedagog(element) {
    // hvis der allerede er valgt en pædagog - skal den deSelectes
    //fjernparent fra funktionen
    console.log("I fjernPaedagog funtiok");

    let span = element.parentElement;
    span.innerHTML = null;
    for (let i = 1; i <= 10; i++) {
        let classname = "paedagogFarve" + i;
        span.classList.remove(classname);
    }
}



function removeSelection(paeda) {
    //handlebars
    let index =getIndex(paeda);

    let fieldname = "grid-paedagog" + (index+1);
    document.getElementById(fieldname).classList.remove('paedagogSelected');
    let classname = "paedagogFarve" + (index+1);
    document.getElementById(fieldname).classList.add(classname);
    //set initialer til ""
    selectedpaedagog = null;
}

function getIndex(paedagog) {
    let index = workers.findIndex((elem) => {

        return elem === paedagog
    });
    return index;
}

function fixFloat(button) {
    let divClear = document.createElement("div"); //
    divClear.style.clear = "both"; //skal i en css-class
    divClear.style.height = "0 px"; //skal i en css-class
    button.style.float = "right";
    button.onclick = function (e) {
        // Uden den her bliver timeFieldPlaceFunction(timeslots[i]) også kaldt
        e.stopPropagation();
        fjernPaedagog(this);
    };
    return divClear;
}

function deselectAllPaedagoger() {
    for (let i = 0; i < paedagogbuttons.length; i++) {
        console.log("deletion:" + (i+1));

        paedagogbuttons[i].classList.remove("paedagogSelected");
    }
}



//!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!
//ROUTING
//!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!

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
        //paedagoger[i].style.opacity = "0.5";
    }
    blaeksprutteFeltClicked = true;
}

function blaeksprutteValgt(element) {
    if(blaeksprutteFeltClicked == true) {
        let paedagoger = document.querySelectorAll(".paedagoger");
        for(let i = 0; i < paedagoger.length; i++) {
            //paedagoger[i].style.opacity = "1";
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

function gemDagsplan() {
    let rum_idArray = document.querySelectorAll('[id^="grid-lokale"]'); // henter alle id'er der starter med "grid-lokale" dvs. alle rum
    for(let i = 0; i < rum_idArray.length; i++) {
        let rum = rum_idArray[i];
        let paedagog1, paedagog2, paedagog3;
        let paedagogInit1, paedagogInit2, paedagogInit3;
        let paedagogInitArray = [];
        let paedagogClassArray = [];
        let aaben = true;
        let id = "";

        // henter dato i formatet DD-MM-ÅÅÅÅ
        let dato = new Date();
        let datoString =
            ("0" + dato.getUTCDate()).slice(-2) + "-" +
            ("0" + (dato.getUTCMonth()+1)).slice(-2) + "-" +

            dato.getUTCFullYear();

        let index = i + "_" + datoString;

        // henter child-elementet til den specefikke rum-id og som har klassen paedagog1, paedagog2 & paedagog3
        paedagog1 = document.querySelector("#" + rum.id + " > .paedagog1");

        if(document.querySelector("#" + rum.id + " > .paedagog2") != null) {
            paedagog2 = document.querySelector("#" + rum.id + " > .paedagog2");
        }
        if(document.querySelector("#" + rum.id + " > .paedagog3") != null) {
            paedagog3 = document.querySelector("#" + rum.id + " > .paedagog3");
        }

        let regExp = /\(([^)]+)\)/; // finder tekst med parentes omkring - dvs. paedagog-initialer i det her tilfælde

        if(paedagog1.innerHTML != "") { // hvis der er en pædagog i den første placering i rummet
            paedagogInit1 = regExp.exec(paedagog1.innerHTML); // henter pædagog init i en array hvor den første placering er initialerne med parentes
            paedagogInitArray.push(paedagogInit1[0]); // tilføjer pædagog init til init-array
            // tilføjer pædagog-farve- class til class array - klassen er placeret som den sidste klasse
            paedagogClassArray.push(paedagog1.classList.item(paedagog1.classList.length-1));
        }

        // hvis rummet har class "paedagog2" fordi i morgensamling er der kun class "paedagog1" fordi der kun er plads til en pædagog
        if(paedagog2 != undefined){
            if(paedagog2.innerHTML != "") {
                paedagogInit2 = regExp.exec(paedagog2.innerHTML);
                paedagogInitArray.push(paedagogInit2[0]);
                paedagogClassArray.push(paedagog2.classList.item(paedagog2.classList.length-1));
            }
        }

        if(paedagog3 != undefined){
            if(paedagog3.innerHTML != "") {
                paedagogInit3 = regExp.exec(paedagog3.innerHTML);
                paedagogInitArray.push(paedagogInit3[0]);
                paedagogClassArray.push(paedagog3.classList.item(paedagog3.classList.length-1));
            }
        }

        if (rum.classList.contains('lukketRum')) {
            aaben = false;
        }

        if(rum.children.length == 4) {
            id = rum.children[3].innerHTML;
        } else {
            id = rum.children[1].innerHTML;
        }

        console.log(paedagogInitArray); // pædagogernes initialer i rummet
        console.log(paedagogClassArray); // pædagogernes farve- klasse i rummet
        console.log(index); // index gemmes i formatet 'index_dato' fx 1_05-05-2019
        console.log(datoString); // dato i formatet DD-MM-ÅÅÅÅ
        console.log(aaben); // er true hvis rummet er åben ellers er den false
        console.log(id); // id (fra databasen) for hvert rum

        let url = "/blaeksprutte/rum/dagsdato";
        fetch(url)
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {
                if(resultat.length == 0) { // hvis der ikke allerede er lavet en dagsplan for den pågældende dag - postes hele kalenderen til databasen
                    postRum(paedagogInitArray, paedagogClassArray, index, datoString, aaben);

                } else { // hvis der allerede er lavet en dagsplan for den pågældende dag - opdateres hele kalenderen i databasen
                    putRum(id, paedagogInitArray, paedagogClassArray, index, datoString, aaben);
                }
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    }
}

function postRum(paedagogInitArray, paedagogClassArray, index, dato, aaben) {
    let url = "/blaeksprutte/rum";
    let data = { paedagogInitialer: paedagogInitArray, paedagogClassArray: paedagogClassArray, index: index, dato: dato, aaben: aaben };

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

function putRum(id, paedagogInitArray, paedagogClassArray, index, dato, aaben) {
    let url = '/blaeksprutte/rum/dagsdato';
    let data = {id: id, paedagogInitialer: paedagogInitArray, paedagogClassArray: paedagogClassArray, index: index, dato: dato, aaben: aaben };

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

function hentRum_indexVinduet() {
    let url = "/blaeksprutte/rum/dagsdato";
    fetch(url)
        .then(response => {
            if (response.status >= 400)
                throw new Error(response.status);
            else
                return response.json();
        })
        .then(resultat => {
            if(resultat.length != 0) {

                let indexFelter = document.querySelectorAll(".indexFelt");

                if(indexFelter != null) {
                    for(let i = 0; i < indexFelter.length; i++) {

                        if(resultat[i].aaben == "true") {
                            let paedagog1 = indexFelter[i].children[0];
                            let paedagog2 = indexFelter[i].children[2];
                            let paedagog3 = indexFelter[i].children[4];

                            if (resultat[i].paedagogInitialer[0] != undefined) {
                                paedagog1.innerHTML = "&nbsp;&nbsp;" + resultat[i].paedagogInitialer[0] + "&nbsp;&nbsp;&nbsp;&nbsp;";
                                paedagog1.classList.add(resultat[i].paedagogClasses[0]);
                            }

                            if (paedagog2 != null) {
                                if (resultat[i].paedagogInitialer[1] != undefined) {
                                    paedagog2.innerHTML = "&nbsp;&nbsp;" + resultat[i].paedagogInitialer[1] + "&nbsp;&nbsp;&nbsp;&nbsp;";
                                    paedagog2.classList.add(resultat[i].paedagogClasses[1])
                                }
                            }

                            if (paedagog3 != null) {
                                if (resultat[i].paedagogInitialer[2] != undefined) {
                                    paedagog3.innerHTML = "&nbsp;&nbsp;" + resultat[i].paedagogInitialer[2] + "&nbsp;&nbsp;&nbsp;&nbsp;";
                                    paedagog3.classList.add(resultat[i].paedagogClasses[2])
                                }
                            }
                        } else {
                            lukLokale(indexFelter[i]);
                        }
                    }
                }
            }
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
}

function hentRum_blaeksprutteVinduet() {

    let url = "/blaeksprutte/rum/dagsdato";
    fetch(url)
        .then(response => {
            if (response.status >= 400)
                throw new Error(response.status);
            else
                return response.json();
        })
        .then(resultat => {
            if(resultat.length != 0) {

                let blaeksprutteVindueFelter = document.querySelectorAll(".blaeksprutteVindueFelt");

                if(blaeksprutteVindueFelter != null) {
                    for(let i = 0; i < blaeksprutteVindueFelter.length; i++) {
                        if(resultat[i].aaben == "true") {
                            let idSpan = document.createElement("span");
                            idSpan.innerHTML = resultat[i]._id;
                            blaeksprutteVindueFelter[i].appendChild(idSpan);
                            idSpan.classList.add("usynlig");

                            let paedagog1 = blaeksprutteVindueFelter[i].children[0];
                            let paedagog2 = blaeksprutteVindueFelter[i].children[1];
                            let paedagog3 = blaeksprutteVindueFelter[i].children[2];

                            if(resultat[i].paedagogInitialer[0] != undefined) {
                                let fjernKnap = document.createElement("button");
                                fjernKnap.innerHTML = "Fjern";
                                let divClear = document.createElement("div");
                                divClear.style.clear = "both";
                                divClear.style.height = "0 px";
                                fjernKnap.style.float = "right";
                                fjernKnap.onclick = function () {
                                    fjernPaedagog(this.parentElement, this)
                                };

                                paedagog1.innerHTML = "&nbsp;&nbsp;" + resultat[i].paedagogInitialer[0] + "&nbsp;&nbsp;&nbsp;&nbsp;";
                                paedagog1.appendChild(fjernKnap);
                                paedagog1.appendChild(divClear);
                                paedagog1.classList.add(resultat[i].paedagogClasses[0]);
                            }

                            if(paedagog2 != null) {
                                if(resultat[i].paedagogInitialer[1] != undefined) {
                                    let fjernKnap = document.createElement("button");
                                    fjernKnap.innerHTML = "Fjern";
                                    let divClear = document.createElement("div");
                                    divClear.style.clear = "both";
                                    divClear.style.height = "0 px";
                                    fjernKnap.style.float = "right";
                                    fjernKnap.onclick = function () {
                                        fjernPaedagog(this.parentElement, this)
                                    };

                                    paedagog2.innerHTML = "&nbsp;&nbsp;" + resultat[i].paedagogInitialer[1] + "&nbsp;&nbsp;&nbsp;&nbsp;";
                                    paedagog2.appendChild(fjernKnap);
                                    paedagog2.appendChild(divClear);
                                    paedagog2.classList.add(resultat[i].paedagogClasses[1]);
                                }
                            }

                            if(paedagog3 != null) {
                                if(resultat[i].paedagogInitialer[2] != undefined) {
                                    let fjernKnap = document.createElement("button");
                                    fjernKnap.innerHTML = "Fjern";
                                    let divClear = document.createElement("div");
                                    divClear.style.clear = "both";
                                    divClear.style.height = "0 px";
                                    fjernKnap.style.float = "right";
                                    fjernKnap.onclick = function () {
                                        fjernPaedagog(this.parentElement, this)
                                    };

                                    paedagog3.innerHTML = "&nbsp;&nbsp;" + resultat[i].paedagogInitialer[2] + "&nbsp;&nbsp;&nbsp;&nbsp;";
                                    paedagog3.appendChild(fjernKnap);
                                    paedagog3.appendChild(divClear);
                                    paedagog3.classList.add(resultat[i].paedagogClasses[2]);
                                }
                            }

                        } else {
                            lukLokale(blaeksprutteVindueFelter[i]);
                        }
                    }
                }
            }
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
}

function getDato_tid() {
    let dato_tid = document.querySelector("#grid-dags-dato");

    // henter dato samt klokkeslæt i formatet DD-MM-ÅÅÅÅ TT:MM:SS
    let date = new Date();
    let dateString =
        ("0" + date.getUTCDate()).slice(-2) + "-" +
        ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
        date.getUTCFullYear() + " " +
        ("0" + (date.getUTCHours()+2)).slice(-2) + ":" +
        ("0" + date.getUTCMinutes()).slice(-2) + ":" +
        ("0" + date.getUTCSeconds()).slice(-2);

    dato_tid.innerHTML = dateString;

    setTimeout(getDato_tid, 500);
}

//!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!
//DUMMY DATA
//!!!!!!!!!!!!
//!!!!!!!!!!!!!!!

function dummyData() {
    let p;
    p = new Paedagog("Madeleine", "MEKHR");
    addPaedagog(p);
    p = new Paedagog("Douglas", "DHR");
    addPaedagog(p);
    p = new Paedagog("Patrick", "PHR");
    addPaedagog(p);
    p = new Paedagog("Steffen", "SHR");
    console.log(addPaedagog(p));
    p = new Paedagog("Bertil", "BNA");
    addPaedagog(p);
    p = new Paedagog("Thomas", "TR");
    addPaedagog(p);
    p = new Paedagog("Maja", "MJ");
    console.log(addPaedagog(p));
    p = new Paedagog("Camilla", "CFU");
    addPaedagog(p);
    p = new Paedagog("Ann", "ABM");
    addPaedagog(p);
    p = new Paedagog("Nancy", "NS");
    console.log(addPaedagog(p));
    p = new Paedagog("Fry", "PJF");
    addPaedagog(p);
    p = new Paedagog("Leela", "TR");
    addPaedagog(p);
}

dummyData();

// hentPaedagoger();
// blaeksprutteId();
// hentBlaeksprutte();
// getDato_tid();
//
// hentRum_indexVinduet();
// hentRum_blaeksprutteVinduet();