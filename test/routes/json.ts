import { fake, stub, SinonStub } from 'sinon';
import * as assert from 'assert';
import request from 'supertest';
import { default as express, Response, Request, NextFunction } from 'express';
import path from 'path';
import * as baseRoutes from '../../src/routes/base';
import { Json, Yahoo } from '../../src/controllers/Json';

describe('routes/json', () => {
  let stubCreateRoutingFunction!: SinonStub;
  const routesJsonPath = path.resolve(__dirname, '../../src/routes/json.ts');
  before(() => {
    stubCreateRoutingFunction = stub(baseRoutes, 'default');
  });
  beforeEach(() => {
    stubCreateRoutingFunction.reset();
    stubCreateRoutingFunction.callsFake(fake());
    delete require.cache[routesJsonPath];
  });
  after(() => {
    stubCreateRoutingFunction.restore();
  });

  describe('Routerの中身を確認', () => {
    beforeEach(() => {
      stubCreateRoutingFunction.returns(fake((req: Request, res: Response, next: NextFunction) => { res.end('fake'); }));
    });
    it('正常系', () => {
      require('../../src/routes/json');
      assert.ok(stubCreateRoutingFunction.calledTwice);
      assert.deepStrictEqual(stubCreateRoutingFunction.firstCall.args, [ Json ]);
      assert.deepStrictEqual(stubCreateRoutingFunction.secondCall.args, [ Yahoo ]);
    });
  });
  describe('Routingを確認', () => {
    let app!: express.Application;
    beforeEach(() => {
      stubCreateRoutingFunction
        .withArgs(Json).returns(fake((req: Request, res: Response, next: NextFunction) => { res.end('fake json'); }))
        .withArgs(Yahoo).returns(fake((req: Request, res: Response, next: NextFunction) => { res.end('fake yahoo'); }));
      stubCreateRoutingFunction.returns(fake((req: Request, res: Response, next: NextFunction) => { res.end('fake'); }));

      app = express();
      const router = require('../../src/routes/json').default;
      app.use(router);
    });
    it('/', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.text, 'fake json');
          done();
        });
    });
    it('/yahoo', (done) => {
      request(app)
        .get('/yahoo')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.text, 'fake yahoo');
          done();
        });
    });
    it('useを使う', (done) => {
      request(app)
        .get('/use')
        .expect(200)
        .end((err, res) => {
          assert.deepEqual(res.body, {});
          done();
        });
    });
  });
  describe('createRoutingFunctionでnextが動く場合の挙動', () => {
    let app!: express.Application;
    beforeEach(() => {
      stubCreateRoutingFunction
        .withArgs(Json).returns(fake((req: Request, res: Response, next: NextFunction) => { res.locals.json = { site: 'fake json' }; next(); }))
        .withArgs(Yahoo).returns(fake((req: Request, res: Response, next: NextFunction) => { res.locals.json = { site: 'fake yahoo' }; next(); }));
      stubCreateRoutingFunction.returns(fake((req: Request, res: Response, next: NextFunction) => { res.locals.json = { site: 'fake' }; next(); }));

      app = express();
      const router = require('../../src/routes/json').default;
      app.use(router);
    });
    it('/', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          assert.deepEqual(res.body, { site: 'fake json' });
          done();
        });
    });
    it('/yahoo', (done) => {
      request(app)
        .get('/yahoo')
        .expect(200)
        .end((err, res) => {
          assert.deepEqual(res.body, { site: 'fake yahoo' });
          done();
        });
    });
  });
});
