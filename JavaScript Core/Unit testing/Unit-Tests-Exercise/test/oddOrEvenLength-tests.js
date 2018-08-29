const expect = require('chai').expect;

function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

describe('Function isOddOrEven Unit Tests', function () {
    describe('Test with correct result', function () {
        it('should return odd for "pesho"', function () {
            expect(isOddOrEven("pesho")).to.be.equal('odd')
        })
        it('should return odd for "!!@@-"', function () {
            expect(isOddOrEven("!!@@/")).to.be.equal('odd')
        })
        it('should return odd for "GOSHO"', function () {
            expect(isOddOrEven("GOSHO")).to.be.equal('odd')
        })
        it('should return odd for "12345"', function () {
            expect(isOddOrEven("12345")).to.be.equal('odd')
        })
        it('should return even for "AABB"', function () {
            expect(isOddOrEven("AABB")).to.be.equal('even')
        })
        it('should return even for "456789"', function () {
            expect(isOddOrEven("456789")).to.be.equal('even')
        })
        it('should return even for "$$%%@@"', function () {
            expect(isOddOrEven("$$%%@@")).to.be.equal('even')
        })
        it('should return even for ""', function () {
            expect(isOddOrEven("")).to.be.equal('even')
        })
        it('should return even for "atanas"', function () {
            expect(isOddOrEven("atanas")).to.be.equal('even')
        })
    })
    describe('Tests with incorrect result',function () {
        it('should return undefined for number',function () {
            expect(isOddOrEven(125)).to.be.undefined
        })
        it('should return undefined for object',function () {
            expect(isOddOrEven({unit:"tests"})).to.be.undefined
        })
        it('should return undefined for number',function () {
            expect(isOddOrEven(1234)).to.be.undefined
        })
        it('should return undefined for array',function () {
            expect(isOddOrEven(['aaa','bbbb'])).to.be.undefined
        })
    })
})
