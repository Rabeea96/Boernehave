const app = require('../app.js');
const controller = require("../controllers/controller");
const request = require('supertest');
const should = require('should');

// describe fungerer som en slags container for alle testcases
// den første parameter indeholder titlen for alle testcases og den anden parameter indeholder en funktion over alle it() dvs. testcases
describe('Unit Test', function () {

    // en describe kan indeholde mange testcases dvs. it()
    // den første parameter i it() indeholder titlen på testcasen og den anden parameter indeholder funktionen som skal teste noget funktionalitet

    // tester om det der er på forsiden er i HTML
    it("Forside i HTML (testcase 1)", async function () {
        this.timeout(3000);
        await request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/);
    });

    // tester om det der er i endpoint '/paedagog/paedagoger' er i JSON-format
    it("Endpoint '/paedagog/paedagoger' i JSON-format (testcase 2)", async function () {
        this.timeout(3000);
        await request(app)
            .get('/paedagog/paedagoger')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    // tester om brugeren bliver postet rigtigt med en besked: Pædagogen er nu registreret i systemet!
    // tester også om den sidste bruger matcher de indtastede data dvs. den bruger som man har postet/registreret
    it("Registrer en pædagog (testcase 3)", async function () {
        this.timeout(3000);
        const response = await request(app)
            .post('/paedagog/paedagoger')
            .send({
                'navn': 'Rabeea M',
                'initialer': '(RM)',
                'pinkode': '1234'
            })
            .expect(200);
        response.body.message.should.be.equal('Pædagogen er nu registreret i systemet!');

        const response2 = await request(app)
            .get('/paedagog/paedagoger');
        const users = response2.body;
        const last = users.length - 1;
        users[last].navn.should.be.equal('Rabeea M');
        users[last].initialer.should.be.equal('(RM)');
        users[last].pinkode.should.be.equal('1234');
    });

    // tester om der vises en fejl hvis man prøver at registrer en pædagog med samme initialer - med en besked: Pædagog-initialerne findes i forvejen!
    it("Registrer en pædagog med samme initialer (testcase 4)", async function () {
        this.timeout(3000);
        const response = await request(app)
            .post('/paedagog/paedagoger')
            .send({
                'navn': 'Tom Jensen',
                'initialer': '(RM)',
                'pinkode': '5678'
            })
            .expect(200);
        response.body.message.should.be.equal('Pædagog-initialerne findes i forvejen');
    });

    // tester om brugeren bliver opdateret rigtigt med en besked: Pædagogen er nu opdateret i systemet!
    // tester også at antal pædagoger stadig er den samme
    it("Opdater en pædagog (testcase 5)", async function () {
        this.timeout(3000);
        const response1 = await request(app)
            .get('/paedagog/paedagoger');
        const users1 = response1.body;
        const usersNumberBefore = users1.length;
        const id = users1[users1.length - 1]._id;

        const response2 = await request(app)
            .put('/paedagog/' + id)
            .send({
                'navn': 'Rabeea Moussa',
                'initialer': '(RM)',
                'pinkode': '1234'
            })
            .expect(200);
        response2.body.message.should.be.equal('Pædagogen er nu opdateret i systemet!');

        const response3 = await request(app)
            .get('/paedagog/paedagoger');
        const users2 = response3.body;
        const usersNumberAfter = users2.length;
        usersNumberBefore.should.be.equal(usersNumberAfter);
    });

    // tester om den sidste bruger matcher de indtastede data dvs. den bruger som man har opdateret.
    // i testcase 3 hed brugeren som var blevet postet "Rabeea M" - i testcase 5 er navnet blevet opdateret til "Rabeea Moussa"
    it("Pædagog er opdateret (testcase 6)", async function () {
        this.timeout(3000);
        const response = await request(app)
            .get('/paedagog/paedagoger');
        const users = response.body;
        const usersNumberAfter = users.length;
        const last = users.length - 1;
        users[last].navn.should.be.equal('Rabeea Moussa');
        users[last].initialer.should.be.equal('(RM)');
        users[last].pinkode.should.be.equal('1234');
    });

    // tester om brugeren bliver slettet rigtigt med en besked: Pædagogen er nu slettet fra systemet!
    // tester også om at antal pædagoger ikke stadig er den samme samt at den sidste pædagogs navn ikke ikke længere er den samme efter sletningen
    it("Sletter en pædagog (testcase 7)", async function () {
        this.timeout(3000);
        const response1 = await request(app)
            .get('/paedagog/paedagoger');
        const users1 = response1.body;
        const usersNumberBefore = users1.length;
        const id = users1[users1.length - 1]._id;

        const response2 = await request(app)
            .delete('/paedagog/' + id)
            .expect(200);
        response2.body.message.should.be.equal('Pædagogen er nu slettet fra systemet!');

        const response3 = await request(app)
            .get('/paedagog/paedagoger');
        const users2 = response3.body;
        const usersNumberAfter = users2.length;
        const last = users2.length - 1;
        users2[last].navn.should.not.be.equal('Rabeea Moussa');
        usersNumberBefore.should.not.be.equal(usersNumberAfter);
    });
});
