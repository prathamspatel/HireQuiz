const request = require('supertest');
const app = require('../../src/app');
const crypto = require('crypto');

describe('POST /v1/application', () => {
  test('unauthenticated user should receive 401 error', () =>
    request(app).post('/v1/application').expect(401));

  test('incorrect credentials should receive 401 error', () =>
    request(app)
      .post('/v1/application')
      .auth('invalid@email.com', 'incorrect_password')
      .expect(401));

  test('unsupported content-type throw 415 error', async () => {
    const res = await request(app)
      .post('/v1/application')
      .auth('user1@email.com', 'password1')
      .set('content-type', 'image/jpg');
    expect(res.statusCode).toBe(415);
  });

  test('check the data in array after post request is done', async () => {
    const res = await request(app)
      .post('/v1/application')
      .auth('user1@email.com', 'password1')
      .set('content-type', 'application/json')
      .send('{Hello, world}');

    const data = JSON.parse(res.text);
    const userID = crypto.createHash('sha256').update('user1@email.com').digest('hex');

    expect(res.statusCode).toBe(201);
    expect(res.type).toBe('application/json');
    expect(data.application.ownerId).toBe(userID);
    expect(res.text).toContain('created');
    expect(res.text).toContain('updated');
  });
});
