const expect=require('chai').expect;
function createCalculator() {
    let value = 0;
    return {
        add: function(num) { value += Number(num); },
        subtract: function(num) { value -= Number(num); },
        get: function() { return value; }
    }
}

describe('Calculator tests',function () {
    let calculator;
    beforeEach(function () {
        calculator = createCalculator();
    })
    it('should return 0 after initializing}', function () {
        let result = calculator.get();
        expect(result).to.be.equal(0);
    })
    it('should return 5 after {add(2),add(3)}', function () {
        calculator.add(2);
        calculator.add(3);
        let result = calculator.get();
        expect(result).to.be.equal(5);
    })
    it('should return 5 after {subtract(2),subtract(3)}', function () {
        calculator.subtract(2);
        calculator.subtract(3);
        let result = calculator.get();
        expect(result).to.be.equal(-5);
    })
    it('should return 4.4 after {add(5.5),subtract(1.1)}', function () {
        calculator.add(5.5);
        calculator.subtract(1.1);
        let result = calculator.get();
        expect(result).to.be.equal(4.4);
    })
    it('should return 2 after {add(10),add("-2"),subtract("7"),subtract(-1)}', function () {
        calculator.add(10);
        calculator.subtract("7")
        calculator.add("-2");
        calculator.subtract(-1)
        let result = calculator.get();
        expect(result).to.be.equal(2);
    })
    it('should return NaN after {add("hello")}', function () {
        calculator.add("hello")
        let result = calculator.get();
        expect(result).to.be.NaN
    })
    it('should return NaN after {subtract("hello")}', function () {
        calculator.subtract("hello")
        let result = calculator.get();
        expect(result).to.be.NaN
    })
})
