// Tests for difference.js:
import difference from '../src/difference.js';
import chai from 'chai';

var expect = chai.expect;

describe("difference.js should handle", () => {
    describe("empty arrays", () => {
        it("with empty values", () => {
            expect(difference([], [])).to.deep.equal([]);
        });

        it("with non-empty values", () => {
            expect(difference([], [1, 2, 3])).to.deep.equal([]);
        });
    });

    describe("non-empty arrays", () => {
        it("with empty values", () => {
            expect(difference([1, 2, 3], [])).to.deep.equal([1, 2, 3]);
        });

        it("with non-empty values (2/3 common values)", () => {
            expect(difference([1, 2, 3], [1, 2])).to.deep.equal([3]);
        });

        it("with non-empty values (3/3 common values)", () => {
            expect(difference([1, 2, 3], [1, 2, 3])).to.deep.equal([]);
        });

        it("with non-empty values (0/3 common values)", () => {
            expect(difference([1, 2, 3], [4, 5, 6])).to.deep.equal([1, 2, 3]);
        });
    });

    describe("excluding values present", () => {
        it("with 1 common value", () => {
            expect(difference([1, 2, 3], [2])).to.deep.equal([1, 3]);
        });

        it("with 2 common values", () => {
            expect(difference([1, 2, 3], [2, 3])).to.deep.equal([1]);
        });

        it("with 3 common values", () => {
            expect(difference([1, 2, 3], [1, 2, 3])).to.deep.equal([]);
        });
    });

    describe("excluding values not present", () => {
        it("with 1 value", () => {
            expect(difference([1, 2, 3], [4])).to.deep.equal([1, 2, 3]);
        });

        it("with 2 values", () => {
            expect(difference([1, 2, 3], [4, 5])).to.deep.equal([1, 2, 3]);
        });

        it("with 3 values", () => {
            expect(difference([1, 2, 3], [4, 5, 6])).to.deep.equal([1, 2, 3]);
        });

        it("with 4 values", () => {
            expect(difference([1, 2, 3], [4, 5, 6, 7])).to.deep.equal([1, 2, 3]);
        });

        it("with multiple same values", () => {
            expect(difference([1, 2, 3], [4, 4, 4])).to.deep.equal([1, 2, 3]);
        });
    });

    describe("array-like objects", () => {
        it("with 0 common values", () => {
            expect(difference("123", [4])).to.deep.equal(["1", "2", "3"]);
        });
    
        it("with 1 common value", () => {
            expect(difference("123", [2])).to.deep.equal(["1", "3"]);
        });
    
        it("with 2 common values", () => {
            expect(difference("123", [2, 3])).to.deep.equal(["1"]);
        });
    
        it("with 3 common values", () => {
            expect(difference("123", [1, 2, 3])).to.deep.equal([]);
        });
    
        it("with empty values", () => {
            expect(difference("123", [])).to.deep.equal(["1", "2", "3"]);
        });
    });

    describe("mixed types", () => {
        it("with empty array", () => {
            expect(difference([], [1, 'two', { three: 3 }])).to.deep.equal([]);
        })
    
        it("with empty values", () => {
            expect(difference([1, 'two', { three: 3 }], [])).to.deep.equal([1, 'two', { three: 3 }]);
        });

        it("with 0 common values", () => {
            expect(difference([1, 'two', { three: 3 }], [4])).to.deep.equal([1, 'two', { three: 3 }]);
        });

        it("with 1 common value", () => {
            expect(difference([1, 'two', { three: 3 }], [1])).to.deep.equal(['two', { three: 3 }]);
        });

        it("with 2 common values", () => {
            expect(difference([1, 'two', { three: 3 }], [1, 'two'])).to.deep.equal([{ three: 3 }]);
        });

        it("with 3 common values", () => {
            expect(difference([1, 'two', { three: 3 }], [1, 'two', { three: 3 }])).to.deep.equal([]);
        });
    });

    describe("nested arrays", () => {;
        it("with empty array", () => {
            expect(difference([], [[1, 2, 3]])).to.deep.equal([]);
        })
    
        it("with empty values", () => {
            expect(difference([[1, 2, 3]], [])).to.deep.equal([[1, 2, 3]]);
        });

        it("with 0 common values", () => {
            expect(difference([[1, 2, 3]], [[4]])).to.deep.equal([[1, 2, 3]]);
        });

        it("with 1 common value", () => {
            expect(difference([[1, 2, 3]], [[1]])).to.deep.equal([[2, 3]]);
        });

        it("with 2 common values", () => {
            expect(difference([[1, 2, 3]], [[1, 2]])).to.deep.equal([[3]]);
        });

        it("with 3 common values", () => {
            expect(difference([[1, 2, 3]], [[1, 2, 3]])).to.deep.equal([]);
        });

        it("with duplicate values", () => {
            expect(difference([[1, 2, 3]], [[1, 2, 3], [1, 2, 3]])).to.deep.equal([]);
        });
    });

    describe("very large arrays", () => {
        it("with 0 common values", () => {
            expect(difference(Array(1000000).fill(1), Array(1000000).fill(2))).to.deep.equal(Array(1000000).fill(1));
        });

        it("with 1 common value", () => {
            expect(difference(Array(1000000).fill(1), Array(1000000).fill(1))).to.deep.equal([]);
        });

        it("with 2 common values", () => {
            expect(difference(Array(1000000).fill(1), Array(1000000).fill(1, 0, 999999).concat(Array(1).fill(2)))).to.deep.equal([]);
        });

        it("with 3 common values", () => {
            expect(difference(Array(1000000).fill(1), Array(1000000).fill(1, 0, 999998).concat(Array(2).fill(2)))).to.deep.equal([]);
        });
    });
});