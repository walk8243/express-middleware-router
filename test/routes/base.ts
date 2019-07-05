import { fake, stub, SinonStub } from 'sinon';
import * as assert from 'assert';
import { mockReq, mockRes } from 'sinon-express-mock';
import { Response, Request } from 'express';
import createRoutingFunction from '../../src/routes/base';
import BaseController from '../../src/controllers/Base';

describe('routes/base', () => {
  describe('createRoutingFunction', () => {
    let stubBaseControllerRun!: SinonStub;
    let req!: mockReq.MockReq & Request;
    let res!: mockRes.MockRes & Response;
    const fakeNextFunc = fake();
    before(() => {
      req = mockReq();
      res = mockRes();
      stubBaseControllerRun = stub(BaseController.prototype, 'run');
    });
    beforeEach(() => {
      stubBaseControllerRun.reset();
      fakeNextFunc.resetHistory();
      stubBaseControllerRun.callsFake(fake()).resolves();
    });
    after(() => {
      stubBaseControllerRun.restore();
    });
    it('isNextなし', async () => {
      const routingFunc = createRoutingFunction(BaseController);
      await routingFunc(req, res, fakeNextFunc);
      assert.ok(stubBaseControllerRun.calledOnce);
      assert.ok(fakeNextFunc.calledOnce);
      assert.ok(stubBaseControllerRun.calledBefore(fakeNextFunc));
    });
    it('isNextにtrue', async () => {
      const routingFunc = createRoutingFunction(BaseController, true);
      await routingFunc(req, res, fakeNextFunc);
      assert.ok(stubBaseControllerRun.calledOnce);
      assert.ok(fakeNextFunc.calledOnce);
      assert.ok(stubBaseControllerRun.calledBefore(fakeNextFunc));
    });
    it('isNextにfalse', async () => {
      const routingFunc = createRoutingFunction(BaseController, false);
      await routingFunc(req, res, fakeNextFunc);
      assert.ok(stubBaseControllerRun.calledOnce);
      assert.ok(fakeNextFunc.notCalled);
    });
  })
});
