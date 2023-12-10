// toNumber tests
import toNumber from '../src/toNumber.js';
import chai from 'chai';

var expect = chai.expect;



describe('toNumber function', () => {
  it('should convert a positive integer to a number', () => {
    const result = toNumber(42);
    expect(result).to.equal(42);
  });

  it('should convert a positive floating-point number to a number', () => {
    const result = toNumber(3.14);
    expect(result).to.equal(3.14);
  });

  it('should convert Number.MIN_VALUE to a number', () => {
    const result = toNumber(Number.MIN_VALUE);
    expect(result).to.equal(5e-324);
  });

  it('should convert Infinity to a number', () => {
    const result = toNumber(Infinity);
    expect(result).to.equal(Infinity);
  });

  it('should convert a numeric string to a number', () => {
    const result = toNumber('3.14');
    expect(result).to.equal(3.14);
  });

  it('should convert a string with leading and trailing whitespace to a number', () => {
    const result = toNumber(' 42 ');
    expect(result).to.equal(42);
  });

  it('should convert a binary string to a number', () => {
    const result = toNumber('0b1101');
    expect(result).to.equal(13);
  });

  it('should convert an octal string to a number', () => {
    const result = toNumber('0o77');
    expect(result).to.equal(63);
  });

  it('should return NaN for a bad hexadecimal string', () => {
    const result = toNumber('-0x1g');
    expect(isNaN(result)).to.equal(true);
  });

  it('should return NaN for a symbol input', () => {
    const result = toNumber(Symbol('test'));
    expect(isNaN(result)).to.equal(true);
  });

  it('should return the input value for non-string, non-number inputs', () => {
    const result = toNumber(null);
    expect(result).to.equal(null);
  });
});

