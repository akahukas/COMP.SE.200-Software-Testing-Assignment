// eq tests
import eq from '../src/eq.js';
import chai from 'chai';

var expect = chai.expect;

describe('eq function', () => {
  it('should return true for same values', () => {
    const object = { 'a': 1 };
    const result = eq(object, object);
    expect(result).to.equal(true);
  });
  
  it('should return false for different objects with the same content', () => {
    const object1 = { 'a': 1 };
    const object2 = { 'a': 1 };
    const result = eq(object1, object2);
    expect(result).to.equal(false);
  });

  it('should return true for equal primitive values', () => {
    const result = eq('a', 'a');
    expect(result).to.equal(true);
  });

  it('should return false for different primitive values', () => {
    const result = eq('a', Object('a'));
    expect(result).to.equal(false);
  });

  it('should return true for NaN values', () => {
    const result = eq(NaN, NaN);
    expect(result).to.equal(true);
  });

  it('should return false for different values', () => {
    const result = eq(42, '42');
    expect(result).to.equal(false);
  });
});

