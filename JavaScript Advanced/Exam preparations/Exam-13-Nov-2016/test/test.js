let createList=require('./createList')
let expect=require('chai').expect;

describe("list", function () {
    let list;
    beforeEach(function () {
        list = createList();
    });

    describe("add", function () {
        it('with a multiple elements of different types, should work correctly', function () {
            list.add('Pesho');
            list.add(5);
            let obj = {name: "gosho"};
            list.add(obj);
            expect(list.toString()).to.equal('Pesho, 5, [object Object]');
        });
    });

    describe("shiftLeft", function () {
        it('with a multiple elements, should shift them to the left', function () {
            list.add('one');
            list.add(2);
            list.add('three');
            list.shiftLeft();
            expect(list.toString()).to.equal("2, three, one");
        });
    });

    describe("shiftRight", function () {
        it('with a multiple elements, should shift them to the right', function () {
            list.add('one');
            list.add(2);
            list.add('three');
            list.shiftRight();
            expect(list.toString()).to.equal("three, one, 2");
        });
    });

    describe("swap", function () {
        it('with a negative first index, should return false', function () {
            list.add('one');
            list.add(2);
            expect(list.swap(-5, 1)).to.equal(false);
        });

        it('with a negative first index, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.swap(-5, 1);
            expect(list.toString()).to.equal("one, two");
        });

        it('with a non integer first index, should return false', function () {
            list.add('one');
            list.add('two');
            expect(list.swap('stamat', 1)).to.equal(false);
        });

        it('with a non integer first index, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.swap([4, 13], 1);
            expect(list.toString()).to.equal("one, two");
        });

        it('with first index equal to number of elements, should return false', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(3, 1)).to.equal(false);
        });

        it('with first index equal to number of elements, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(3, 1);
            expect(list.toString()).to.equal("one, two, three");
        });

        it('with a negative second index, should return false', function () {
            list.add('one');
            list.add(2);
            expect(list.swap(0, -1)).to.equal(false);
        });

        it('with a negative second index, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.swap(0, -1);
            expect(list.toString()).to.equal("one, two");
        });

        it('with a non integer second index, should return false', function () {
            list.add('one');
            list.add('two');
            expect(list.swap(0, 'stamat')).to.equal(false);
        });

        it('with a non integer second index, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.swap(0, [4, 13]);
            expect(list.toString()).to.equal("one, two");
        });

        it('with second index equal to number of elements, should return false', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(0, 3)).to.equal(false);
        });

        it('with second index equal to number of elements, should not change the collection', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(0, 3);
            expect(list.toString()).to.equal("one, two, three");
        });

        it('with equal indexes, should return false', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(1, 1)).to.equal(false);
        });

        it('with equal indexes, collection should stay the same', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(1, 1);
            expect(list.toString()).to.equal("one, two, three");
        });

        it('with zero first index, should return true', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(0, 1)).to.equal(true)
        });

        it('with zero second indexes, should return true', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            expect(list.swap(2, 0)).to.equal(true);
        });

        it('with zero first index, should swap the values', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(0, 2);
            expect(list.toString()).to.equal("three, two, one");
        });

        it('with zero second index, should swap the values', function () {
            list.add('one');
            list.add('two');
            list.add('three');
            list.swap(1, 0);
            expect(list.toString()).to.equal("two, one, three");
        });
    });
});