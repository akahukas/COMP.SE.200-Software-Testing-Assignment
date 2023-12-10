// upperfirst tests
import upperFirst from '../src/upperFirst.js';
import chai from 'chai';

var expect = chai.expect;

describe('upperFirst function', () => {
  it('should convert the first character of a lowercase string to uppercase', () => {
    const result = upperFirst('fred');
    expect(result).to.equal('Fred');
  });

  it('should not change the case of the first character of an already uppercase string', () => {
    const result = upperFirst('FRED');
    expect(result).to.equal('FRED');
  });

  it('should handle an empty string', () => {
    const result = upperFirst('');
    expect(result).to.equal('');
  });

  it('should handle a string with only one character', () => {
    const result = upperFirst('a');
    expect(result).to.equal('A');
  });

  it('should handle a string with whitespace at the beginning', () => {
    const result = upperFirst('  hello');
    expect(result).to.equal('  Hello');
  });

  it('should handle a string with whitespace at the end', () => {
    const result = upperFirst('world  ');
    expect(result).to.equal('World  ');
  });

  it('should handle a string with whitespace at both ends', () => {
    const result = upperFirst('  example  ');
    expect(result).to.equal('  Example  ');
  });
});
