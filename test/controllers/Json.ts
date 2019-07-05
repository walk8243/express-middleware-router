import { fake, stub, SinonStub } from 'sinon';
import * as assert from 'assert';
import { mockReq, mockRes } from 'sinon-express-mock';
import { Response, Request } from 'express';
import { Json, Yahoo } from '../../src/controllers/Json';
import Random from '../../src/utils/Random';
import Site from '../../src/models/Site';

describe('contoller/Json', () => {
  describe('run', () => {
    let jsonController!: Json;
    let req!: mockReq.MockReq & Request;
    let res!: mockRes.MockRes & Response;
    let stubRandomGetString!: SinonStub;
    const dummyRandomString = 'xxxxx';
    before(() => {
      req = mockReq();
      res = mockRes();
      stubRandomGetString = stub(Random, 'getString');
    });
    beforeEach(() => {
      jsonController = new Json(req, res);
      stubRandomGetString.reset();
      stubRandomGetString.callsFake(fake()).returns(dummyRandomString);
    });
    after(() => {
      stubRandomGetString.restore();
    });

    it('正常系', async () => {
      await jsonController.run();
      assert.deepEqual(res.locals, { json: { key: dummyRandomString } });
    });
    it('異常系', async () => {
      stubRandomGetString.throws(new Error('Random.getString Error'));
      try {
        await jsonController.run();
        assert.fail();
      } catch(err) {
        assert.equal(err.message, 'Random.getString Error');
      }
    })
  });
});

describe('contoller/Yahoo', () => {
  describe('run', () => {
    let yahooController!: Yahoo;
    let req!: mockReq.MockReq & Request;
    let res!: mockRes.MockRes & Response;
    let stubSiteGetName!: SinonStub;
    let stubSiteGetUrl!: SinonStub;
    const dummySiteName = 'name';
    const dummySiteUrl = 'url';
    before(() => {
      req = mockReq();
      res = mockRes();
      stubSiteGetName = stub(Site.prototype, 'getName');
      stubSiteGetUrl = stub(Site.prototype, 'getUrl');
    });
    beforeEach(() => {
      yahooController = new Yahoo(req, res);
      stubSiteGetName.reset();
      stubSiteGetUrl.reset();
      stubSiteGetName.callsFake(fake()).returns(dummySiteName);
      stubSiteGetUrl.callsFake(fake()).returns(dummySiteUrl);
    });
    after(() => {
      stubSiteGetName.restore();
      stubSiteGetUrl.restore();
    });

    it('正常系', async () => {
      await yahooController.run();
      assert.deepEqual(res.locals, { json: { site: { name: dummySiteName, url: dummySiteUrl } } });
      assert.ok(stubSiteGetName.calledOnce);
      assert.ok(stubSiteGetUrl.calledOnce);
      assert.ok(stubSiteGetName.calledBefore(stubSiteGetUrl));
    });
    it('異常系', async () => {
      stubSiteGetName.throws(new Error('Site.getName Error'));
      try {
        await yahooController.run();
        assert.fail();
      } catch(err) {
        assert.equal(err.message, 'Site.getName Error');
      }
    })
  });
});
