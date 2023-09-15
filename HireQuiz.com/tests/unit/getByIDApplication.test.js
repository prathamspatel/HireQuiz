const request = require('supertest');
const app = require('../../src/app');

describe('GET /v1/application/:id', () => {
  test('unauthenticated requests should receive 401 error', () =>
    request(app).get('/v1/application/anyid').expect(401));

  test('incorrect credentials should receive 401 error', () =>
    request(app).get('/v1/application/anyid').auth('jaypatel@email.com', 'jaypatel').expect(401));

  test('if the id do not exist it will return 404', async () => {
    await request(app)
      .post('/v1/application')
      .auth('user1@email.com', 'password1')
      .set('content-type', 'text/plain')
      .send('this is the value');
    const res2 = await request(app)
      .get(`/v1/application/someRandomId`)
      .auth('user1@email.com', 'password1');

    expect(res2.statusCode).toBe(404);
    expect(res2.body.status).toBe('error');
  });

  test('id not owned by the user can not access the id of other applications data', async () => {
    const res = await request(app)
      .post('/v1/application')
      .auth('user1@email.com', 'password1')
      .set('content-type', 'text/plain')
      .send('this is the value');
    const id = res.id;

    const res2 = await request(app)
      .get(`/v1/application/${id}`)
      .auth('user2@email.com', 'password2');

    expect(res2.statusCode).toBe(404);
    expect(res2.body.status).toBe('error');
  });

  test('check the return value of the user and its applications id', async () => {
    const res = await request(app)
      .post('/v1/application')
      .auth('user1@email.com', 'password1')
      .set('content-type', 'application/json')
      .send('{hello}:{world}');

    const jsondata = JSON.parse(res.text);
    const id = jsondata.application.id;

    const res2 = await request(app)
      .get(`/v1/application/${id}`)
      .auth('user1@email.com', 'password1');
    expect(res2.statusCode).toBe(200);
  });
});
