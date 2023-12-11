// every tests
import every from '../src/every.js';
import chai from 'chai';

var expect = chai.expect;

describe('every function', () => {
  it('should return true for an empty array', () => {
    const result = every([], () => {});
    expect(result).to.equal(true);
  });

  it('should return true if all elements pass the predicate check', () => {
    const result = every([true, 1, 'yes'], Boolean);
    expect(result).to.equal(true);
  });

  it('should return false if any element fails the predicate check', () => {
    const result = every([true, 1, null, 'yes'], Boolean);
    expect(result).to.equal(false);
  });

  it('should iterate over all elements and pass value, index, and array to the predicate', () => {
    const array = ['a', 'b', 'c'];
    const result = every(array, (value, index, arr) => {
      expect(arr).to.equal(array);
      return typeof value === 'string' && index < 3;
    });
    expect(result).to.equal(true);
  });

  it('should return true if all elements are truthy (vacuous truth)', () => {
    const result = every([true, 1, 'yes', {}, []], Boolean);
    expect(result).to.equal(true);
  });

  it('should return false if the array is null or undefined', () => {
    const result1 = every(null, Boolean);
    const result2 = every(undefined, Boolean);
    expect(result1).to.equal(false);
    expect(result2).to.equal(false);
  });
});
