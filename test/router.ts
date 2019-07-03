import express from 'express';
import * as assert from 'assert';
import { fake } from 'sinon';
import request from 'supertest';
import router from '../src/router';

describe('router', () => {
  const app = express();
  const fakeNoRoute = fake((req: express.Request, res: express.Response, next: express.NextFunction) => { res.sendStatus(404); });
  app
    .use(router)
    .use(fakeNoRoute);

  beforeEach(() => {
    fakeNoRoute.resetHistory();
  });

  it('200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        assert.equal(res.type, 'text/html');
        assert.equal(res.text, 'index');
        done();
      });
  });
  it('No Route', (done) => {
    request(app)
      .get('/no-route')
      .expect(404)
      .end((err, res) => {
        assert.ok(fakeNoRoute.calledOnce);
        done();
      });
  });
});