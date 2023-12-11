// Tests for clamp.js:
import clamp from '../src/clamp.js';
import chai from 'chai';

var expect = chai.expect;

describe("clamp.js should handle", () => {
    describe("numbers above upper bound", () => {
        var testCases = [
            { number: 10, lower: -5, upper: 5, expected: 5 },
            { number: 1000, lower: -5, upper: 99, expected: 99 },
            { number: Infinity, lower: -5, upper: 1234, expected: 1234 },
        ]

        testCases.forEach((testCase) => {
            it(`number: ${testCase.number}, lower: ${testCase.lower}, upper: ${testCase.upper}`, () => {
                expect(clamp(testCase.number, testCase.lower, testCase.upper)).to.equal(testCase.expected);
            });
        });
    });

    describe("numbers between range", () => {
        var testCases = [
            { number: -4, lower: -5, upper: 5, expected: -4 },
            { number: 0, lower: -5, upper: 99, expected: 0 },
            { number: 123, lower: -5, upper: 1234, expected: 123 },
            { number: 0, lower: -Infinity, upper: Infinity, expected: 0 },
        ]

        testCases.forEach((testCase) => {
            it(`number: ${testCase.number}, lower: ${testCase.lower}, upper: ${testCase.upper}`, () => {
                expect(clamp(testCase.number, testCase.lower, testCase.upper)).to.equal(testCase.expected);
            });
        });
    });

    describe("numbers below lower bound", () => {
        var testCases = [
            { number: -10, lower: -5, upper: 5, expected: -5 },
            { number: -1000, lower: -5, upper: 99, expected: -5 },
            { number: -Infinity, lower: -5, upper: 1234, expected: -5 },
        ]

        testCases.forEach((testCase) => {
            it(`number: ${testCase.number}, lower: ${testCase.lower}, upper: ${testCase.upper}`, () => {
                expect(clamp(testCase.number, testCase.lower, testCase.upper)).to.equal(testCase.expected);
            });
        });
    });

    describe("NaN values", () => {
        var testCases = [
            { number: NaN, lower: -5, upper: 5, expected: NaN },
            { number: NaN, lower: -Infinity, upper: Infinity, expected: NaN },
            { number: NaN, lower: NaN, upper: NaN, expected: NaN },
        ]

        testCases.forEach((testCase) => {
            it(`number: ${testCase.number}, lower: ${testCase.lower}, upper: ${testCase.upper}`, () => {
                expect(clamp(testCase.number, testCase.lower, testCase.upper)).to.be.NaN;
            });
        });
    });

    describe("null values", () => {
        var testCases = [
            { number: null, lower: -5, upper: 5, expected: 0 },
            { number: null, lower: -Infinity, upper: Infinity, expected: 0 },
            { number: null, lower: null, upper: null, expected: 0 },
        ]

        testCases.forEach((testCase) => {
            it(`number: ${testCase.number}, lower: ${testCase.lower}, upper: ${testCase.upper}`, () => {
                expect(clamp(testCase.number, testCase.lower, testCase.upper)).to.equal(testCase.expected);
            });
        });
    });

    describe("undefined values", () => {
        var testCases = [
            { number: undefined, lower: -5, upper: 5, expected: NaN },
            { number: undefined, lower: -Infinity, upper: Infinity, expected: NaN },
            { number: undefined, lower: undefined, upper: undefined, expected: NaN },
        ]

        testCases.forEach((testCase) => {
            it(`number: ${testCase.number}, lower: ${testCase.lower}, upper: ${testCase.upper}`, () => {
                expect(clamp(testCase.number, testCase.lower, testCase.upper)).to.be.NaN;
            });
        });
    });

    describe("equal bounds", () => {
        var testCases = [
            { number: -5, lower: -5, upper: -5, expected: -5 },
            { number: 0, lower: 0, upper: 0, expected: 0 },
            { number: 5, lower: 5, upper: 5, expected: 5 },
            { number: Infinity, lower: Infinity, upper: Infinity, expected: Infinity },
            { number: -Infinity, lower: -Infinity, upper: -Infinity, expected: -Infinity },
            { number: NaN, lower: NaN, upper: NaN, expected: NaN },
            { number: null, lower: null, upper: null, expected: 0 },
            { number: undefined, lower: undefined, upper: undefined, expected: NaN },
        ]

        testCases.forEach((testCase) => {
            it(`number: ${testCase.number}, lower: ${testCase.lower}, upper: ${testCase.upper}`, () => {
                if (isNaN(testCase.expected)) {
                    const result = clamp(NaN, NaN, NaN);
                    expect(isNaN(result)).to.be.true;
                } else {
                    expect(clamp(testCase.number, testCase.lower, testCase.upper)).to.equal(testCase.expected);
                }

            });
        });
    });

    describe("decimal numbers", () => {
        var testCases = [
            { number: 1.234, lower: -5, upper: 5, expected: 1.234 },
            { number: 1.234, lower: -Infinity, upper: Infinity, expected: 1.234 },
            { number: 99.999, lower: 0, upper: 100, expected: 99.999 },
        ]

        testCases.forEach((testCase) => {
            it(`number: ${testCase.number}, lower: ${testCase.lower}, upper: ${testCase.upper}`, () => {
                expect(clamp(testCase.number, testCase.lower, testCase.upper)).to.equal(testCase.expected);
            });
        });
    });

    describe("decimal bounds", () => {
        var testCases = [
            { number: 1, lower: -5.5, upper: 5.5, expected: 1 },
            { number: 1, lower: -Infinity, upper: Infinity, expected: 1 },
            { number: 99, lower: 0, upper: 100.1, expected: 99 },
            { number: 100, lower: 0, upper: 100.00000000001, expected: 100 },
            { number: 101, lower: 0, upper: 100.00000000001, expected: 100.00000000001 },
            { number: 100.0000000000001, lower: 0, upper: 100, expected: 100 },
        ]

        testCases.forEach((testCase) => {
            it(`number: ${testCase.number}, lower: ${testCase.lower}, upper: ${testCase.upper}`, () => {
                expect(clamp(testCase.number, testCase.lower, testCase.upper)).to.equal(testCase.expected);
            });
        });
    });
});
