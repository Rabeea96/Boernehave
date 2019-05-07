let currentAction = "";
let initialer = ""; // bruges til at indsætte den valgte pædagogs initialer i flere felter
let paedagogValgt = ""; // bruges til pædagog-feltet for den pædagog som er valgt (dvs. HTML elementet for pædagogen)
let åbenLuk = false; // Får en værdi alt efter om åben rum eller luk rum knap er valgt
let id_blaeksprutte;
let initialer_blaeksprutte = "";
let blaeksprutteFeltClicked = false;


function pickFunction(field) {
    if (currentAction == "placerPaedagog") {
        placerPaedagog(field);
    }
    else if (currentAction == "luk-rum" || currentAction == "aaben-rum") {
        aabenLukRum(field);
    }
}


function aabenLukBtns(button) {
    let aabenBtn = document.getElementById('aaben-rum');
    let lukBtn =  document.getElementById('luk-rum');
    aabenBtn.classList.remove('btnSelected');
    lukBtn.classList.remove('btnSelected');

    switch (button.id) {
        case 'aaben-rum':
            if (currentAction == "aaben-rum") {
                currentAction = "";
            } else {
                currentAction = "aaben-rum";
                aabenBtn.classList.add('btnSelected');
            } break;
        case 'luk-rum':
            if (currentAction == "luk-rum") {
                currentAction = "";
            } else {
                currentAction = "luk-rum";
                lukBtn.classList.add('btnSelected');
            } break;
    }
}


function aabenLukRum(field) {

    // Pædagog er i feltet -> Do nothing
    if (field.children[0].innerText) {

        // Feltet er tomt -> Åben eller luk feltet
    } else if (currentAction == "aaben-rum") {
        field.classList.remove( 'roomClosed');
    } else {
        field.classList.add('roomClosed');
    }
}




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

            let classRaekke = element.classList.item(element.classList.length-1);
            let felter_i_classRaekke = document.querySelectorAll("." + classRaekke);
            let init_findes_i_raekken = false;

            for(let i = 0; i < felter_i_classRaekke.length; i++) {
                let p1 = felter_i_classRaekke[i].children[0];
                let p2 = felter_i_classRaekke[i].children[1];
                let p3 = felter_i_classRaekke[i].children[2];

                if(p1.textContent.includes(initialer) || p2.textContent.includes(initialer) || p3.textContent.includes(initialer)) {
                    init_findes_i_raekken = true;
                    break;
                }
            }

            // hvis pædagogen ikke allerede er tilføjet til denne felt i kalenderen - tjekker den om en af de 3 pædagogpladser i feltet er tomt
            if (init_findes_i_raekken === false) {

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

hentPaedagoger();
blaeksprutteId();
hentBlaeksprutte();
getDato_tid();

hentRum_indexVinduet();
hentRum_blaeksprutteVinduet();