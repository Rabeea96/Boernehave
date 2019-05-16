const app = require('../app.js');
const controller = require("../controllers/controller");
const request = require('supertest');
const should = require('should');

describe('Accept Test', function () {

    // tjekker en pædagog ind i systemet
    it('Tjek-ind (test-case 1)', async function () {
        this.timeout(3000);
        const response = await request(app)
            .post('/checkin')
            .send({
                'paedagogInitialer': '(KR)',
                'dato': '01-05-2019',
                'tjekketInd': 'true'
            })
            .expect(200);
        response.body.message.should.be.equal('Pædagogen er nu tjekket ind i systemet!');

        const response2 = await request(app)
            .get('/checkin');
        const checkins = response2.body;
        const last = checkins.length - 1;
        checkins[last].paedagogInitialer.should.be.equal('(KR)');
        checkins[last].dato.should.be.equal('01-05-2019');
        checkins[last].tjekketInd.should.be.equal('true');
    });

    // tjekker en pædagog ud af systemet - kræver selvfølgelig at pædagogen er tjekket ind i forvejen
    it('Tjek-ud (test-case 2)', async function () {
        this.timeout(3000);
        const response1 = await request(app)
            .get('/checkin');
        const checkins1 = response1.body;
        const id = checkins1[checkins1.length - 1]._id;

        const response2 = await request(app)
            .put('/checkin/dagsdato')
            .send({
                'id': id,
                'paedagogInitialer': '(KR)',
                'dato': '01-05-2019',
                'tjekketInd': 'false'
            })
            .expect(200);
        response2.body.message.should.be.equal('Pædagogen er nu tjekket ud af systemet!');

        const response3 = await request(app)
            .get('/checkin');
        const checkins = response3.body;
        const last = checkins.length - 1;
        checkins[last].paedagogInitialer.should.be.equal('(KR)');
        checkins[last].dato.should.be.equal('01-05-2019');
        checkins[last].tjekketInd.should.be.equal('false');
    });
});