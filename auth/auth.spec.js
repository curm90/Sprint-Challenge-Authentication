const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

beforeEach(() => {
  return db('users').truncate();
});

describe('auth register router', () => {
  it('should return 201 OK on registration', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'testing',
        password: 'testing123'
      });
    expect(response.status).toBe(201);
  });

  it('should return valid body', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'Testing',
        password: '1234'
      });
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('password');
  });
});

describe('auth login router', () => {
  it('should return a token', async () => {
    let response = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'Testing',
        password: '1234'
      });
    expect(response.status).toBe(201);

    response = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'Testing',
        password: '1234'
      });
    expect(response.body).toHaveProperty('token');
  });

  it('should return a 404 if credentials are incorrect ', async () => {
    let response = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'Testing',
        password: '1234'
      });
    expect(response.status).toBe(201);

    response = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'Testing',
        password: '123456'
      });
    expect(response.status).toBe(404);
  });
});
