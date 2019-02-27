const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../../app');
const truncate = require('../../truncate');

const users = require('../../fixtures/users');
const auth = require('./auth');

chai.use(chaiHttp);


describe('GET /events/', () => {
  before(async () => await truncate());

  it('should return all events', async () => {
    const res = await chai.request(server)
      .get('/events/')

      console.log(res.body);

      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
  })
});


describe('GET /event/1', () => {
  let token = null;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
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
  let token = null;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
  });

  it('should return 201 http code (created) and the created event object', async () => {
    const res = await chai.request(server)
      .post('/event/')
      .send({ event: events[0] })
      .set({ token });
      
      console.log(res.body);

      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
  })
});


describe('PUT /event/1', () => {
  let token = null;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
  });
  
  it('should return 200 http code and the updated event object', async () => {
    const updated_event = events[0];
    updated_event.name = 'Updated Event Name';
    
    const res = await chai.request(server)
      .put('/event/1')
      .send({ event: updated_event })
      .set({ token });

      console.log(res.body);

      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
  })
});

describe('DELETE /event/1', () => {
  let token = null;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
  });
  
  it('should return 200 http code', async () => {
    const res = await chai.request(server)
      .delete('/event/1')
      .set({ token });
  
      res.should.have.status(200);
  })
});