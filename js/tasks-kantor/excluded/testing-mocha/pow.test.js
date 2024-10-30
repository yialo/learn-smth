'use strict';

describe('pow', () => {
  describe('Corner-cases', () => {
    it('should return NaN for negative power indexes', () => {
      assert.isNaN(pow(4, -2));
    })
    it('returns NaN for fractional power indexes', () => {
      assert.isNaN(pow(6, 1.5));
    });
  });

  describe('Exponentiate x to power of index 3', () => {
    function makeTest(x) {
      let expected = x * x * x;

      it(`should exponentiate ${x} to power of index 3 with result ${expected}`, () => {
        assert.strictEqual(pow(x, 3), expected);
      });
    }

    for (let i = 1; i <= 5; i++) {
      makeTest(i);
    }
  });
});
