import chai from 'chai';
const should = chai.should();

import chaiHttp from 'chai-http';
import server from '../../../app';
import truncate from '../../truncate';

import users from '../../fixtures/users';

chai.use(chaiHttp);

const signup = async user => {
  return chai.request(server)
    .post('/signup/')
    .send({ user })
}  

describe('POST /signup/', () => {
  
  before(async () => await truncate());
  
  it('should return 201 http code (created) and user info', async () => {
    const res = await signup(users[0]);

    res.should.have.status(201);
    res.should.be.json;
    res.body.should.be.a('object');
  })
  
});


const login = async user => {
  return chai.request(server)
    .post('/login/')
    .send({
      user: {
        email: user.email,
        password: user.password,
      }
    })
}


describe('POST /login/', () => {
  it('should return logged user info and token', async () => {
    const res = await login(users[0]);
    
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.should.have.property('user');
    res.body.should.have.property('token');
  })
});


export { login, signup };