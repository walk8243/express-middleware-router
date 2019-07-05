import { fake, stub, SinonStub } from 'sinon';
import * as assert from 'assert';
import Random from '../../src/utils/Random';

describe('utils/Random', () => {
  describe('getString', () => {
    let stubMathRandom!: SinonStub;
    before(() => {
      stubMathRandom = stub(Math, 'random');
    });
    beforeEach(() => {
      stubMathRandom.reset();
      stubMathRandom.callsFake(fake());
    });
    after(() => {
      stubMathRandom.restore();
    });
    it('正常系', () => {
      const length = 10;
      for(let i=0; i<length; i++) {
        stubMathRandom.onCall(i).returns(i * 0.1);
      }
      assert.equal(Random.getString(length), 'AGMSYflrx3');
    });
    it('異常系', () => {
      stubMathRandom.throws(new Error('Math.random Error'));
      try {
        Random.getString(10);
        assert.fail();
      } catch(err) {
        assert.equal(err.message, 'Math.random Error');
      }
    });
  });
});
