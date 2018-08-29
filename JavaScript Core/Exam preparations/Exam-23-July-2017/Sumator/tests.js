let Sumator = require('./Sumator')
let expect = require('chai').expect;

describe('Sumator unit tests', function () {
    let sumator;
    beforeEach(function () {
        sumator = new Sumator();
    })
    it('expect data to be empty', function () {
        expect(sumator.data.length).to.be.equal(0);
        expect(sumator.data.join(" ")).to.be.equal("");
    })
    describe('should contains correct functions', function () {
        it('should has function add', function () {
            expect(Sumator.prototype.hasOwnProperty('add')).to.be.equal(true)
        })
        it('should has function sumNums', function () {
            expect(Sumator.prototype.hasOwnProperty('sumNums')).to.be.equal(true)
        })
        it('should has function  removeByFilter', function () {
            expect(Sumator.prototype.hasOwnProperty('removeByFilter')).to.be.equal(true)
        })
        it('should has function toString', function () {
            expect(Sumator.prototype.hasOwnProperty('toString')).to.be.equal(true)
        })
    })
    describe('add function', function () {
        it('correctly add numbers', function () {
            sumator.add(1);
            sumator.add(2);
            sumator.add(3);
            expect(sumator.data.join(' ')).to.be.equal('1 2 3')
        })
        it('correctly add strings', function () {
            sumator.add('atanas');
            sumator.add('256');
            sumator.add('pesho');
            expect(sumator.data.join(' ')).to.be.equal('atanas 256 pesho')
        })
        it('correctly add objects', function () {
            sumator.add({name:'atanas'});
            sumator.add({});
            expect(sumator.data.join(' ')).to.be.equal('[object Object] [object Object]')
        })
        it('correctly add mixed data', function () {
            sumator.add('atanas');
            sumator.add(256);
            sumator.add(20.5);
            expect(sumator.data.join(' ')).to.be.equal('atanas 256 20.5')
        })
    })
    describe('function sum nums tests',function () {
        it('should return 0 with strings',function () {
            sumator.add('256');
            sumator.add('aaaa');
            sumator.add('atanas');
            expect(sumator.sumNums()).to.be.equal(0)
        })
        it('should return correct result with numbers',function () {
            sumator.add(10);
            sumator.add(20);
            sumator.add(35);
            expect(sumator.sumNums()).to.be.equal(65)
        })
        it('should return correct result with mixed data',function () {
            sumator.add(10);
            sumator.add('20');
            sumator.add(35);
            sumator.add('atanas');
            sumator.add({name:'name'});
            expect(sumator.sumNums()).to.be.equal(45)
        })
    })
    describe('removeByFilter function',function () {
        it('should filter data',function () {
            let func=(x)=>x%2===0;
            for (let i = 0; i <=8; i++) {
                sumator.add(i)
            }
            sumator.removeByFilter(x=>x%2!==0)
            expect(sumator.data.join(' ')).to.be.equal('0 2 4 6 8')
        })
        it('should not change data',function () {
            let func=(x)=>x%2===0;
            for (let i = 0; i <=8; i++) {
                sumator.add(i)
            }
            sumator.removeByFilter(x=>x>8)
            expect(sumator.data.join(' ')).to.be.equal('0 1 2 3 4 5 6 7 8')
        })
    })
    describe('toString function',function () {
        it('should return correct output',function () {
            for (let i = 0; i <=8; i++) {
                sumator.add(i)
            }
            expect(sumator.toString()).to.be.equal('0, 1, 2, 3, 4, 5, 6, 7, 8')
        })
        it('should return empty with empty data',function () {
            expect(sumator.data.length).to.be.equal(0)
            expect(sumator.toString()).to.be.equal('(empty)')
        })
    })
})