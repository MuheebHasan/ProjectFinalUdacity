const request = require('supertest');
const app = require('./server/server'); // Update path to server.js

describe('Express Server Tests', () => {
  it('should respond with status 200 on GET /', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
