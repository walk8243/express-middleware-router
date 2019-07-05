import express from 'express';
import * as assert from 'assert';
import * as path from 'path';
import { fake } from 'sinon';
import request from 'supertest';

describe('router', () => {
  describe('Routing', () => {
    const app = express();
    const fakeNoRoute = fake((req: express.Request, res: express.Response, next: express.NextFunction) => { res.sendStatus(404); });
  
    before(() => {
      const router = require('../src/router').default;
      app
        .use(router)
        .use(fakeNoRoute);
    });
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

  describe('Import', () => {
    let app: express.Application;
    const fakeRoute = fake((req: express.Request, res: express.Response, next: express.NextFunction) => { res.end('fakeRoute'); });
    before(() => {
      require('../src/router');
    });
    beforeEach(() => {
      app = express();
      delete require.cache[path.resolve(__dirname, '../src/router.ts')];
      delete require.cache[path.resolve(__dirname, '../src/routes/index.ts')];
      delete require.cache[path.resolve(__dirname, '../src/routes/json.ts')];
      require('../src/routes/index');
      require('../src/routes/json');
      fakeRoute.resetHistory();
    });

    it('routes/index.ts', (done) => {
      require.cache[path.resolve(__dirname, '../src/routes/index.ts')].exports.default = fakeRoute;
      const router = require('../src/router').default;
      app.use(router);
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          assert.deepEqual(err, null);
          assert.equal(res.text, 'fakeRoute');
          assert.ok(fakeRoute.calledOnce);
          done();
        });
    });
    it('routes/json.ts', (done) => {
      require.cache[path.resolve(__dirname, '../src/routes/json.ts')].exports.default = fakeRoute;
      const router = require('../src/router').default;
      app.use(router);
      request(app)
        .get('/json')
        .expect(200)
        .end((err, res) => {
          assert.deepEqual(err, null);
          assert.equal(res.text, 'fakeRoute');
          assert.ok(fakeRoute.calledOnce);
          done();
        });
    });
  });
});
