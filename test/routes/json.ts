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
    stubCreateRoutingFunction
      .withArgs(Json).returns(fake((req: Request, res: Response, next: NextFunction) => { res.end('fake json'); }))
      .withArgs(Yahoo).returns(fake((req: Request, res: Response, next: NextFunction) => { res.end('fake yahoo'); }));
    stubCreateRoutingFunction.returns(fake((req: Request, res: Response, next: NextFunction) => { res.end('fake'); }));
    delete require.cache[routesJsonPath];
  });
  after(() => {
    stubCreateRoutingFunction.restore();
  });

  describe('Routerの中身を確認', () => {
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
      app = express();
      const router = require('../../src/routes/json').default;
      app.use(router);
    });
    it('/', (done) => {
      assert.ok(stubCreateRoutingFunction.calledTwice);
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.text, 'fake json');
          done();
        });
    });
    it('/yahoo', (done) => {
      assert.ok(stubCreateRoutingFunction.calledTwice);
      assert.deepStrictEqual(stubCreateRoutingFunction.secondCall.args, [ Yahoo ]);
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
});
