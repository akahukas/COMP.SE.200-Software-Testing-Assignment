// Tests for ceil.js:
import ceil from '../src/ceil.js';
import chai from 'chai';

var expect = chai.expect;

describe("ceil.js should handle", () => {
    describe("positive precision", () => {
        var precision = 2;

        it("for a positive number", () => {
            expect(ceil(1234.56789, precision)).to.equal(1234.57);
        });

        it("for a negative number", () => {
            expect(ceil(-1234.56789, precision)).to.equal(-1234.56);
        });

        it("for zero", () => {
            expect(ceil(0, precision)).to.equal(0);
        });

        it("for Infinity", () => {
            expect(ceil(Infinity, precision)).to.equal(Infinity);
        });

        it("for -Infinity", () => {
            expect(ceil(-Infinity, precision)).to.equal(-Infinity);
        });

        it("for NaN", () => {
            expect(ceil(NaN, precision)).to.be.NaN;
        });

        it("for null (default to zero)", () => {
            expect(ceil(null, precision)).to.equal(0);
        });

        it("for undefined (resulting in NaN)", () => {
            expect(ceil(undefined, precision)).to.be.NaN;
        });

        it("for strings (parsed as numbers)", () => {
            expect(ceil("1234.56789", precision)).to.equal(1234.57);
        });
    });

    describe("negative precision", () => {
        var precision = -2;

        it("for a positive number", () => {
            expect(ceil(1234.56789, precision)).to.equal(1300);
        });

        it("for a negative number", () => {
            expect(ceil(-1234.56789, precision)).to.equal(-1200);
        });

        it("for zero", () => {
            expect(ceil(0, precision)).to.equal(0);
        });

        it("for Infinity", () => {
            expect(ceil(Infinity, precision)).to.equal(Infinity);
        });

        it("for -Infinity", () => {
            expect(ceil(-Infinity, precision)).to.equal(-Infinity);
        });

        it("for NaN", () => {
            expect(ceil(NaN, precision)).to.be.NaN;
        });

        it("for null (default to zero)", () => {
            expect(ceil(null, precision)).to.equal(0);
        });

        it("for undefined (resulting in NaN)", () => {
            expect(ceil(undefined, precision)).to.be.NaN;
        });

        it("for strings (parsed as numbers)", () => {
            expect(ceil("1234.56789", precision)).to.equal(1300);
        });
    });

    describe("zero precision", () => {
        var precision = 0;

        it("for a positive number", () => {
            expect(ceil(1234.56789, precision)).to.equal(1235);
        });

        it("for a negative number", () => {
            expect(ceil(-1234.56789, precision)).to.equal(-1234);
        });

        it("for zero", () => {
            expect(ceil(0, precision)).to.equal(0);
        });

        it("for Infinity", () => {
            expect(ceil(Infinity, precision)).to.equal(Infinity);
        });

        it("for -Infinity", () => {
            expect(ceil(-Infinity, precision)).to.equal(-Infinity);
        });

        it("for NaN", () => {
            expect(ceil(NaN, precision)).to.be.NaN;
        });

        it("for null (default to zero)", () => {
            expect(ceil(null, precision)).to.equal(0);
        });

        it("for undefined (resulting in NaN)", () => {
            expect(ceil(undefined, precision)).to.be.NaN;
        });

        it("for strings (parsed as numbers)", () => {
            expect(ceil("1234.56789", precision)).to.equal(1235);
        });
    });

    describe("default precision", () => {
        it("for a positive number", () => {
            expect(ceil(1234.56789)).to.equal(1235);
        });

        it("for a negative number", () => {
            expect(ceil(-1234.56789)).to.equal(-1234);
        });

        it("for zero", () => {
            expect(ceil(0)).to.equal(0);
        });

        it("for Infinity", () => {
            expect(ceil(Infinity)).to.equal(Infinity);
        });

        it("for -Infinity", () => {
            expect(ceil(-Infinity)).to.equal(-Infinity);
        });

        it("for NaN", () => {
            expect(ceil(NaN)).to.be.NaN;
        });

        it("for null (default to zero)", () => {
            expect(ceil(null)).to.equal(0);
        });

        it("for undefined (resulting in NaN)", () => {
            expect(ceil(undefined)).to.be.NaN;
        });

        it("for strings (parsed as numbers)", () => {
            expect(ceil("1234.56789")).to.equal(1235);
        });
    });

    describe("large values", () => {
        it("for a positive number", () => {
            expect(ceil(1.2345e10 + 0.1234)).to.equal(1.2345e10 + 1);
        });

        it("for a negative number", () => {
            expect(ceil(-1.2345e10 - 0.1234)).to.equal(-1.2345e10);
        });
        
        it("for a positive number with precision", () => {
            expect(ceil(1.2345e10 + 0.1234, 2)).to.equal(1.2345e10 + 0.13);
        });

        it("for a negative number with precision", () => {
            expect(ceil(-1.2345e10 - 0.1234, 2)).to.equal(-1.2345e10 - 0.12);
        });

        it("for a positive number with negative precision", () => {
            expect(ceil(1.2345e10 + 0.1234, -2)).to.equal(1.2345e10 + 100);
        });

        it("for a negative number with negative precision", () => {
            expect(ceil(-1.2345e10 - 0.1234, -2)).to.equal(-1.2345e10);
        });

        it("for a positive number with zero precision", () => {
            expect(ceil(1.2345e10 + 0.1234, 0)).to.equal(1.2345e10 + 1);
        });

        it("for a negative number with zero precision", () => {
            expect(ceil(-1.2345e10 - 0.1234, 0)).to.equal(-1.2345e10);
        });

        it("for a positive number with precision 300 (limited by function)", () => {
            expect(ceil(1.2345e10 + 0.1234, 300)).to.equal(1.2345e10 + 0.1234);
        });
    
        it("for a negative number with precision 300 (limited by function)", () => {
            expect(ceil(-1.2345e10 - 0.1234, 300)).to.equal(-1.2345e10 - 0.1234);
        });
    
        it("for a positive number with precision -300 (limited by function)", () => {
            expect(ceil(1.2345e10 + 0.1234, -300)).to.equal(Infinity);
        });
    
        it("for a negative number with precision -300 (limited by function)", () => {
            expect(ceil(-1.2345e10 - 0.1234, -300)).to.equal(-Infinity);
        })
    });

    describe("integers", () => {
        it("for a positive number", () => {
            expect(ceil(12345)).to.equal(12345);
        });

        it("for a negative number", () => {
            expect(ceil(-12345)).to.equal(-12345);
        });

        it("for a positive number with precision", () => {
            expect(ceil(12345, 2)).to.equal(12345);
        });

        it("for a negative number with precision", () => {
            expect(ceil(-12345, 2)).to.equal(-12345);
        });

        it("for a positive number with negative precision", () => {
            expect(ceil(12345, -2)).to.equal(12400);
        });

        it("for a negative number with negative precision", () => {
            expect(ceil(-12345, -2)).to.equal(-12300);
        });

        it("for a positive number with zero precision", () => {
            expect(ceil(12345, 0)).to.equal(12345);
        });

        it("for a negative number with zero precision", () => {
            expect(ceil(-12345, 0)).to.equal(-12345);
        });

        it("for a positive number with precision 300 (limited by function)", () => {
            expect(ceil(12345, 300)).to.equal(12345);
        });

        it("for a negative number with precision 300 (limited by function)", () => {
            expect(ceil(-12345, 300)).to.equal(-12345);
        });

        it("for a positive number with precision -300 (limited by function)", () => {
            expect(ceil(12345, -300)).to.equal(Infinity);
        });

        it("for a negative number with precision -300 (limited by function)", () => {
            expect(ceil(-12345, -300)).to.equal(Infinity);
        });
    });
});
