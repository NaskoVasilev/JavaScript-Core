let Calculator =require('./calculator');
let expect=require('chai').expect;

describe('Class Calculator unit tests',function () {
    let calculator;
    beforeEach(function () {
        calculator=new Calculator()
    })
    describe('Expect to has the following properties',function () {
        it('should have add property',function () {
            expect(Calculator.prototype.hasOwnProperty('add')).to.be.equal(true)
            expect(Object.getPrototypeOf(calculator).hasOwnProperty('add')).to.be.equal(true)
        })
        it('should have data property',function () {
            expect(calculator.hasOwnProperty('expenses')).to.be.equal(true)
        })
        it('should have empty array initially for storing data',function () {
            expect(calculator.expenses.length).to.be.equal(0);
        })
        it('should have divideNums property',function () {
            expect(Calculator.prototype.hasOwnProperty('divideNums')).to.be.equal(true)
            expect(Object.getPrototypeOf(calculator).hasOwnProperty('divideNums')).to.be.equal(true)
        })
        it('should have toString property',function () {
            expect(Calculator.prototype.hasOwnProperty('toString')).to.be.equal(true)
            expect(Object.getPrototypeOf(calculator).hasOwnProperty('toString')).to.be.equal(true)
        })
        it('should have orderBy property',function () {
            expect(Calculator.prototype.hasOwnProperty('orderBy')).to.be.equal(true)
            expect(Object.getPrototypeOf(calculator).hasOwnProperty('orderBy')).to.be.equal(true)
        })
        it('should have divideNums property',function () {
            expect(calculator.hasOwnProperty('expenses')).to.be.equal(true)
        })
    })
    describe('add function',function () {
        it('should add data numbers',function () {
            calculator.add(15)
            calculator.add(10)
            calculator.add(5)
            expect(calculator.expenses.join(' ')).to.be.equal('15 10 5')
        })
        it('should add data strings',function () {
            calculator.add('15')
            calculator.add('nasko')
            calculator.add('{a:5}')
            expect(calculator.expenses.join(' ')).to.be.equal('15 nasko {a:5}')
        })
        it('should add data objects',function () {
            calculator.add({name:'pesho'})
            calculator.add({})
            expect(calculator.expenses.join(' ')).to.be.equal('[object Object] [object Object]')
        })
        it('should add mixed data',function () {
            calculator.add(15)
            calculator.add('10')
            calculator.add('pesho')
            calculator.add({})
            expect(calculator.expenses.join(' ')).to.be.equal('15 10 pesho [object Object]')
        })
    })
    describe('function divideNums',function () {
       it('should return 0 when first num is 0',function () {
           calculator.add(0)
           calculator.add('pesho')
           calculator.add(15)
           let result=calculator.divideNums();
           expect(result).to.be.equal(0)
           expect(calculator.expenses[0]).to.be.equal(0)
       })
        it('should return Cannot divide by zero when there is 0',function () {
            calculator.add(15)
            calculator.add('pesho')
            calculator.add(0)
            calculator.add(150)
            let result=calculator.divideNums();
            expect(result).to.be.equal('Cannot divide by zero')
        })
        it('should return correct result',function () {
            calculator.add(30)
            calculator.add('pesho')
            calculator.add(15)
            calculator.add(2)
            calculator.add(1)
            let result=calculator.divideNums();
            expect(result).to.be.equal(1)
            expect(calculator.expenses[0]).to.be.equal(1)
        })
        it('should return correct result with decimal numbers',function () {
            calculator.add(4.2)
            calculator.add('pesho')
            calculator.add(2)
            calculator.add(2)
            let result=calculator.divideNums();
            expect(result).to.be.equal(1.05)
            expect(calculator.expenses[0]).to.be.equal(1.05)
        })
        it('should return throw error',function () {
            calculator.add({})
            calculator.add('pesho')
            calculator.add([1,2,3,4,5])
            calculator.add('150')
            expect(()=>{calculator.divideNums()}).to.throw()
        })
    })
    describe('toString function',function () {
        it('should return empty array with no data in array',function () {
            expect(calculator.expenses.length).to.be.equal(0);
            expect(calculator.toString()).to.be.equal('empty array');
        })
        it('should return correct result',function () {
            calculator.add(5);
            calculator.add('15.5');
            calculator.add('nasko');
            calculator.add({name:'pesho'});
            calculator.add([1,2,3]);
            calculator.add(true);
            expect(calculator.toString()).to.be.equal('5 -> 15.5 -> nasko -> [object Object] -> 1,2,3 -> true');
        })
    })
    describe('orderBy function',function(){
        it('should return sorted array with numbers',function(){
            calculator.add(5);
            calculator.add(15)
            calculator.add(1)
            calculator.add(1.5)
            expect(calculator.orderBy()).to.be.equal('1, 1.5, 5, 15')
        })
        it('should sort correct mixed types',function () {
            calculator.add(15);
            calculator.add(5)
            calculator.add('1111')
            calculator.add('nasko')
            expect(calculator.orderBy()).to.be.equal('1111, 15, 5, nasko')
        })
        it('should sort correct mixed types',function () {
            calculator.add(15);
            calculator.add(5)
            calculator.add('[1,2,4]')
            calculator.add([1,2,4])
            calculator.add({name:'atanas'})
            calculator.add('nasko')
            calculator.add(999.999)
            expect(calculator.orderBy()).to.be.equal('1,2,4, 15, 5, 999.999, [1,2,4], [object Object], nasko')
        })
    })
})