// Tests for map.js:
import map from '../src/map.js';
import chai from 'chai';

var expect = chai.expect;

describe("map.js should handle", () => {
    describe("valid inputs", () => {
        var testCases = [
            { array: [1, 2, 3], iteratee: (n) => n * n, expected: [1, 4, 9] },
            { array: [1, 2, 3], iteratee: (n) => n + 1, expected: [2, 3, 4] },
            { array: [1, 2, 3], iteratee: (n) => n * 2, expected: [2, 4, 6] },
            { array: [1, 2, 3], iteratee: (n) => n / 2, expected: [0.5, 1, 1.5] },
        ]

        testCases.forEach((testCase) => {
            it(`array: ${testCase.array}, iteratee: ${testCase.iteratee}`, () => {
                expect(map(testCase.array, testCase.iteratee)).to.deep.equal(testCase.expected);
            });
        });
    });

    describe("null & undef. arrays", () => {
        it("with undefined iteratee (undef. array)", () => {
            expect(map(undefined, undefined)).to.deep.equal([]);
        });

        it("with null iteratee (undef. array)", () => {
            expect(map(undefined, null)).to.deep.equal([]);
        });

        it("with empty iteratee (undef. array)", () => {
            expect(map(undefined, () => {})).to.deep.equal([]);
        });

        it("with iteratee (undef. array)", () => {
            expect(map(undefined, (n) => n * n)).to.deep.equal([]);
        });

        it("with undefined iteratee (null array)", () => {
            expect(map(null, undefined)).to.deep.equal([]);
        });

        it("with null iteratee (null array)", () => {
            expect(map(null, null)).to.deep.equal([]);
        });

        it("with empty iteratee (null array)", () => {
            expect(map(null, () => {})).to.deep.equal([]);
        });

        it("with iteratee (null array)", () => {
            expect(map(null, (n) => n * n)).to.deep.equal([]);
        });
    });

    describe("empty arrays", () => {
        it("with undefined iteratee", () => {
            expect(map([], undefined)).to.deep.equal([]);
        });

        it("with null iteratee", () => {
            expect(map([], null)).to.deep.equal([]);
        });

        it("with empty iteratee", () => {
            expect(map([], () => {})).to.deep.equal([]);
        });

        it("with iteratee", () => {
            expect(map([], (n) => n * n)).to.deep.equal([]);
        });
    });

    describe("mapping to same values", () => {
        it("with undefined iteratee", () => {
            expect(map([1, 2, 3], undefined)).to.deep.equal([1, 2, 3]);
        });

        it("with null iteratee", () => {
            expect(map([1, 2, 3], null)).to.deep.equal([1, 2, 3]);
        });

        it("with empty iteratee", () => {
            expect(map([1, 2, 3], () => {})).to.deep.equal([1, 2, 3]);
        });

        it("with iteratee", () => {
            expect(map([1, 2, 3], (n) => n)).to.deep.equal([1, 2, 3]);
        });

        it("with a map of duplicate values", () => {
            expect(map([1, 1, 1], (n) => n)).to.deep.equal([1, 1, 1]);
        });
    });

    describe("mapping to different values", () => {
        it("with undefined iteratee", () => {
            expect(map([1, 2, 3], undefined)).to.deep.equal([1, 2, 3]);
        });

        it("with null iteratee", () => {
            expect(map([1, 2, 3], null)).to.deep.equal([1, 2, 3]);
        });

        it("with empty iteratee", () => {
            expect(map([1, 2, 3], () => {})).to.deep.equal([1, 2, 3]);
        });

        it("with iteratee", () => {
            expect(map([1, 2, 3], (n) => n * n)).to.deep.equal([1, 4, 9]);
        });

        it("with a map of duplicate values", () => {
            expect(map([1, 1, 1], (n) => n * n)).to.deep.equal([1, 1, 1]);
        });
    });

    describe("use of index and original array", () => {
        it("with iteratee", () => {
            expect(map([1, 2, 3], (n, i, a) => n * i * a[0])).to.deep.equal([0, 2, 6]);
        });

        it("with a map of duplicate values", () => {
            expect(map([1, 1, 1], (n, i, a) => n * i * a[0])).to.deep.equal([0, 1, 2]);
        });
    });

    describe("use of stateless iteratee function", () => {
        function square(n) {
            return n * n;
        }

        function squareRoot(n) {
            return Math.sqrt(n);
        }

        it("with iteratee (square)", () => {
            expect(map([1, 2, 3], square)).to.deep.equal([1, 4, 9]);
        });

        it("with iteratee (squareRoot)", () => {
            expect(map([1, 4, 9], squareRoot)).to.deep.equal([1, 2, 3]);
        });
    });

    describe("use of external state in iteratee function", () => {
        var state = 0;

        function addState(n) {
            state += n;
            return state;
        }

        it("with iteratee", () => {
            expect(map([1, 2, 3], addState)).to.deep.equal([1, 3, 6]);
        });

        it("with a map of duplicate values (continuing from prev. state)", () => {
            expect(map([1, 1, 1], addState)).to.deep.equal([7, 8, 9]);
        });
    });

    describe("arrays with different types", () => {
        it("with iteratee (sum with element itself)", () => {
            expect(map([1, 'two', { three: 3 }], (n) => n + n)).to.deep.equal([2, 'twotwo', '[object Object][object Object]']);
        });

        it("with iteratee (multiplied with element itself)", () => {
            expect(map([1, 'two', { three: 3 }], (n) => n * n)).to.deep.equal([1, NaN, NaN]);
        });
    });

    describe("large arrays", () => {
        it("with iteratee", () => {
            expect(map(Array(1000000).fill(2), (n) => n * n)).to.deep.equal(Array(1000000).fill(4));
        });

        it("with a map of duplicate values", () => {
            expect(map(Array(1000000).fill(1), (n) => n * n)).to.deep.equal(Array(1000000).fill(1));
        });
    });
});
