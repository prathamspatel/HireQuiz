const request = require('supertest');
const app = require('../../src/app');

describe('GET /v1/posting/:id', () => {
  test('unauthenticated requests should receive 401 error', () =>
    request(app).get('/v1/postings/anyid').expect(401));

  test('incorrect credentials should receive 401 error', () =>
    request(app).get('/v1/posting/anyid').auth('jaypatel@email.com', 'jaypatel').expect(401));

  test('if the id do not exist it will return 404', async () => {
    await request(app)
      .post('/v1/posting')
      .auth('user1@email.com', 'password1')
      .set('content-type', 'text/plain')
      .send('this is the value');
    const res2 = await request(app)
      .get(`/v1/posting/someRandomId`)
      .auth('user1@email.com', 'password1');

    expect(res2.statusCode).toBe(404);
    expect(res2.body.status).toBe('error');
  });

  test('id not owned by the user can not access the id of other postings data', async () => {
    const res = await request(app)
      .post('/v1/posting')
      .auth('user1@email.com', 'password1')
      .set('content-type', 'text/plain')
      .send('this is the value');
    const id = res.id;

    const res2 = await request(app).get(`/v1/posting/${id}`).auth('user2@email.com', 'password2');

    expect(res2.statusCode).toBe(404);
    expect(res2.body.status).toBe('error');
  });

  test('check the return value of the user and its postings id', async () => {
    const res = await request(app)
      .post('/v1/posting')
      .auth('user1@email.com', 'password1')
      .set('content-type', 'application/json')
      .send('{hello}:{world}');

    const jsondata = JSON.parse(res.text);
    const id = jsondata.posting.id;

    const res2 = await request(app).get(`/v1/posting/${id}`).auth('user1@email.com', 'password1');
    expect(res2.statusCode).toBe(200);
  });
});
