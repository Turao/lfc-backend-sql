const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../../app');
const truncate = require('../../truncate');

const auth = require('./auth');
const users = require('../../fixtures/users');


chai.use(chaiHttp);

const createUser = async (user, token) => {
  return chai.request(server)
      .post('/user/')
      .send({ user })
      .set({ token });
};

describe('GET /users/', () => {
  before(async () => await truncate());

  it('should return all users', async () => {
    const res = await chai.request(server)
      .get('/users/')

      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
  })
});


describe('GET /user/1', () => {
  let token = null;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
  });

  it('should return user of id 1', async () => {
    const res = await chai.request(server)
      .get('/user/1')
      .set({ token });

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
  })
});


describe('POST /user/', () => {
  let token = null;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
  });

  it('should return 201 http code (created) and the created user object', async () => {
    const res = await chai.request(server)
      .post('/user/')
      .send({ user: users[1] })
      .set({ token });
      
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
  })
});


describe('PUT /user/1', () => {
  let token = null;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
  });
  
  it('should return 200 http code and the updated user object', async () => {
    const updated_user = users[0];
    updated_user.email = 'updated@email.com';
    
    const res = await chai.request(server)
      .put('/user/1')
      .send({ user: updated_user })
      .set({ token });

      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
  })
});


describe('DELETE /user/1', () => {
  let token = null;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
  });
  
  it('should return 200 http code', async () => {
    const res = await chai.request(server)
      .delete('/user/1')
      .set({ token });
  
      res.should.have.status(200);
  })
});

module.exports = { createUser };