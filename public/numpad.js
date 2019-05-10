let password = [];
let paedagog = "";

function openNumpad(action, person) {
    currentAction = action;
    paedagog = person;
    let gridNumpad = document.getElementById('grid-numpad');
    gridNumpad.classList.remove('hide');
    gridNumpad.classList.add('show');

    let dagsplanElementer = document.getElementsByClassName('dagsplan');
    for (let e of dagsplanElementer) {
        e.classList.add('hide');
        e.classList.remove('show');
    }

    let gridYdre = document.getElementById('grid-ydre');
    gridYdre.style.gridTemplateAreas =
        '"dags-dato dags-dato dags-dato dags-dato dags-dato dags-dato dags-dato dags-dato dags-dato"\n' +
        '"top_left top_left top_left top_left paedagog1 paedagog2 paedagog3 paedagog4 paedagog5"\n' +
        '"top_left top_left top_left top_left paedagog6 paedagog7 paedagog8 paedagog9 paedagog10"\n' +
        '"mellemrum mellemrum mellemrum mellemrum mellemrum mellemrum mellemrum mellemrum mellemrum"\n' +
        '"numpad numpad numpad numpad numpad numpad numpad numpad numpad"\n' +
        '"numpad numpad numpad numpad numpad numpad numpad numpad numpad"\n' +
        '"numpad numpad numpad numpad numpad numpad numpad numpad numpad"\n' +
        '"numpad numpad numpad numpad numpad numpad numpad numpad numpad"\n' +
        '"numpad numpad numpad numpad numpad numpad numpad numpad numpad"\n' +
        '"numpad numpad numpad numpad numpad numpad numpad numpad numpad"\n' +
        '"numpad numpad numpad numpad numpad numpad numpad numpad numpad"\n' +
        '"numpad numpad numpad numpad numpad numpad numpad numpad numpad"';

}

function closeNumpad() {
    let gridNumpad = document.getElementById('grid-numpad');
    gridNumpad.classList.add('hide');
    gridNumpad.classList.remove('show');

    let dagsplanElementer = document.getElementsByClassName('dagsplan');
    for (let e of dagsplanElementer) {
        e.classList.remove('hide');
        e.classList.add('show');
    }

    let gridYdre = document.getElementById('grid-ydre');
    gridYdre.style.gridTemplateAreas =
        '"dags-dato dags-dato dags-dato dags-dato dags-dato dags-dato dags-dato dags-dato dags-dato"\n' +
        '"top_left top_left top_left top_left paedagog1 paedagog2 paedagog3 paedagog4 paedagog5"\n' +
        '"top_left top_left top_left top_left paedagog6 paedagog7 paedagog8 paedagog9 paedagog10"\n' +
        '"mellemrum mellemrum mellemrum mellemrum mellemrum mellemrum mellemrum mellemrum mellemrum"\n' +
        '"dags-plan stue multirum vaerksted legerum krogen legeplads pause vuggestue"\n' +
        '"ni lokale1-tidspunkt1 lokale2-tidspunkt1 lokale3-tidspunkt1 lokale4-tidspunkt1 lokale5-tidspunkt1 lokale6-tidspunkt1 lokale7-tidspunkt1 lokale8-tidspunkt1"\n' +
        '"ti lokale1-tidspunkt2 lokale1-tidspunkt2 lokale1-tidspunkt2 morgensamling lokale7-tidspunkt2 lokale7-tidspunkt2 lokale7-tidspunkt2 lokale8-tidspunkt2"\n' +
        '"elleve lokale1-tidspunkt3 lokale2-tidspunkt3 lokale3-tidspunkt3 lokale4-tidspunkt3 lokale5-tidspunkt3 lokale6-tidspunkt3 lokale7-tidspunkt3 lokale8-tidspunkt3"\n' +
        '"tolv lokale1-tidspunkt4 lokale2-tidspunkt4 lokale3-tidspunkt4 lokale4-tidspunkt4 lokale5-tidspunkt4 lokale6-tidspunkt4 lokale7-tidspunkt4 lokale8-tidspunkt4"\n' +
        '"tolv-tredive lokale1-tidspunkt5 lokale2-tidspunkt5 lokale3-tidspunkt5 lokale4-tidspunkt5 lokale5-tidspunkt5 lokale6-tidspunkt5 lokale7-tidspunkt5 lokale8-tidspunkt5"\n' +
        '"tretten lokale1-tidspunkt6 lokale2-tidspunkt6 lokale3-tidspunkt6 lokale4-tidspunkt6 lokale5-tidspunkt6 lokale6-tidspunkt6 lokale7-tidspunkt6 lokale8-tidspunkt6"\n' +
        '"fjorten lokale1-tidspunkt7 lokale2-tidspunkt7 lokale3-tidspunkt7 lokale4-tidspunkt7 lokale5-tidspunkt7 lokale6-tidspunkt7 lokale7-tidspunkt7 lokale8-tidspunkt7"';


}

