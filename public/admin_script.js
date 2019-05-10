// login
async function admin_login(){
    const navn = document.querySelector('#navn');
    const password = document.querySelector('#password');
    const fejl = document.querySelector('#fejl');

    const data = { navn: navn.value, password: password.value };
    const resultat = await fetch("/admin/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    });
    const svar = await resultat.json();
    if (svar.ok == true)
        window.location = "/admin/session";
    else {
        fejl.innerHTML = "Brugernavn & password er forkert";
    }
}

// pædagoger
async function hentPaedagoger_adminVinduet() {
    let url = "/paedagog/paedagoger";
    let table = document.querySelector("#paedagoger_table");

    if(table != null) {

        try {
            const [template, response] =
                await Promise.all([fetch('/admin_paedagoger.hbs'), fetch(url)]);
            const templateText = await template.text();
            const paedagoger = await response.json();
            const compiledTemplate = Handlebars.compile(templateText);
            table.innerHTML = table.innerHTML + compiledTemplate({paedagoger});

        } catch (fejl) {
            console.log('Fejl: ' + fejl);
        }
    }
}

async function postPaedagog() {

    try {
        let navn = document.querySelector('#navn_registerPaedagog');
        let initialer = document.querySelector('#initialer_registerPaedagog');
        let pinkode = document.querySelector('#pinkode_registerPaedagog');
        const fejl = document.querySelector('#fejl_registerPaedagog');
        let url = "/paedagog/paedagoger";
        initialer = "(" + initialer.value + ")";
        let data = {navn: navn.value, initialer: initialer, pinkode: pinkode.value};

        if(navn.value != "" && initialer.value != "" && pinkode.value != "") {
            const resultat = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            });
            const svar = await resultat.json();
            if (svar.ok == true)
                window.location = "/admin/session";
            else {
                fejl.innerHTML = "Initialer eksisterer i forvejen";
            }
        } else {
            fejl.innerHTML = "Felterne må ikke være tomme";
        }
    } catch(fejl) { console.log('Fejl: ' + fejl)};
}

function deletePaedagog(id){
    let url = '/paedagog/' + id;

    fetch(url, {
        method: "DELETE",
    })
        .then(response => {
            if (response.status >= 400)
                throw new Error(response.status);
            else
                return response.json();
        })
        .then(resultat => {
            console.log(resultat);
            location.reload();
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
}

function updatingPaedagog(id, navn, initialer, tjekInd_kode) {
    let opdaterePaedagog_formular = document.querySelector("#opdatere_paedagog_formular");
    let vis_paedagoger_container = document.querySelector("#vis_paedagoger_container");
    let opdatere_navn = document.querySelector("#updateNavn");
    let opdatere_initialer = document.querySelector("#updateInitialer");
    let opdatere_pinkode = document.querySelector("#updatePinkode");
    let opdatere_knappen = document.querySelector("#updateButton");

    vis_paedagoger_container.style = "display: none;";
    opdaterePaedagog_formular.style = "display: block;";

    opdatere_navn.value = navn;
    opdatere_initialer.value = initialer;
    opdatere_pinkode.value = tjekInd_kode;
    opdatere_knappen.onclick = function () {
        putPaedagog(id, opdatere_navn.value, opdatere_initialer.value, opdatere_pinkode.value);
    }
}

function putPaedagog(id, navn, initialer, pinkode){
    let url = '/paedagog/' + id;

    let data = {id: id, navn: navn, initialer: initialer, pinkode: pinkode};

    fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => {
            if (response.status >= 400) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .then(resultat => {
            console.log(resultat);
            location.reload();
        })
        .catch(fejl => console.log('Fejl: ' + fejl));

    let opdaterePaedagog_formular = document.querySelector("#opdatere_paedagog_formular");
    let vis_paedagoger_container = document.querySelector("#vis_paedagoger_container");
    let opdatere_navn = document.querySelector("#updateNavn");
    let opdatere_initialer = document.querySelector("#updateInitialer");
    let opdatere_tjekindkode = document.querySelector("#updateTjekind_kode");

    opdatere_navn.value = '';
    opdatere_initialer.value = '';
    opdatere_tjekindkode.value = '';
    opdaterePaedagog_formular.style = "display: none;";
    vis_paedagoger_container.style = "display: block;";
}

// fokuspunkter
async function hentFokuspunkter_adminVinduet() {
    let url = "/admin/fokuspunkter";
    let table = document.querySelector("#fokuspunkter_table");

    if(table != null) {

        try {
            const [template, response] =
                await Promise.all([fetch('/admin_fokuspunkter.hbs'), fetch(url)]);
            const templateText = await template.text();
            const fokuspunkter = await response.json();
            const compiledTemplate = Handlebars.compile(templateText);
            table.innerHTML = table.innerHTML + compiledTemplate({fokuspunkter});

        } catch (fejl) {
            console.log('Fejl: ' + fejl);
        }
    }
}

async function postFokuspunkt() {

    try {
        let fokuspunkt = document.querySelector('#fokuspunkt');
        const fejl = document.querySelector('#fejl_opretFokuspunkt');
        let url = "/admin/fokuspunkter";
        let data = {fokuspunkt: fokuspunkt.value};

        if(fokuspunkt.value != "") {
            const resultat = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            });
            const svar = await resultat.json();
            if (svar.ok == true) {
                window.location = "/admin/visFokuspunkter";
            } else {
                fejl.innerHTML = "Der kan maksimum være 3 fokuspunkter";
            }
        } else {
            fejl.innerHTML = "Feltet må ikke være tomt";
        }
    } catch(fejl) { console.log('Fejl: ' + fejl)};
}

function deleteFokuspunkt(id){
    let url = '/admin/' + id;

    fetch(url, {
        method: "DELETE",
    })
        .then(response => {
            if (response.status >= 400)
                throw new Error(response.status);
            else
                return response.json();
        })
        .then(resultat => {
            console.log(resultat);
            location.reload();
        })
        .catch(fejl => console.log('Fejl: ' + fejl));
}

function updatingFokuspunkt(id, fokuspunkt) {
    let opdatereFokuspunkt_formular = document.querySelector("#opdatere_fokuspunkt_formular");
    let vis_fokuspunkter_container = document.querySelector("#vis_fokuspunkter_container");
    let opdatere_fokuspunkt = document.querySelector("#updateFokuspunkt");
    let opdatere_knappen = document.querySelector("#updateButton");

    vis_fokuspunkter_container.style = "display: none;";
    opdatereFokuspunkt_formular.style = "display: block;";

    opdatere_fokuspunkt.value = fokuspunkt;
    opdatere_knappen.onclick = function () {
        putFokuspunkt(id, opdatere_fokuspunkt.value);
    }
}

function putFokuspunkt(id, fokuspunkt){
    let url = '/admin/' + id;

    let data = {id: id, fokuspunkt: fokuspunkt};

    fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => {
            if (response.status >= 400) {
                throw new Error(response.status);
            } else {
                return response.json();
            }
        })
        .then(resultat => {
            console.log(resultat);
            location.reload();
        })
        .catch(fejl => console.log('Fejl: ' + fejl));

    let opdatereFokuspunkt_formular = document.querySelector("#opdatere_fokuspunkt_formular");
    let vis_fokuspunkter_container = document.querySelector("#vis_fokuspunkter_container");
    let opdatere_fokuspunkt = document.querySelector("#updateFokuspunkt");

    opdatere_fokuspunkt.value = '';
    opdatereFokuspunkt_formular.style = "display: none;";
    vis_fokuspunkter_container.style = "display: block;";
}


hentFokuspunkter_adminVinduet();
hentPaedagoger_adminVinduet();