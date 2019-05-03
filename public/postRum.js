let url = "/blaeksprutte/rum";
let data = { paedagogInitialer: "(EK)", index: "7", dato: "02-05-2019" };

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