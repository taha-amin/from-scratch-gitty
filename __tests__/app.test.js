const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { agent } = require('supertest');

jest.mock('../lib/services/github');

describe('oauth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET redirect to the github oauth page upon login', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });

  it('GET callback URI for Github to redirect to after login', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'fake_github_user',
      email: 'not-real@example.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('DELETE signs a user out', async () => {
    const res = await request(app).delete('/api/v1/github');
    expect(res.status).toEqual(200);
    expect(res.body.message).toBe('Successfully signed out');
  });

  it('GET lists all posts for all users', async () => {
    // const res = await request
    //   .agent(app)
    //   .get('/api/v1/github/callback?code=42')
    //   .redirects(1)
    //   .get('/api/v1/posts');

    // console.log('1', res);

    // res = await request.agent(app).get('/api/v1/posts');

    const appAgent = request.agent(app);
    let res = await appAgent
      .get('/api/v1/github/callback?code=42')
      .redirects(1);
    res = await appAgent.get('/api/v1/posts');

    expect(res.body).toEqual([
      {
        id: '1',
        title: 'First Post',
        content: 'ladi dadi daa',
      },
    ]);
  });

  afterAll(() => {
    pool.end();
  });
});
