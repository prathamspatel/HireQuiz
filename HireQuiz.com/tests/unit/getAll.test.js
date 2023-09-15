// tests/unit/get.test.js

const request = require('supertest');

const app = require('../../src/app');

describe('GET /v1/all', () => {
  test('unauthenticated requests are denied', () => request(app).get('/v1/all').expect(401));

  test('incorrect credentials are denied', () =>
    request(app).get('/v1/all').auth('invalid@email.com', 'incorrect_password').expect(401));

  test('authenticated users get an array', async () => {
    const res = await request(app).get('/v1/all').auth('user1@email.com', 'password1');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(Array.isArray(res.body.postings)).toBe(true);
    expect(Array.isArray(res.body.applications)).toBe(true);
  });
});
