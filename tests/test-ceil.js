import { expect } from 'chai';
import ceil from '../src/ceil.js';

describe('ceil function', () => {
  it('should round up a decimal number to the nearest integer', () => {
    expect(ceil(4.006)).to.equal(5);
  });

  it('should round up a decimal number to a specified precision', () => {
    expect(ceil(6.004, 2)).to.equal(6.01);
  });

  it('should round up a large number to a specified precision', () => {
    expect(ceil(6040, -2)).to.equal(6100);
  });

  it('should default to rounding up to 0 precision if precision is not provided', () => {
    expect(ceil(4.006)).to.equal(5);
  });
});
