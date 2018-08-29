this.jsdom = require('jsdom-global')()
global.$=require('jquery')
let expect=require('chai').expect;

let sharedObject = {
    name: null,
    income: null,
    changeName: function (name) {
        if (name.length === 0) {
            return;
        }
        this.name = name;
        let newName = $('#name');
        newName.val(this.name);
    },
    changeIncome: function (income) {
        if (!Number.isInteger(income) || income <= 0) {
            return;
        }
        this.income = income;
        let newIncome = $('#income');
        newIncome.val(this.income);
    },
    updateName: function () {
        let newName = $('#name').val();
        if (newName.length === 0) {
            return;
        }
        this.name = newName;
    },
    updateIncome: function () {
        let newIncome = $('#income').val();
        if (isNaN(newIncome) || !Number.isInteger(Number(newIncome)) || Number(newIncome) <= 0) {
            return;
        }
        this.income = Number(newIncome);
    }
};

document.body.innerHTML=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Shared Object</title>
</head>
<body>
    <div id="wrapper">
        <input type="text" id="name">
        <input type="text" id="income">
    </div>
</body>
</html>
`

describe('sharedObject Tests',function(){
    it('call with name parameter should return null',function () {
        expect(sharedObject.name).to.be.null
    })
    it('call with income parameter should return null',function () {
        expect(sharedObject.income).to.be.null
    })
    describe('Function changeName',function(){
        it('passed with null parameter should return null',function () {
            sharedObject.changeName('')
            expect(sharedObject.name).to.be.null
        })
        it('with preexisting parameter should return old value',function () {
            sharedObject.name='nasko'
            sharedObject.changeName('')
            expect(sharedObject.name).to.be.equal('nasko')
        })
        it('with valid parameter should return correct value',function () {
            sharedObject.changeName('nasko')
            expect(sharedObject.name).to.be.equal('nasko')
        })
        it('with preexisting parameter should return old value',function () {
            let name=$('#name')
            name.val('ivan')
            sharedObject.changeName('')
            expect(name.val()).to.be.equal('ivan')
        })
        it('with valid parameter should return correct value',function () {
            sharedObject.changeName('nasko')
            let name=$('#name')
            expect(name.val()).to.be.equal('nasko')
        })
    })
    describe('Function changeIncome tests',function () {
        it('with negative number should do nothing',function () {
            sharedObject.income=10;
            sharedObject.changeIncome(-5)
            expect(sharedObject.income).to.be.equal(10)
        })
        it('with positive number should change income',function () {
            sharedObject.changeIncome(5)
            expect(sharedObject.income).to.be.equal(5)
        })
        it('with positive number should change income',function () {
            sharedObject.changeIncome(10)
            let income=$('#income')
            expect(income.val()).to.be.equal('10')
        })
        it('with decimal number should return nothing',function () {
            sharedObject.income=10;
            sharedObject.changeIncome(5.5)
            expect(sharedObject.income).to.be.equal(10)
        })
        it("with a object parameter, should not change", function() {
            sharedObject.income = 10
            sharedObject.changeIncome({name:'Niki'})
            expect(sharedObject.income).to.be.equal(10)
        })
        it('with zero income should not change',function () {
            sharedObject.income=10;
            sharedObject.changeIncome(0)
            expect(sharedObject.income).to.be.equal(10)
        })
        it("with a object parameter, should not change", function() {
            let incomeBox = $('#income')
            incomeBox.val('5')
            sharedObject.changeIncome({name:'Niki'})
            expect(incomeBox.val()).to.be.equal('5')
        })
        it("with a floating parameter, should not change", function() {
            let incomeBox = $('#income')
            incomeBox.val('5')
            sharedObject.changeIncome(5.5)
            expect(incomeBox.val()).to.be.equal('5')
        })
        it("with a negative parameter, should not change", function() {
            let incomeBox = $('#income')
            incomeBox.val('5')
            sharedObject.changeIncome(-5)
            expect(incomeBox.val()).to.be.equal('5')
        })
        it('with zero should return nothing',function () {
            let incomeBox = $('#income')
            incomeBox.val('5')
            sharedObject.changeIncome(0)
            expect(incomeBox.val()).to.be.equal("5")
        })
        it("with a valid parameter, should change income", function() {
            sharedObject.changeIncome(11)
            let incomeBox = $('#income')
            expect(incomeBox.val()).to.be.equal('11')
        })
    })
    describe('Function updateName',function () {
        it('with no parameter should do nothing',function () {
            sharedObject.name='aaa'
            let nameInput=$("#name")
            nameInput.val('')
            sharedObject.updateName()
            expect(sharedObject.name).to.be.equal('aaa')

        })
        it('with valid parameter should update name',function () {
            let nameInput=$("#name")
            nameInput.val('nasko')
            sharedObject.updateName()
            expect(sharedObject.name).to.be.equal('nasko')
        })
    })
    describe('Function updateIncome tests',function () {
        it("with a invalid parameter, should not change income", function() {
            sharedObject.income = 55
            let incomeBox = $('#income')
            incomeBox.val('niki')
            sharedObject.updateIncome()
            expect(sharedObject.income).to.be.equal(55)
        })
        it("with a floating-point parameter, should not change income", function() {
            sharedObject.income = 55
            let incomeBox = $('#income')
            incomeBox.val('3.14')
            sharedObject.updateIncome()
            expect(sharedObject.income).to.be.equal(55)
        })
        it("with a negative parameter, should not change income", function() {
            sharedObject.income = 55
            let incomeBox = $('#income')
            incomeBox.val('-23')
            sharedObject.updateIncome()
            expect(sharedObject.income).to.be.equal(55)
        })
        it("with a empty string, should not change income", function() {
            sharedObject.income = 55
            let incomeBox = $('#income')
            incomeBox.val('')
            sharedObject.updateIncome()
            expect(sharedObject.income).to.be.equal(55)
        })
        it("with a valid string, should change income", function() {
            let incomeBox = $('#income')
            incomeBox.val('55')
            sharedObject.updateIncome()
            expect(sharedObject.income).to.be.equal(55)
        })
    })
})