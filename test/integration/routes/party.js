const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../../app');
const truncate = require('../../truncate');

const auth = require('./auth');
const users = require('../../fixtures/users');
const parties = require('../../fixtures/parties');


chai.use(chaiHttp);

const createParty = async (party, token) => {
  return chai.request(server)
      .post('/party/')
      .send({ party })
      .set({ token });
}


describe('GET /parties/', () => {
  before(async () => await truncate());

  it('should return all parties', async () => {
    const res = await chai.request(server)
      .get('/parties/')

      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
  })
});


describe('GET /party/1', () => {
  let token;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
    await createParty(parties[0], token);
  });

  it('should return party of id 1', async () => {
    const res = await chai.request(server)
      .get('/party/1')
      .set({ token });

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
  })
});


describe('POST /party/', () => {
  let token;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
  });

  it('should return 201 http code (created) and the created event object', async () => {
      const res = await createParty(parties[0], token);
      
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
  })
});


describe('PUT /party/1', () => {
  let token;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
    await createParty(parties[0], token);
  });
  
  it('should return 200 http code and the updated party object', async () => {
    const updated_party = parties[0];
    updated_party.name = 'Updated Party Name';
    
    const res = await chai.request(server)
      .put('/party/1')
      .send({ party: updated_party })
      .set({ token });

      await console.log('party updated res', res.body);

      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
  })
});

describe('DELETE /party/1', () => {
  let token;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
    await createParty(parties[0], token);
  });
  
  it('should return 200 http code', async () => {
    const res = await chai.request(server)
      .delete('/party/1')
      .set({ token });
  
      res.should.have.status(200);
  })
});

module.exports = { createParty };