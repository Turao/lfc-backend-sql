import chai from 'chai';
const should = chai.should();

import chaiHttp from 'chai-http';
import server from '../../../app';
import truncate from '../../truncate';

import { login, signup } from './auth';
import users from '../../fixtures/users';
import { createUser } from './user';

import events from '../../fixtures/events';
import { createEvent } from './event';

import statements from '../../fixtures/statements';


chai.use(chaiHttp);

const createStatement = async (statement, token) => {
  await createUser(users[1], token);
  await createEvent(events[0], token);
  return chai.request(server)
    .post('/statement/')
    .send({ statement })
    .set({ token });
}


describe('GET /statements/', () => {
  before(async () => await truncate());

  it('should return all statements', async () => {
    const res = await chai.request(server)
      .get('/statements/')

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('array');
  })
});


describe('GET /statement/1', () => {
  let token;

  before(async () => {
    await truncate();
    await signup(users[0]);
    const res = await login(users[0]);
    token = res.body.token;
    await createStatement(statements[0], token);
  });

  it('should return statement of id 1', async () => {
    const res = await chai.request(server)
      .get('/statement/1')
      .set({ token });

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
  })
});


describe('POST /statement/', () => {
  let token;

  before(async () => {
    await truncate();
    await signup(users[0]);
    const res = await login(users[0]);
    token = res.body.token;
  });
  
  it('should return 201 http code (created) and the created statement object', async () => {
    const res = await createStatement(statements[0], token);
      
    res.should.have.status(201);
    res.should.be.json;
    res.body.should.be.a('object');
  })
});


describe('PUT /statement/1', () => {
  let token;

  before(async () => {
    await truncate();
    await signup(users[0]);
    const res = await login(users[0]);
    token = res.body.token;
    await createStatement(statements[0], token);
  });
  
  it('should return 200 http code and the updated statement object', async () => {
    const updated_statement = statements[0];
    updated_statement.name = 'Updated Statement Name';
    
    const res = await chai.request(server)
      .put('/statement/1')
      .send({ statement: updated_statement })
      .set({ token });

    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
  })
});


describe('DELETE /statement/1', () => {
  let token;

  before(async () => {
    await truncate();
    await signup(users[0]);
    const res = await login(users[0]);
    token = res.body.token;
    await createStatement(statements[0], token);
  });
  
  it('should return 200 http code', async () => {
    const res = await chai.request(server)
      .delete('/statement/1')
      .set({ token });
  
    res.should.have.status(200);
  })
});

export { createStatement };