function digitEntered(digit) {
    console.log("digitEntered()");
    if (password.length < 4) {
        password.push(digit);
        updateDisplay();
    } else {
        confirmPassword();
    }
}

function updateDisplay() {
    console.log("updateDisplay()");
    if (password.length == 4) {
        confirmPassword();
    }

    for (let i = 1; i < password.length+1; i++) {
        document.querySelector('.display' + i).innerText = password[i-1];
    }

}

function confirmPassword() {
    console.log("confirmPassword()");
    currentAction = "tjek-ud";
    switch (currentAction) {
        case 'blaeksprutte':
            if (getPinkoder().contains(password.join(''))) { //Untested
                checkPassword('correctPassword');
            } else {
                checkPassword('incorrectPassword');
            } break;

        case 'lav-dagsplan':
            if (password.join('') == getPinkode(PædagogenDerErBlæksprutte)) {
                checkPassword('correctPassword');
                // givLovTilAtLaveDagplan()
            } else {
                checkPassword('incorrectPassword');
            } break;

        case 'tjek-ind':
            if (password.join('') == "1234") {
                checkPassword('correctPassword');
                tjekInd(paedagog);
            } else {
                checkPassword('incorrectPassword');
            } break;

        case 'tjek-ud':
            if (password.join('') == "1234") {
                checkPassword('correctPassword');
                tjekUd(paedagog);
            } else {
                checkPassword('incorrectPassword');
            } break;
    }
}

function checkPassword(result) {
    console.log("checkPassword(" + result + ")");
    for (let i = 1; i <= 4; i++) {
        document.querySelector('.display' + i).classList.add(result);
    }

    setTimeout(() => {
        for (let i = 1; i <= 4; i++) {
            document.querySelector('.display' + i).innerText = "";
            document.querySelector('.display' + i).classList.remove(result);
            password.pop();
        }
    }, 1000);

    if (result == 'correctPassword') {
        console.log("Correct password entered");
        setTimeout(closeNumpad, 1000);
        //Do whatever needs to be done, based on currentAction
    } else {
        console.log("Incorrect password entered");

        for (let i = 1; i <= 4; i++) {
            document.querySelector('.display' + i).classList.add(result);
        }
    }
}

function tilbage() {
    closeNumpad()
}

function slet() {
    document.querySelector('.display' + password.length).innerText = "";
    password.pop();
}

function getPinkode(initialer){
    let pinkode;
    let url = "paedagog/paedagoger";
    fetch(url)
        .then(response => {
            if (response.status >= 400)
                throw new Error(response.status);
            else
                return response.json();
        })
        .then(resultat => {


            for(let i = 0; i < resultat.length; i++){
                if (initialer == resultat[i].initialer) {
                    pinkode = resultat[i].pinkode;
                }
            }
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
    return pinkode;
}

function getPinkoder() {
    let url = "/paedagog/paedagoger";
    let pinkoder = [];

    fetch(url)
        .then(response => {
            if (response.status >= 400)
                throw new Error(response.status);
            else
                return response.json();
        })
        .then(resultat => {

            for(let i = 0; i < resultat.length; i++){
                pinkoder.push(resultat[i].pinkode);
            }
        })
        .catch(fejl => console.log('Fejl: ' + fejl));

    return pinkoder;
}

function getPinkodeBlaeksprutte(){
    let pinkode;
    // let url = "/valgt-blaeksprutte";
    let url = "valgt-blaeksprutte";
    fetch(url)
        .then(response => {
            if (response.status >= 400)
                throw new Error(response.status);
            else
                return response.json();
        })
        .then(resultat => {
            pinkode = resultat[0].pinkode;
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
    return pinkode;
}


openNumpad();
// closeNumpad();

// ----------------- Skal måske flyttes til en anden klasse --------------------

function tjekInd(paedagog) {
    paedagog.classList.remove('tjekketUd');
    paedagog.classList.add('tjekketInd');
    // Sæt farven på pædagogen her
    // Giv pædagogen (i databasen) en variabel der viser at han er tjekket ind
}

function tjekUd() {
    // Fjern farven på pædagogen her
    // Giv pædagogen (i databasen) en variabel der viser at han er tjekket ud
}

function paedagogTjekketInd(element) {
    let initialer = element.children[2].innerHTML;
    let tjekketInd;
    let url = "paedagog/paedagoger";
    fetch(url)
        .then(response => {
            if (response.status >= 400)
                throw new Error(response.status);
            else
                return response.json();
        })
        .then(resultat => {
            for(let i = 0; i < resultat.length; i++){
                if (initialer == resultat[i].initialer) {
                    tjekketInd = resultat[i].tjekket-ind;
                }
            }
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
    return tjekketInd;
}