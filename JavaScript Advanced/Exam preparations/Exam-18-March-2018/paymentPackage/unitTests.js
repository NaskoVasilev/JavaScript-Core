let PaymentPackage = require('./package');
let expect = require('chai').expect;

describe('Class PaymentPackage unit tests', function () {
    let paymentPackage;
    beforeEach(function () {
        paymentPackage = new PaymentPackage('bill', 10);
    })
    it('should instantiate object correct', function () {
        expect(paymentPackage.name).to.be.equal('bill')
        expect(paymentPackage.value).to.be.equal(10)
    })
    describe('should has following properties', function () {
        it('should have name property', function () {
            expect(PaymentPackage.prototype.hasOwnProperty('name')).to.be.equal(true)
        })
        it('should have value property', function () {
            expect(PaymentPackage.prototype.hasOwnProperty('value')).to.be.equal(true)
        })
        it('should have VAT property', function () {
            expect(PaymentPackage.prototype.hasOwnProperty('VAT')).to.be.equal(true)
        })
        it('should have active property', function () {
            expect(PaymentPackage.prototype.hasOwnProperty('active')).to.be.equal(true)
        })
    })
    describe('accessors tests', function () {
        it('should return correct name and value', function () {
            expect(paymentPackage.name).to.be.equal('bill')
            expect(paymentPackage.value).to.be.equal(10)
        })
        it('should return correct VAT after initialization', function () {
            expect(paymentPackage.VAT).to.be.equal(20)
        })
        it('should return correct active status after initialization', function () {
            expect(paymentPackage.active).to.be.equal(true)
        })
    })
    describe('Function toString tests', function () {
        it('should return correct result when active=true', function () {
            expect(paymentPackage.toString()).to.be.equal("Package: bill\n- Value (excl. VAT): 10\n- Value (VAT 20%): 12")
        })
        it('should return correct result when active=false', function () {
            paymentPackage.active = false;
            expect(paymentPackage.toString()).to.be.equal("Package: bill (inactive)\n- Value (excl. VAT): 10\n- Value (VAT 20%): 12")
        })
    })
    describe('property name validation tests ', function () {
        it('should change name with non-empty string as parameter', function () {
            paymentPackage.name='tennis racket';
            expect(paymentPackage.name).to.be.equal('tennis racket')
        })
        it('should throw error with empty string as parameter',function () {
            expect(()=>paymentPackage.name='').throw(Error)
        })
        it('should throw error with non-string as parameter',function () {
            expect(()=>paymentPackage.name={a:name}).throw(Error)
        })
        it('should throw error with non-string as parameter',function () {
            expect(()=>paymentPackage.name=1256).throw(Error)
        })
    })
    describe('property value validation tests ', function () {
        it('should change value with non-negative number as parameter', function () {
            paymentPackage.value=150;
            expect(paymentPackage.value).to.be.equal(150)
        })
        it('should throw error with  string as parameter',function () {
            expect(()=>paymentPackage.value='aaa').throw(Error)
        })
        it('should throw error with negative number as parameter',function () {
            expect(()=>paymentPackage.value=-1256).throw(Error)
        })
        it('should change value with zero as parameter',function () {
            expect(paymentPackage.value=0).to.be.equal(0)
        })
    })
    describe('property VAT validation tests ', function () {
        it('should change name with non-negative number as parameter', function () {
            paymentPackage.VAT=150;
            expect(paymentPackage.VAT).to.be.equal(150)
        })
        it('should throw error with  string as parameter',function () {
            expect(()=>paymentPackage.VAT='aaa').throw(Error)
        })
        it('should throw error with negative number as parameter',function () {
            expect(()=>paymentPackage.VAT=-1256).throw(Error)
        })
        it('should change VAT with zero as parameter',function () {
            expect(paymentPackage.VAT=0).to.be.equal(0)
        })
    })
    describe('property active validation tests ', function () {
        it('should change name with boolean value as parameter', function () {
            paymentPackage.active=false;
            expect(paymentPackage.active).to.be.equal(false)
        })
        it('should throw error with non-boolean value as parameter',function () {
            expect(()=>paymentPackage.active="true").to.throw()
        })
        it('should throw error with non-boolean value as parameter',function () {
            expect(()=>paymentPackage.active=1).to.throw()
        })
        it('should throw error with non-boolean value as parameter',function () {
            expect(()=>paymentPackage.active={active:true}).to.throw()
        })
    })
})
