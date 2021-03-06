const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../../app');
const truncate = require('../../truncate');

const auth = require('./auth');
const users = require('../../fixtures/users');

const organizations = require('../../fixtures/organizations');
const { createOrganization } = require('./organization');

const events = require('../../fixtures/events');


chai.use(chaiHttp);

const createEvent = async (event, token) => {
  await createOrganization(organizations[0], token);
  return chai.request(server)
    .post('/event/')
    .send({ event })
    .set({ token });
}


describe('GET /events/', () => {
  before(async () => await truncate());

  it('should return all events', async () => {
    const res = await chai.request(server)
      .get('/events/')

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('array');
  })
});


describe('GET /event/1', () => {
  let token;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
    await createEvent(events[0], token);
  });

  it('should return event of id 1', async () => {
    const res = await chai.request(server)
      .get('/event/1')
      .set({ token });

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
  })
});


describe('POST /event/', () => {
  let token;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
  });
  
  it('should return 201 http code (created) and the created event object', async () => {
    const res = await createEvent(events[0], token);
    
    res.should.have.status(201);
    res.should.be.json;
    res.body.should.be.a('object');
  })
});


describe('PUT /event/1', () => {
  let token;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
    await createEvent(events[0], token);
  });
  
  it('should return 200 http code and the updated event object', async () => {
    const updated_event = events[0];
    updated_event.name = 'Updated Event Name';
    
    const res = await chai.request(server)
      .put('/event/1')
      .send({ event: updated_event })
      .set({ token });

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
  })
});


describe('DELETE /event/1', () => {
  let token;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
    await createEvent(events[0], token);
  });
  
  it('should return 200 http code', async () => {
    const res = await chai.request(server)
      .delete('/event/1')
      .set({ token });
  
    res.should.have.status(200);
  })
});

module.exports = { createEvent };