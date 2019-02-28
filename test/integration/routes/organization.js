const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../../../app');
const truncate = require('../../truncate');

const auth = require('./auth');
const users = require('../../fixtures/users');
const organizations = require('../../fixtures/organizations');


chai.use(chaiHttp);

const createOrganization = async (organization, token) => {
  return chai.request(server)
      .post('/organization/')
      .send({ organization })
      .set({ token });
}


describe('GET /organizations/', () => {
  before(async () => await truncate());

  it('should return all organizations', async () => {
    const res = await chai.request(server)
      .get('/organizations/')

      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
  })
});


describe('GET /organization/1', () => {
  let token;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
    await createOrganization(organizations[0], token);
  });

  it('should return organization of id 1', async () => {
    const res = await chai.request(server)
      .get('/organization/1')
      .set({ token });

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
  })
});


describe('POST /organization/', () => {
  let token;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
  });

  it('should return 201 http code (created) and the created organization object', async () => {
      const res = await createOrganization(organizations[0], token);
      
      res.should.have.status(201);
      res.should.be.json;
      res.body.should.be.a('object');
  })
});


describe('PUT /organization/1', () => {
  let token;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
    await createOrganization(organizations[0], token);
  });
  
  it('should return 200 http code and the updated organization object', async () => {
    const updated_organization = organizations[0];
    updated_organization.name = 'Updated Organization Name';
    
    const res = await chai.request(server)
      .put('/organization/1')
      .send({ organization: updated_organization })
      .set({ token });

      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
  })
});

describe('DELETE /organization/1', () => {
  let token;

  before(async () => {
    await truncate();
    await auth.signup(users[0]);
    const res = await auth.login(users[0]);
    token = res.body.token;
    await createOrganization(organizations[0], token);
  });
  
  it('should return 200 http code', async () => {
    const res = await chai.request(server)
      .delete('/organization/1')
      .set({ token });
  
      res.should.have.status(200);
  })
});

module.exports = { createOrganization };