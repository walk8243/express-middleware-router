// import { fake, stub, SinonStub } from 'sinon';
import * as assert from 'assert';
import { mockReq, mockRes } from 'sinon-express-mock';
import { Response, Request } from 'express';
import BaseController from '../../src/controllers/Base';

describe('controllers/Base', () => {
  describe('constructor', () => {
    let req!: Request;
    let res!: Response;
    beforeEach(() => {
      req = mockReq();
      res = mockRes();
    });

    it('正常系', () => {
      const controller = new BaseController(req, res);
      assert.ok(controller.hasOwnProperty('req'));
      assert.ok(controller.hasOwnProperty('res'));
    });
  });

  describe('run', () => {
    let controller!: BaseController;
    let req!: Request;
    let res!: Response;
    before(() => {
      req = mockReq();
      res = mockRes();
    });
    beforeEach(() => {
      controller = new BaseController(req, res);
    });

    it('正常系', async () => {
      await controller.run();
    });
  });
});
