import chai from 'chai';
const should = chai.should();

import chaiHttp from 'chai-http';
import server from '../../../app';
import truncate from '../../truncate';

import { login, signup } from './auth';
import users from '../../fixtures/users';
import { createUser } from './user';

import statements from '../../fixtures/statements';
import { createStatement } from './statement';
import factchecks from '../../fixtures/factchecks';


chai.use(chaiHttp);

const createFactCheck = async (factcheck, token) => {
  await createUser(users[1], token);
  await createStatement(statements[0], token);
  return chai.request(server)
    .post('/factcheck/')
    .send({ factcheck })
    .set({ token });
}


describe('GET /factchecks/', () => {
  before(async () => await truncate());

  it('should return all factchecks', async () => {
    const res = await chai.request(server)
      .get('/factchecks/')

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('array');
  })
});


describe('GET /factcheck/1', () => {
  let token;

  before(async () => {
    await truncate();
    await signup(users[0]);
    const res = await login(users[0]);
    token = res.body.token;
    await createFactCheck(factchecks[0], token);
  });

  it('should return factcheck of id 1', async () => {
    const res = await chai.request(server)
      .get('/factcheck/1')
      .set({ token });

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
  })
});


describe('POST /factcheck/', () => {
  let token;

  before(async () => {
    await truncate();
    await signup(users[0]);
    const res = await login(users[0]);
    token = res.body.token;
  });
  
  it('should return 201 http code (created) and the created factcheck object', async () => {
    const res = await createFactCheck(factchecks[0], token);
      
    res.should.have.status(201);
    res.should.be.json;
    res.body.should.be.a('object');
  })
});


describe('PUT /factcheck/1', () => {
  let token;

  before(async () => {
    await truncate();
    await signup(users[0]);
    const res = await login(users[0]);
    token = res.body.token;
    await createFactCheck(factchecks[0], token);
  });
  
  it('should return 200 http code and the updated factcheck object', async () => {
    const updated_factcheck = factchecks[0];
    updated_factcheck.name = 'Updated FactCheck Name';
    
    const res = await chai.request(server)
      .put('/factcheck/1')
      .send({ factcheck: updated_factcheck })
      .set({ token });

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
  })
});


describe('DELETE /factcheck/1', () => {
  let token;

  before(async () => {
    await truncate();
    await signup(users[0]);
    const res = await login(users[0]);
    token = res.body.token;
    await createFactCheck(factchecks[0], token);
  });
  
  it('should return 200 http code', async () => {
    const res = await chai.request(server)
      .delete('/factcheck/1')
      .set({ token });
  
    res.should.have.status(200);
  })
});

export { createFactCheck };