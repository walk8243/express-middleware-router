import { fake } from 'sinon';
import * as assert from 'assert';
import { mockReq, mockRes } from 'sinon-express-mock';
import { Response, Request } from 'express';
import { Index } from '../../src/controllers/Index';

describe('contoller/Index', () => {
  describe('run', () => {
    let indexController!: Index;
    let req!: mockReq.MockReq & Request;
    let res!: mockRes.MockRes & Response;
    before(() => {
      req = mockReq();
      res = mockRes();
    });
    beforeEach(() => {
      res.send.reset();
      res.send.callsFake(fake());
      indexController = new Index(req, res);
    });

    it('正常系', async () => {
      await indexController.run();
      assert.ok(res.send.calledOnce);
      assert.deepEqual(res.send.firstCall.args, [ 'index' ]);
    });
    it('異常系', async () => {
      res.send.throws(new Error('res.send Error'));
      try {
        await indexController.run();
        assert.fail();
      } catch(err) {
        assert.equal(err.message, 'res.send Error');
      }
    })
  });
});
