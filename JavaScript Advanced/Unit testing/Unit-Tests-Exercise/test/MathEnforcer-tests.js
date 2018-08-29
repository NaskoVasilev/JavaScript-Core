const expect=require('chai').expect;

let mathEnforcer = {
    addFive: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

describe('Object mathEnforcer - tests',function () {
    describe('Function addFive tests',function () {
        it('with non-number value should return undefined',function () {
            expect(mathEnforcer.addFive('pesho')).to.be.undefined
        })
        it('with integer value should return correct result',function () {
            expect(mathEnforcer.addFive(15)).to.be.equal(20)
        })
        it('with floating-point number should return correct result',function () {
            expect(mathEnforcer.addFive(15.5)).to.be.closeTo(20.5,0.01)
        })
        it('with negative value should return correct result',function () {
            expect(mathEnforcer.addFive(-15)).to.be.equal(-10)
        })
    })

    describe('Function subtractTen tests',function () {
        it('with non-number value should return undefined',function () {
            expect(mathEnforcer.subtractTen('pesho')).to.be.undefined
        })
        it('with integer value should return correct result',function () {
            expect(mathEnforcer.subtractTen(15)).to.be.equal(5)
        })
        it('with floating-point number should return correct result',function () {
            expect(mathEnforcer.subtractTen(15.5)).to.be.closeTo(5.5,0.01)
        })
        it('with negative value should return correct result',function () {
            expect(mathEnforcer.subtractTen(-15)).to.be.equal(-25)
        })
    })

    describe('Function sum tests',function () {
        it('with non-number values should return undefined',function () {
            expect(mathEnforcer.sum('pesho',[2,3])).to.be.undefined
        })
        it('with a non-number value should return undefined',function () {
            expect(mathEnforcer.sum('pesho',3)).to.be.undefined
        })
        it('with a non-number value should return undefined',function () {
            expect(mathEnforcer.sum(123,{name:"pesho"})).to.be.undefined
        })
        it('with integer value should return correct result',function () {
            expect(mathEnforcer.sum(12,8)).to.be.equal(20)
        })
        it('with floating-point number should return correct result',function () {
            expect(mathEnforcer.sum(15.5,15.3)).to.be.closeTo(30.8,0.01)
        })
        it('with negative value should return correct result',function () {
            expect(mathEnforcer.sum(-15,10)).to.be.equal(-5)
        })
    })
})
