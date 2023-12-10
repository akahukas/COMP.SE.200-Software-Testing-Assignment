// defaultToAny tests
import defaultToAny from '../src/defaultToAny.js';
import chai from 'chai';

var expect = chai.expect;

describe('defaultToAny', () => {
  it('should return the original value if it is not NaN, null, or undefined', () => {
    expect(defaultToAny(1, 10, 20)).to.equal(1);
    expect(defaultToAny('hello', null, undefined)).to.equal('hello');
    expect(defaultToAny(true, false, null, undefined)).to.equal(true);
  });

  it('should return the first default value that is not NaN, null, or undefined if the original value is NaN', () => {
    expect(defaultToAny(NaN, 10, 20)).to.equal(10);
    expect(defaultToAny(NaN, null, 20)).to.equal(20);
    expect(defaultToAny(NaN, null, undefined)).to.be.undefined;
  });

  it('should return the first default value that is not NaN, null, or undefined if the original value is null', () => {
    expect(defaultToAny(null, 10, 20)).to.equal(10);
    expect(defaultToAny(null, undefined, 20)).to.equal(20);
    expect(defaultToAny(null, undefined, NaN)).to.be.NaN;
  });

  it('should return the first default value that is not NaN, null, or undefined if the original value is undefined', () => {
    expect(defaultToAny(undefined, 10, 20)).to.equal(10);
    expect(defaultToAny(undefined, null, 20)).to.equal(20);
    expect(defaultToAny(undefined, null, NaN)).to.be.NaN;
  });

  it('should return undefined if no valid default value is provided', () => {
    expect(defaultToAny(undefined, null, NaN)).to.be.NaN;
    expect(defaultToAny(null, undefined, NaN)).to.be.NaN;
    expect(defaultToAny(NaN, undefined, null)).to.be.undefined;
  });
});