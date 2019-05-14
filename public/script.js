const SCRIPT = {

    initialer : "", // bruges til at gemme den valgte pædagogs initialer så det kan indsættes i flere felter
    paedagogValgt : "", // bruges til pædagog-feltet for den pædagog som er valgt (dvs. HTML elementet for pædagogen)
    aabenRum : false, // ændres til true når der klikkes på åben rum knappen
    lukRum : false, // ændres til true når der klikkes på luk rum knappen
    id_blaeksprutte : "", // bruges til at gemme id for den blæksprutte der findes i databasen - for opdatering af blæksprutte
    pinkode_blaeksprutte : "", // når blæksprutten ændres får den pinkoden for den specifikke pædagog der er valgt som blæksprutte
    initialer_blaeksprutte : "", // bruges til at søge efter pinkoden for den specifikke pædagog ud fra initialerne - så får blæksprutten denne pinkode
    blaeksprutteFeltClicked : false, // når man klikker på blæksprutte feltet for at ændre blæksprutte ændres den til true
    aendreDagsplanClicked : false, // når man klikker på ændre-dagsplan feltet for at ændre dagsplanen ændres den til true

    // sætter onclick på knapperne samt div-elementer der fungerer som knapper
    set_onclicks : function() {
        let blaeksprutteFelt = document.querySelector("#blaeksprutte-felt");
        let aendreDagsplan = document.querySelector("#aendre-dagsplan");
        let gemmeDagsplan = document.querySelector("#gem-dagsplan");
        let tilbageDagsplan = document.querySelector("#tilbage-dagsplan");
        let aabenRum = document.querySelector("#aaben-rum");
        let lukRum = document.querySelector("#luk-rum");
        let rum_idArray = document.querySelectorAll('[id^="grid-lokale"]'); // henter alle id'er der starter med "grid-lokale" dvs. alle rum

        if (blaeksprutteFelt != null) {
            blaeksprutteFelt.onclick = function () {
                SCRIPT.blaeksprutteFieldSelected();
            }
        }
        if (aendreDagsplan != null) {
            aendreDagsplan.onclick = function () {
                SCRIPT.aendreDagsplanSelected(this);
            }
        }
        if (gemmeDagsplan != null) {
            gemmeDagsplan.onclick = function () {
                SCRIPT.gemDagsplan();
            }
        }
        if (tilbageDagsplan != null) {
            tilbageDagsplan.onclick = function () {
                SCRIPT.navigateToFrontpage();
            }
        }
        if (aabenRum != null) {
            aabenRum.onclick = function () {
                SCRIPT.aabenKnapSelected(this);
            }
        }
        if (lukRum != null) {
            lukRum.onclick = function () {
                SCRIPT.lukKnapSelected(this);
            }
        }

        // pædagogfelterne i index-vinduet
        for (let i = 0; i < 10; i++) {
            // vælger alle pædagogfelterne i index-vinduet
            let gridPaedagog = document.querySelector("#indexVindue_body #grid-paedagog" + (i + 1));

            if (gridPaedagog != null) {
                gridPaedagog.onclick = function () {
                    SCRIPT.showNumpad(this);
                }
            }
        }

        // pædagogfelterne i blæksprutte-vinduet
        for (let i = 0; i < 10; i++) {
            // vælger alle pædagogfelterne i blæksprutte-vinduet
            let gridPaedagog = document.querySelector("#blaeksprutteVindue_body #grid-paedagog" + (i + 1));

            if (gridPaedagog != null) {
                gridPaedagog.onclick = function () {
                    SCRIPT.paedagogSelected(this);
                }
            }
        }

        // rum/felter i kalenderen hvor en pædagog kan tilføjes i blæksprutte vinduet
        for (let i = 0; i < rum_idArray.length; i++) {
            if (rum_idArray[i] != null) {
                rum_idArray[i].onclick = function () {
                    SCRIPT.rumSelected(this);
                }
            }
        }
    },

    // når en pædagog vælges
    paedagogSelected : function(element) {

        // Hvis en åben/luk knapperne er valgt bliver de deselected
        if (SCRIPT.aabenRum === true || SCRIPT.lukRum === true) {
            SCRIPT.deselectAabenLukKnapperne();
        }

        // hvis der allerede er valgt en pædagog - skal den deSelectes
        SCRIPT.deselectPaedagog();

        // en ny pædagog bliver valgt
        SCRIPT.paedagogValgt = element;
        SCRIPT.initialer = element.children[2].innerHTML;
        element.classList.remove('paedagogDeselected');
    },

    // placerer pædagogen på et felt når et felt vælges og en pædagog var valgt i forvejen
    // bliver også brugt til at åbne/lukke et lokale hvis en af åben/luk knapperne er valgt
    rumSelected : function(element) {
        // Hvis åben/luk ikke er valgt
        if (SCRIPT.aabenRum === false && SCRIPT.lukRum === false) {

            // hvis rummet ikke er lukket kan man tilføje pædagoger til den
            if (!element.classList.contains('lukketRum')) {

                // gemmer klassen som har baggrundfarven for den spedicfikke pædagog til feltet som er valgt
                let number = /\d+/.exec(SCRIPT.paedagogValgt.id); // denne regex-expression gemmer tallet fra id'et (er id'et fx paedagog7 - gemmer den 7-tallet)
                let index = number - 1;
                let className = "paedagogFarve" + (index + 1); // i CSS-filen har pædagogernes felt-farver hver især en klasse (fx paedagogFarve7)

                // de 3 pædagoger-pladser som er i hvert felt
                let paedagog1 = element.children[0];
                let paedagog2 = element.children[1];
                let paedagog3 = element.children[2];

                let classRaekke = element.classList.item(element.classList.length - 1);
                let felter_i_classRaekke = document.querySelectorAll("." + classRaekke);
                let init_findes_i_raekken = false;

                for (let i = 0; i < felter_i_classRaekke.length; i++) {
                    if (classRaekke != "raekke2") {
                        let p1 = felter_i_classRaekke[i].children[0];
                        let p2 = felter_i_classRaekke[i].children[1];
                        let p3 = felter_i_classRaekke[i].children[2];

                        if (p1.textContent.includes(SCRIPT.initialer) || p2.textContent.includes(SCRIPT.initialer) || p3.textContent.includes(SCRIPT.initialer)) {
                            init_findes_i_raekken = true;
                            break;
                        }
                    } else {
                        if (i != felter_i_classRaekke.length - 1) {
                            let p1 = felter_i_classRaekke[i].children[0];
                            if (p1.textContent.includes(SCRIPT.initialer)) {
                                init_findes_i_raekken = true;
                                break;
                            }
                        } else {
                            let p1 = felter_i_classRaekke[i].children[0];
                            let p2 = felter_i_classRaekke[i].children[1];
                            let p3 = felter_i_classRaekke[i].children[2];

                            if (p1.textContent.includes(SCRIPT.initialer) || p2.textContent.includes(SCRIPT.initialer) || p3.textContent.includes(SCRIPT.initialer)) {
                                init_findes_i_raekken = true;
                                break;
                            }
                        }
                    }
                }

                // hvis pædagogen ikke allerede er tilføjet til denne række i kalenderen - tjekker den om en af de 3 pædagogpladser i feltet er tomt
                if (init_findes_i_raekken === false) {

                    // hvis første pædagog-plads er tomt og en pædagog er valgt - tilføjes pædagogen til feltet
                    if (paedagog1.innerHTML == "" && SCRIPT.initialer != "") {
                        paedagog1.innerHTML = "&nbsp;&nbsp;" + SCRIPT.initialer + "&nbsp;&nbsp;&nbsp;&nbsp;"; // initialerne for den valgte pædagog tilføjes til feltet
                        paedagog1.appendChild(SCRIPT.addRemoveButtonAndDivClear().fjernKnap);
                        paedagog1.appendChild(SCRIPT.addRemoveButtonAndDivClear().divClear);
                        paedagog1.classList.add(className); // tilføjer klassen som har baggrundfarven for den spedicfikke pædagog til feltet som er valgt

                    } else if (paedagog2 != null) {
                        if (paedagog2.innerHTML == "" && SCRIPT.initialer != "") {
                            paedagog2.innerHTML = "&nbsp;&nbsp;" + SCRIPT.initialer + "&nbsp;&nbsp;&nbsp;&nbsp;";
                            paedagog2.appendChild(SCRIPT.addRemoveButtonAndDivClear().fjernKnap);
                            paedagog2.appendChild(SCRIPT.addRemoveButtonAndDivClear().divClear);
                            paedagog2.classList.add(className);
                        }

                    } else if (paedagog3 != null) {
                        if (paedagog3.innerHTML == "" && SCRIPT.initialer != "") {
                            paedagog3.innerHTML = "&nbsp;&nbsp;" + SCRIPT.initialer + "&nbsp;&nbsp;&nbsp;&nbsp;";
                            paedagog3.appendChild(SCRIPT.addRemoveButtonAndDivClear().fjernKnap);
                            paedagog3.classList.add(className);
                        }
                    }
                }
            }
        } else if (SCRIPT.aabenRum == true) {
            SCRIPT.aabenLokale(element);
        } else {
            SCRIPT.lukLokale(element);
        }
    },

    deselectPaedagog : function() {
        // hvis der allerede er valgt en pædagog - skal den deSelectes
        if (SCRIPT.paedagogValgt != "") {
            SCRIPT.initialer = "";
            SCRIPT.paedagogValgt.classList.add('paedagogDeselected');
            SCRIPT.paedagogValgt = "";
        }
    },

    deselectAabenLukKnapperne : function() {
        if (SCRIPT.aabenRum == true || SCRIPT.lukRum == true) {
            let gridKnapper = document.querySelector("#grid-knapper");
            let aabenRumKnap = gridKnapper.children[2];
            let lukRumKnap = gridKnapper.children[3];

            aabenRumKnap.classList.remove('selectionButtonsSelected');
            lukRumKnap.classList.remove('selectionButtonsSelected');

            SCRIPT.aabenRum = false;
            SCRIPT.lukRum = false;
        }
    },

    aabenKnapSelected : function(element) {
        // hvis man klikker på knappen og den allerede er valgt bliver den deselected
        if (SCRIPT.aabenRum == true) {
            SCRIPT.deselectAabenLukKnapperne();
        } else {
            // hvis der allerede er valgt en pædagog - skal den deSelectes
            SCRIPT.deselectPaedagog();

            // hvis der allerede er valgt en aaben eller luk knap - skal den deSelectes
            SCRIPT.deselectAabenLukKnapperne();

            // knappen bliver valgt
            element.classList.add('selectionButtonsSelected');
            SCRIPT.aabenRum = true;
        }
    },

    lukKnapSelected : function(element) {
        // hvis man klikker på knappen og den allerede er valgt bliver den deselected
        if (SCRIPT.lukRum == true) {
            SCRIPT.deselectAabenLukKnapperne();
        } else {
            // hvis der allerede er valgt en pædagog - skal den deSelectes
            SCRIPT.deselectPaedagog();

            // hvis der allerede er valgt en aaben eller luk knap - skal den deSelectes
            SCRIPT.deselectAabenLukKnapperne();

            // knappen bliver valgt
            element.classList.add('selectionButtonsSelected');
            SCRIPT.lukRum = true;
        }
    },

    lukLokale : function(element) {
        // Hvis der ikke er en pædagog i feltet lukkes lokalet
        if (element.children[0].innerHTML == "" && element.children[1].innerHTML == "" && element.children[2].innerHTML == "") {
            if (!element.classList.contains("lukketRum")) {
                element.classList.add('lukketRum');
            }
        }
    },

    aabenLokale : function(element) {
        // Hvis lokalet allerede er lukket bliver den åbnet
        if (element.classList.contains("lukketRum")) {
            element.classList.remove('lukketRum');
        }
    },

    addRemoveButtonAndDivClear : function() {
        // fjern-knap
        let fjernKnap = document.createElement("button");
        fjernKnap.innerHTML = "Fjern";

        // denne div-element bruges til at undgå float problemerne
        let divClear = document.createElement("div");
        divClear.classList.add('divClearFloat');
        fjernKnap.classList.add('fjernKnapFloat');
        fjernKnap.onclick = function () {
            SCRIPT.removePaedagog(this.parentElement, this)
        };

        // div og fjernknappen returneres i et objekt
        let object = {fjernKnap: fjernKnap, divClear: divClear};
        return object;
    },

    // fjerner en pædagog fra et felt
    removePaedagog : function(parent, element) {
        // hvis der allerede er valgt en pædagog - skal den deSelectes
        SCRIPT.deselectPaedagog();

        // parent er i det her tilfælde en af de 3 pædagog-pladser i feltet og element er fjern-knappen
        parent.removeChild(element);
        parent.innerHTML = "";

        // fjerner klassen som har baggrundfarven for den specifikke pædagog og dermed også farven fra feltet
        // klassen er som regel den sidste klasse og derfor er det den sidste klasse der fjernes
        parent.classList.remove(parent.classList.item(parent.classList.length - 1));
    },

    // pædagogerne hentes fra databasen
    getPaedagoger : function() {

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
                for (let i = 0; i < resultat.length; i++) {
                    let element = document.querySelector("#grid-paedagog" + (i + 1));
                    if (element != null) {
                        element.children[0].innerHTML = resultat[i].navn;
                        element.children[2].innerHTML = resultat[i].initialer;
                    }
                }
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    },

    navigateToFrontpage : function() {
        window.location = "/";
    },

    blaeksprutteFieldSelected : function() {
        let paedagoger = document.querySelectorAll(".paedagoger");
        for (let i = 0; i < paedagoger.length; i++) {
            paedagoger[i].classList.add('paedagogDeselected');
        }
        SCRIPT.blaeksprutteFeltClicked = true;
    },

    blaeksprutteChanged : function(element) {
        if (SCRIPT.blaeksprutteFeltClicked == true) {
            let paedagoger = document.querySelectorAll(".paedagoger");
            for (let i = 0; i < paedagoger.length; i++) {
                paedagoger[i].classList.remove('paedagogDeselected');
            }
            let navn_blaeksprutte = element.children[0].innerHTML;
            SCRIPT.initialer_blaeksprutte = element.children[2].innerHTML;

            // pinkode for den valgte pædagog sættes på som blæksprutte-pinkode
            let url = "/paedagog/paedagoger";
            fetch(url)
                .then(response => {
                    if (response.status >= 400)
                        throw new Error(response.status);
                    else
                        return response.json();
                })
                .then(resultat => {
                    if (resultat.length != 0) {
                        SCRIPT.initialer_blaeksprutte = element.children[2].innerHTML;
                        for (let i = 0; i < resultat.length; i++) {
                            if (SCRIPT.initialer_blaeksprutte == resultat[i].initialer) {
                                SCRIPT.pinkode_blaeksprutte = resultat[i].pinkode;

                                let blaeksprutte = document.querySelector("#blaeksprutte-felt");
                                blaeksprutte.innerHTML = SCRIPT.initialer_blaeksprutte;

                                let blaeksprutteBoks = document.querySelector("#blaeksprutte-boks");
                                if (blaeksprutteBoks != null && blaeksprutteBoks.children[1] != undefined) {
                                    SCRIPT.id_blaeksprutte = blaeksprutteBoks.children[1].innerHTML;
                                }

                                // hvis der ingen blæksprutte er i databasen - så oprettes en blæksprutte i databasen
                                if (SCRIPT.id_blaeksprutte == "" || SCRIPT.id_blaeksprutte == undefined) {
                                    SCRIPT.postBlaeksprutte(navn_blaeksprutte, SCRIPT.initialer_blaeksprutte, SCRIPT.pinkode_blaeksprutte);

                                    // ellers så opdateres blæksprutten i databasen
                                } else {
                                    SCRIPT.putBlaeksprutte(SCRIPT.id_blaeksprutte, navn_blaeksprutte, SCRIPT.initialer_blaeksprutte, SCRIPT.pinkode_blaeksprutte);
                                }

                                SCRIPT.blaeksprutteFeltClicked = false;

                                SCRIPT.initialer_blaeksprutte = "";

                                break;
                            }
                        }
                    }
                })
                .catch(fejl => console.log('Fejl: ' + fejl));
        }
    },

    showNumpad : function(element) {
        // hvis man vil ændre blæksprutte
        if (SCRIPT.blaeksprutteFeltClicked == true) {

            // vis numpad-funktion - der sendes to værdier med: id for pædagogfeltet & handling
            window.location.href = "/paedagog/numpad" + "#" + element.id + "#vaelg-blaeksprutte";

            // hvis man vil ændre dagsplanen
        } else if (SCRIPT.aendreDagsplanClicked == true) {

            let blaeksprutteInit = document.querySelector("#blaeksprutte-felt").innerHTML;
            let paedagoger = document.querySelectorAll(".paedagoger");
            let paedagogId = ""; // skal indeholde id for pædagog-boksen for den pædagog der er blæksprutte
            for (let i = 0; i < paedagoger.length; i++) {
                if (paedagoger[i].textContent.includes(blaeksprutteInit)) {
                    paedagogId = paedagoger[i].id;
                    break;
                }
            }

            // vis numpad-funktion - der sendes to værdier med: elementet & handling - elementet bliver ignoreret
            window.location.href = "/paedagog/numpad" + "#" + paedagogId + "#aendre-dagsplan";

            // hvis man vil tjekke ud som pædagog
        } else if (element.lastElementChild.classList.contains("check-in")) {
            // vis numpad-funktion - der sendes to værdier med: id for pædagogfeltet & handling
            window.location.href = "/paedagog/numpad" + "#" + element.id + "#tjek-ud";

            // hvis man vil tjekke ind som pædagog
        } else {
            // vis numpad-funktion - der sendes to værdier med: id for pædagogfeltet & handling
            window.location.href = "/paedagog/numpad" + "#" + element.id + "#tjek-ind";
        }
    },

    tjekInd : function(paedagogInitialer, dato) {
        let url = "/checkin";
        let data = {paedagogInitialer: paedagogInitialer, dato: dato, tjekketInd: "true"};

        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {
                let url = "/checkin/dagsdato";
                return fetch(url); // fetch nummer 2
            })
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {
                console.log(resultat);
                if(resultat.length < 1) {
                    for(let i = 0; i < 10; i++) {
                        let gridPaedagog = document.querySelector("#grid-paedagog" + (i + 1));
                        if(gridPaedagog.children[2].innerHTML == paedagogInitialer) {
                            SCRIPT.blaeksprutteFeltClicked = true;
                            SCRIPT.blaeksprutteChanged(gridPaedagog);
                            break;
                        }
                    }
                }
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    },

    tjekUd : function(id, paedagogInitialer, dato) {
        let url = "/checkin/dagsdato";
        let data = {id: id, paedagogInitialer: paedagogInitialer, dato: dato, tjekketInd: "false"};

        fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {
                console.log(`Resultat: %o`, resultat);
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    },

    blaeksprutteId : function() {
        let url = "/blaeksprutte/valgt-blaeksprutte";

        fetch(url)
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {
                if (resultat.length != 0) {
                    let blaeksprutteBoks = document.querySelector("#blaeksprutte-boks");
                    if (blaeksprutteBoks != null) {
                        let idSpan = document.createElement("span");
                        idSpan.innerHTML = resultat[0]._id;
                        blaeksprutteBoks.appendChild(idSpan);
                        idSpan.classList.add("usynlig");
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
                if (resultat.length != 0) {
                    if (blaeksprutte != null) {
                        blaeksprutte.innerHTML = resultat[0].initialer;
                    }
                }
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    },

    postBlaeksprutte : function(navn, initialer, pinkode) {

        let url = "/blaeksprutte";
        let data = {navn: navn, initialer: initialer, pinkode: pinkode};

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
    },

    putBlaeksprutte : function(id, navn, initialer, pinkode) {
        let url = '/blaeksprutte/valgt-blaeksprutte';
        let data = {id: id, navn: navn, initialer: initialer, pinkode: pinkode};

        fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => console.log(`Resultat: %o`, resultat))
            .catch(fejl => console.log('Fejl: ' + fejl));
    },

    aendreDagsplanSelected : function(element) {
        SCRIPT.aendreDagsplanClicked = true;

        SCRIPT.showNumpad(element);
    },

    gemDagsplan : function() {
        let url = "/blaeksprutte/rum/dagsdato";
        fetch(url)
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {
                let rum_idArray = document.querySelectorAll('[id^="grid-lokale"]'); // henter alle id'er der starter med "grid-lokale" dvs. alle rum
                for (let i = 0; i < rum_idArray.length; i++) {
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
                        ("0" + (dato.getUTCMonth() + 1)).slice(-2) + "-" +
                        dato.getUTCFullYear();

                    let index = i + "_" + datoString;

                    // henter child-elementet til den specefikke rum-id og som har klassen paedagog1, paedagog2 & paedagog3
                    paedagog1 = document.querySelector("#" + rum.id + " > .paedagog1");

                    if (document.querySelector("#" + rum.id + " > .paedagog2") != null) {
                        paedagog2 = document.querySelector("#" + rum.id + " > .paedagog2");
                    }
                    if (document.querySelector("#" + rum.id + " > .paedagog3") != null) {
                        paedagog3 = document.querySelector("#" + rum.id + " > .paedagog3");
                    }

                    let regExp = /\(([^)]+)\)/; // finder tekst med parentes omkring - dvs. paedagog-initialer i det her tilfælde

                    if (paedagog1.innerHTML != "") { // hvis der er en pædagog i den første placering i rummet
                        paedagogInit1 = regExp.exec(paedagog1.innerHTML); // henter pædagog init i en array hvor den første placering er initialerne med parentes
                        paedagogInitArray.push(paedagogInit1[0]); // tilføjer pædagog init til init-array
                        // tilføjer pædagog-farve- class til class array - klassen er placeret som den sidste klasse
                        paedagogClassArray.push(paedagog1.classList.item(paedagog1.classList.length - 1));
                    }

                    // hvis rummet har class "paedagog2" fordi i morgensamling er der kun class "paedagog1" fordi der kun er plads til en pædagog
                    if (paedagog2 != undefined) {
                        if (paedagog2.innerHTML != "") {
                            paedagogInit2 = regExp.exec(paedagog2.innerHTML);
                            paedagogInitArray.push(paedagogInit2[0]);
                            paedagogClassArray.push(paedagog2.classList.item(paedagog2.classList.length - 1));
                        }
                    }

                    if (paedagog3 != undefined) {
                        if (paedagog3.innerHTML != "") {
                            paedagogInit3 = regExp.exec(paedagog3.innerHTML);
                            paedagogInitArray.push(paedagogInit3[0]);
                            paedagogClassArray.push(paedagog3.classList.item(paedagog3.classList.length - 1));
                        }
                    }

                    if (rum.classList.contains('lukketRum')) {
                        aaben = false;
                    }

                    // bliver brugt hvis der i forvejen var lavet en dagsplan den pågældende dag - så vil hvert felt have en ekstra span-child som er usynlig og med et id
                    if (rum.children.length == 4) {
                        id = rum.children[3].innerHTML;
                    } else if (rum.children.length == 2) {
                        id = rum.children[1].innerHTML;
                    }

                    console.log(paedagogInitArray); // pædagogernes initialer i rummet
                    console.log(paedagogClassArray); // pædagogernes farve- klasse i rummet
                    console.log(index); // index gemmes i formatet 'index_dato' fx 1_05-05-2019
                    console.log(datoString); // dato i formatet DD-MM-ÅÅÅÅ
                    console.log(aaben); // er true hvis rummet er åben ellers er den false
                    console.log(id); // id (fra databasen) for hvert rum

                    if (resultat.length == 0) { // hvis der ikke allerede er lavet en dagsplan for den pågældende dag - postes hele kalenderen til databasen
                        SCRIPT.postRum(paedagogInitArray, paedagogClassArray, index, datoString, aaben);

                    } else { // hvis der allerede er lavet en dagsplan for den pågældende dag - opdateres hele kalenderen i databasen
                        SCRIPT.putRum(id, paedagogInitArray, paedagogClassArray, index, datoString, aaben);
                    }
                    SCRIPT.aendreDagsplanClicked = false;
                    let dagsplanGemt = document.querySelector("#dagsplanGemt");
                    SCRIPT.showThenFadeOut(dagsplanGemt);
                    setTimeout(function () {
                        SCRIPT.navigateToFrontpage();
                    }, 2000);
                }
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    },

    postRum : function(paedagogInitArray, paedagogClassArray, index, dato, aaben) {
        let url = "/blaeksprutte/rum";
        let data = {
            paedagogInitialer: paedagogInitArray,
            paedagogClassArray: paedagogClassArray,
            index: index,
            dato: dato,
            aaben: aaben
        };

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
            .then(resultat => {
                console.log(`Resultat: %o`, resultat)
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    },

    putRum : function(id, paedagogInitArray, paedagogClassArray, index, dato, aaben) {
        let url = '/blaeksprutte/rum/dagsdato';
        let data = {
            id: id,
            paedagogInitialer: paedagogInitArray,
            paedagogClassArray: paedagogClassArray,
            index: index,
            dato: dato,
            aaben: aaben
        };

        fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => console.log(`Resultat: %o`, resultat))
            .catch(fejl => console.log('Fejl: ' + fejl));
    },

    getRum_indexVinduet : function() {
        let url = "/blaeksprutte/rum/dagsdato";
        fetch(url)
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {
                if (resultat.length != 0) {

                    let indexFelter = document.querySelectorAll(".indexFelt");

                    if (indexFelter != null) {
                        for (let i = 0; i < indexFelter.length; i++) {
                            if (resultat[i] != undefined) {
                                if (resultat[i].aaben == "true") {
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
                                    SCRIPT.lukLokale(indexFelter[i]);
                                }
                            }
                        }
                    }
                }
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    },

    getRum_blaeksprutteVinduet : function() {

        let url = "/blaeksprutte/rum/dagsdato";
        fetch(url)
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {
                if (resultat.length != 0) {

                    let blaeksprutteVindueFelter = document.querySelectorAll(".blaeksprutteVindueFelt");

                    if (blaeksprutteVindueFelter != null) {
                        for (let i = 0; i < blaeksprutteVindueFelter.length; i++) {
                            if (resultat[i] != undefined) {

                                let idSpan = document.createElement("span");
                                idSpan.innerHTML = resultat[i]._id;
                                blaeksprutteVindueFelter[i].appendChild(idSpan);
                                idSpan.classList.add("usynlig");

                                if (resultat[i].aaben == "true") {
                                    let paedagog1 = blaeksprutteVindueFelter[i].children[0];
                                    let paedagog2 = blaeksprutteVindueFelter[i].children[1];
                                    let paedagog3 = blaeksprutteVindueFelter[i].children[2];

                                    if (resultat[i].paedagogInitialer[0] != undefined) {
                                        paedagog1.innerHTML = "&nbsp;&nbsp;" + resultat[i].paedagogInitialer[0] + "&nbsp;&nbsp;&nbsp;&nbsp;";
                                        paedagog1.appendChild(SCRIPT.addRemoveButtonAndDivClear().fjernKnap);
                                        paedagog1.appendChild(SCRIPT.addRemoveButtonAndDivClear().divClear);
                                        paedagog1.classList.add(resultat[i].paedagogClasses[0]);
                                    }

                                    if (paedagog2 != null) {
                                        if (resultat[i].paedagogInitialer[1] != undefined) {
                                            paedagog2.innerHTML = "&nbsp;&nbsp;" + resultat[i].paedagogInitialer[1] + "&nbsp;&nbsp;&nbsp;&nbsp;";
                                            paedagog2.appendChild(SCRIPT.addRemoveButtonAndDivClear().fjernKnap);
                                            paedagog2.appendChild(SCRIPT.addRemoveButtonAndDivClear().divClear);
                                            paedagog2.classList.add(resultat[i].paedagogClasses[1]);
                                        }
                                    }

                                    if (paedagog3 != null) {
                                        if (resultat[i].paedagogInitialer[2] != undefined) {
                                            paedagog3.innerHTML = "&nbsp;&nbsp;" + resultat[i].paedagogInitialer[2] + "&nbsp;&nbsp;&nbsp;&nbsp;";
                                            paedagog3.appendChild(SCRIPT.addRemoveButtonAndDivClear().fjernKnap);
                                            paedagog3.appendChild(SCRIPT.addRemoveButtonAndDivClear().divClear);
                                            paedagog3.classList.add(resultat[i].paedagogClasses[2]);
                                        }
                                    }

                                } else {
                                    SCRIPT.lukLokale(blaeksprutteVindueFelter[i]);
                                }
                            }
                        }
                    }
                }
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    },

    getFokuspunkter : function() {
        let fokuspunkter = document.querySelector("#grid-fokuspunkter");
        if (fokuspunkter != null) {
            let url = "/admin/fokuspunkter";
            fetch(url)
                .then(response => {
                    if (response.status >= 400)
                        throw new Error(response.status);
                    else
                        return response.json();
                })
                .then(resultat => {
                    if (resultat.length != 0) {
                        for (let i = 0; i < resultat.length; i++) {
                            fokuspunkter.children[i + 1].innerHTML = resultat[i].fokuspunkt;
                        }
                    }
                })
                .catch(fejl => console.log('Fejl: ' + fejl));
        }
    },

    getDato_tid : function() {
        let dato_tid = document.querySelector("#grid-dags-dato");

        // henter dato samt klokkeslæt i formatet DD-MM-ÅÅÅÅ TT:MM:SS
        let date = new Date();
        let dateString =
            ("0" + date.getUTCDate()).slice(-2) + "-" +
            ("0" + (date.getUTCMonth() + 1)).slice(-2) + "-" +
            date.getUTCFullYear() + " " +
            ("0" + (date.getUTCHours() + 2)).slice(-2) + ":" +
            ("0" + date.getUTCMinutes()).slice(-2);

        if (dato_tid != null) {
            dato_tid.innerHTML = dateString;
        }

        setTimeout(SCRIPT.getDato_tid, 500);
    },

    getDato : function(){
        // henter dato i formatet DD-MM-ÅÅÅÅ
        let dato = new Date();
        let datoString =
            ("0" + dato.getUTCDate()).slice(-2) + "-" +
            ("0" + (dato.getUTCMonth() + 1)).slice(-2) + "-" +
            dato.getUTCFullYear();

        return { datoString: datoString };
    },

    // viser en div i 1 sekund derefter fader den ud
    showThenFadeOut : function(element) {
        element.classList.remove("usynlig");
        element.classList.add("opacity");

        setTimeout(function () {
            let op = 1;  // initial opacity
            let timer = setInterval(function () {
                if (op <= 0.1) {
                    clearInterval(timer);
                    element.classList.add("usynlig");
                }
                // disse to nedenstående linjer kan ikke laves i CSS
                element.style.opacity = op;
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op -= op * 0.1;
            }, 50);
        }, 1000);
    },

    // tjekker om pædagogerne har tjekket ind
    getCheckin : function() {
        let url = "/checkin/dagsdato";
        fetch(url)
            .then(response => {
                if (response.status >= 400)
                    throw new Error(response.status);
                else
                    return response.json();
            })
            .then(resultat => {
                let paedagoger = document.querySelectorAll(".paedagoger");
                if(paedagoger != null) {
                    if (resultat.length != 0) {
                        for (let i = 0; i < resultat.length; i++) {
                            if (resultat[i].tjekketInd == "true") {
                                for (let j = 0; j < paedagoger.length; j++) {
                                    if (resultat[i].paedagogInitialer == paedagoger[j].children[2].innerHTML) {
                                        let span = document.createElement("span");
                                        span.innerHTML = "Tjekket ind";
                                        paedagoger[j].appendChild(span);
                                        span.classList.add("check-in");
                                    }
                                }
                            }
                        }
                    }
                }
            })
            .catch(fejl => console.log('Fejl: ' + fejl));
    }
}

SCRIPT.set_onclicks();
SCRIPT.getPaedagoger();
SCRIPT.getBlaeksprutte();
SCRIPT.blaeksprutteId();
SCRIPT.getFokuspunkter();
SCRIPT.getDato_tid();
SCRIPT.getRum_indexVinduet();
SCRIPT.getRum_blaeksprutteVinduet();
SCRIPT.getCheckin();