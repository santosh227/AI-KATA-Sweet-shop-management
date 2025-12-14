// server/src/tests/auth.test.js
const request = require('supertest');

const BASE_URL = 'http://localhost:5000';

describe('Auth API (smoke test)', () => {
  test('POST /api/auth/register responds with JSON', async () => {
    const res = await request(BASE_URL)
      .post('/api/auth/register')
      .send({
        name: 'TDD User',
        email: `tdd_${Date.now()}@example.com`,
        password: 'secret123'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
  });
});
