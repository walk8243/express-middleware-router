import { fake, stub, SinonStub } from 'sinon';
import * as assert from 'assert';
import Site from '../../src/models/Site';

describe('models/Site', () => {
  describe('constructor', () => {
    let stubSetName!: SinonStub;
    let stubSetUrl!: SinonStub;
    const dummyName = 'name';
    const dummyUrl = 'url';
    before(() => {
      stubSetName = stub(Site.prototype, 'setName');
      stubSetUrl = stub(Site.prototype, 'setUrl');
    });
    beforeEach(() => {
      stubSetName.reset();
      stubSetUrl.reset();
      stubSetName.callsFake(fake());
      stubSetUrl.callsFake(fake());
    });
    after(() => {
      stubSetName.restore();
      stubSetUrl.restore();
    });
    it('正常系', () => {
      new Site(dummyName, dummyUrl);
      assert.ok(stubSetName.calledOnce);
      assert.ok(stubSetUrl.calledOnce);
      assert.ok(stubSetName.calledBefore(stubSetUrl));
      assert.deepEqual(stubSetName.firstCall.args, [ dummyName ]);
      assert.deepEqual(stubSetUrl.firstCall.args, [ dummyUrl ]);
    });
    it('異常系', () => {
      stubSetName.throws(new Error('setName Error'));
      try {
        new Site(dummyName, dummyUrl);
        assert.fail();
      } catch(err) {
        assert.equal(err.message, 'setName Error');
        assert.ok(stubSetName.calledOnce);
        assert.ok(stubSetUrl.notCalled);
      }
    });
  });

  describe('getter/setter', () => {
    const dummyName = 'name';
    const dummyUrl = 'url';
    describe('name', () => {
      let site!: Site;
      let stubSetUrl!: SinonStub;
      before(() => {
        stubSetUrl = stub(Site.prototype, 'setUrl');
      });
      beforeEach(() => {
        stubSetUrl.reset();
        stubSetUrl.callsFake(fake());
        site = new Site(dummyName, dummyUrl);
      });
      after(() => {
        stubSetUrl.restore();
      });
      it('正常系', () => {
        const dummyNames = [ 'dummy', '123' ];
        for(const dummy of dummyNames) {
          site.setName(dummy);
          assert.equal(site.getName(), dummy, `Error in '${dummy}'`);
        }
      });
    });
    describe('url', () => {
      let site!: Site;
      let stubSetName!: SinonStub;
      before(() => {
        stubSetName = stub(Site.prototype, 'setName');
      });
      beforeEach(() => {
        stubSetName.reset();
        stubSetName.callsFake(fake());
        site = new Site(dummyName, dummyUrl);
      });
      after(() => {
        stubSetName.restore();
      });
      it('正常系', () => {
        const dummyNames = [ 'dummy', 'https://yahoo.co.jp', 'https://google.co.jp' ];
        for(const dummy of dummyNames) {
          site.setUrl(dummy);
          assert.equal(site.getUrl(), dummy, `Error in '${dummy}'`);
        }
      });
    });
  });
});
