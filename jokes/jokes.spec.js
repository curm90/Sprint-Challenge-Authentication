const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

beforeEach(() => {
  return db('users').truncate();
});

describe('jokes router', () => {
  it('should return an error if accessed without any credentials', async () => {
    const response = await request(server).get('/api/jokes');
    expect(response.status).toBe(401);
  });

  it('should return the correct response body with no credentials', async () => {
    const response = await request(server).get('/api/jokes');
    expect(response.body).toEqual({ you: 'shall not pass!' });
  });

  it('should not have a token proprerty in the body', async () => {
    const response = await request(server).get('/api/jokes');
    expect(response.body).not.toHaveProperty('token');
  });
});
