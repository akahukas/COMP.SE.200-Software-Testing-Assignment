// Tests for filter.js:
import filter from '../src/filter.js';
import chai from 'chai';

var expect = chai.expect;

describe("filter.js should handle", () => {
    describe("empty arrays", () => {
        it("with empty predicate", () => {
            expect(filter([], () => true)).to.deep.equal([]);
        });

        it("with non-empty predicate", () => {
            expect(filter([], () => false)).to.deep.equal([]);
        });

        it("with null predicate", () => {
            expect(filter([], null)).to.deep.equal([]);
        });

        it("with undefined predicate", () => {
            expect(filter([], undefined)).to.deep.equal([]);
        });
    });

    describe("non-empty arrays with truthy predicate", () => {
        it("when filtering all values", () => {
            expect(filter([1, 2, 3], () => true)).to.deep.equal([1, 2, 3]);
        });

        it("when filtering some values", () => {
            expect(filter([1, 2, 3], (x) => x > 1)).to.deep.equal([2, 3]);
        });

        it("when filtering no values", () => {
            expect(filter([1, 2, 3], () => false)).to.deep.equal([]);
        });

        it("when filtering all values (with null predicate)", () => {
            expect(filter([1, 2, 3], null)).to.deep.equal([1, 2, 3]);
        });

        it("when filtering all values (with undefined predicate)", () => {
            expect(filter([1, 2, 3], undefined)).to.deep.equal([1, 2, 3]);
        });
    });

    describe("non-empty arrays with falsy predicate", () => {
        it("when filtering all values", () => {
            expect(filter([1, 2, 3], (x) => x > 5)).to.deep.equal([]);
        });

        it("when filtering all values (with more complex predicate)", () => {
            expect(filter([1, 2, 3], (x) => x > 0 && x < 4)).to.deep.equal([1, 2, 3]);
        });
    });

    describe("array with objects and predicate using object properties", () => {
        var users = [
            { 'user': 'barney', 'active': true },
            { 'user': 'fred',   'active': false }
        ];

        var complexArray = [
            { 'a': 1, 'b': 2, 'c': 3 },
            { 'a': 4, 'b': 5, 'c': 6 }
        ];

        it("when filtering all values", () => {
            expect(filter(users, () => true)).to.deep.equal(users);
        });

        it("when filtering some values", () => {
            expect(filter(users, ({ active }) => active)).to.deep.equal([users[0]]);
        });

        it("when filtering no values", () => {
            expect(filter(users, () => false)).to.deep.equal([]);
        });

        it("when filtering complex values", () => {
            expect(filter(complexArray, (obj) => obj.a > 1)).to.deep.equal([{ 'a': 4, 'b': 5, 'c': 6 }]);
        });
    });

    describe("array with objects and predicate using index", () => {
        var users = [
            { 'user': 'barney', 'active': true },
            { 'user': 'fred',   'active': false }
        ];

        it("when filtering all values", () => {
            expect(filter(users, () => true)).to.deep.equal(users);
        });

        it("when filtering some values", () => {
            expect(filter(users, (_, index) => index === 1)).to.deep.equal([users[1]]);
        });

        it("when filtering no values", () => {
            expect(filter(users, () => false)).to.deep.equal([]);
        });
    });

    describe("array with mix of truthy and falsy predicate results", () => {
        it("when filtering all values", () => {
            expect(filter([1, 2, 3, 4], (x) => x % 5 === 0)).to.deep.equal([]);
        });

        it("when filtering some values", () => {
            expect(filter([1, 2, 3, 4], (x) => x % 2 === 1)).to.deep.equal([1, 3]);
        });
    });

    describe("array with null and undefined values", () => {
        it("when filtering all values", () => {
            expect(filter([null, undefined], () => true)).to.deep.equal([null, undefined]);
        });

        it("when filtering some values", () => {
            expect(filter([null, undefined], (x) => x === null)).to.deep.equal([null]);
        });

        it("when filtering no values", () => {
            expect(filter([null, undefined], () => false)).to.deep.equal([]);
        });

        it("when filtering non-null and null values", () => {
            expect(filter([1, null, 3, undefined, 5],
                            (x) => x !== null && x !== undefined)).to.deep.equal([1, 3, 5]);
        });
    });

    describe("arrays with various data types", () => {
        it("when filtering all values", () => {
            expect(filter([1, "2", true, null, undefined], () => true)).to.deep.equal([1, "2", true, null, undefined]);
        });

        it("when filtering some values", () => {
            expect(filter([1, "2", true, null, undefined], (x) => typeof x === "number")).to.deep.equal([1]);
        });

        it("when filtering no values", () => {
            expect(filter([1, "2", true, null, undefined], () => false)).to.deep.equal([]);
        });
    });

    describe("edge cases", () => {
        it("when filtering a large array", () => {
            // array with ascending values from 0 to 99999
            var largeArray = Array.from(Array(100000).keys());

            expect(filter(largeArray, (x) => x % 2 === 0)).to.deep.equal(largeArray.filter((x) => x % 2 === 0));
        });

        it("when filtering an array with sparse values", () => {
            var sparseArray = [1, , 3];

            expect(filter(sparseArray, (x) => x % 2 === 1)).to.deep.equal([1, 3]);
        });

        it("when filtering an array with sparse values and empty predicate", () => {
            var sparseArray = [1, , 3];

            expect(filter(sparseArray, () => true)).to.deep.equal([1, , 3]);
        });

        it("when filtering an array with predicate modifying the array", () => {
            expect(filter([1, 2, 3], (x, i, arr) => { arr[i] = 0; return x > 1; })).to.deep.equal([2, 3]);
        });

        it("when filtering an array of duplicate values", () => {
            expect(filter([1, 1, 1, 2, 2, 2, 3, 4], (x) => x > 1)).to.deep.equal([2, 2, 2, 3, 4]);
        });
    });
});