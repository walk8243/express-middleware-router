import { fake, stub, SinonStub } from 'sinon';
import * as assert from 'assert';
import request from 'supertest';
import { default as express, Response, Request, NextFunction } from 'express';
import path from 'path';
import * as baseRoutes from '../../src/routes/base';
import { Index } from '../../src/controllers/Index';

describe('routes/index', () => {
  let stubCreateRoutingFunction!: SinonStub;
  const routesIndexPath = path.resolve(__dirname, '../../src/routes/index.ts');
  before(() => {
    stubCreateRoutingFunction = stub(baseRoutes, 'default');
  });
  beforeEach(() => {
    stubCreateRoutingFunction.reset();
    stubCreateRoutingFunction.callsFake(fake()).returns(fake((req: Request, res: Response, next: NextFunction) => { res.end('fake'); }));
    delete require.cache[routesIndexPath];
  });
  after(() => {
    stubCreateRoutingFunction.restore();
  });

  describe('Routerの中身を確認', () => {
    it('正常系', () => {
      require('../../src/routes/index');
      assert.ok(stubCreateRoutingFunction.calledOnce);
      assert.deepStrictEqual(stubCreateRoutingFunction.firstCall.args, [ Index, false ]);
    });
  });
  describe('Routing確認', () => {
    let app!: express.Application;
    beforeEach(() => {
      app = express();
      const router = require('../../src/routes/index').default;
      app.use(router);
    });
    it('Routing確認', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.text, 'fake');
          done();
        });
    });
  });
});
