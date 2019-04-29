let initialer = "";
let paedagogValgt = "";
let paedagoger = new Array(10);

// vælger en pædagog
function placerePaedagog(element) {

    // hvis der var valgt en pædagog tidligere
    if(paedagogValgt != "") {
        initialer = "";
        paedagogValgt.style.opacity = "0.5";
    }

    paedagogValgt = element;
    initialer = element.children[2].innerHTML;
    element.style.opacity = "1";
}

// placerer pædagogen på et felt
function paedagogPlaceret(element) {
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

    let paedagog1 = element.children[0];
    let paedagog2 = element.children[1];
    let paedagog3 = element.children[2];

    // hvis pædagogen ikke allerede er tilføjet til denne felt i kalenderen
    if(!paedagog1.textContent.includes(initialer) && !paedagog2.textContent.includes(initialer) && !paedagog3.textContent.includes(initialer)) {
        if (paedagog1.innerHTML == "" && initialer != "") {
            paedagog1.innerHTML = "&nbsp;&nbsp;" + initialer + "&nbsp;&nbsp;&nbsp;&nbsp;";
            paedagog1.appendChild(fjernKnap);
            paedagog1.appendChild(divClear);
            paedagog1.classList.add(className);

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
    // hvis der var valgt en pædagog tidligere
    if(paedagogValgt != "") {
        initialer = "";
        paedagogValgt.style.opacity = "0.5";
    }

    parent.removeChild(element);
    parent.innerHTML = "";

    // fjerner klassen som har baggrundfarven for den spedicfikke pædagog og dermed farven
    let number = /\d+/.exec(parent.id);
    let index = number-1;
    let className = "paedagogFarve" + (index+1);
}

// pædagog klasse
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

// pædagog-objekter
function opretPaedagoger(){
    let p;
    p = new Paedagog("Hans Jensen", "(HJ)");
    addPaedagog(p);
    p = new Paedagog("Karl Rasmussen", "(KR)");
    addPaedagog(p);
    p = new Paedagog("Tom Larsen", "(TL)");
    addPaedagog(p);
    p = new Paedagog("Rasmus Poulsen", "(RP)");
    addPaedagog(p);
    p = new Paedagog("Lars Larsen", "(LL)");
    addPaedagog(p);
    p = new Paedagog("Michael Rasmussen", "(MR)");
    addPaedagog(p);
    p = new Paedagog("Peter Holm", "(PH)");
    addPaedagog(p);
    p = new Paedagog("Christian Kjeldsen", "(CK)");
    addPaedagog(p);
    p = new Paedagog("Søren Madsen", "(SM)");
    addPaedagog(p);
    p = new Paedagog("Erik Kjærlund", "(EK)");
    addPaedagog(p);
}

function addPaedagog(paedagog) {
    for(let i = 0; i < paedagoger.length; i++){
        let felt = document.querySelector("#grid-paedagog" +(i+1));
        felt.getElementsByClassName('navn')[0].innerHTML = paedagog.getInitials();
        felt.getElementsByClassName('initialer')[0].innerHTML = paedagog.getName();
    }
}