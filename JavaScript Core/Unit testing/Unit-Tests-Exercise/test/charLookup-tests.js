const expect=require('chai').expect;
function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

describe('Tests for function lookupChar',function (){
    it('with a non-string first parameter should return undefined',function () {
        expect(lookupChar(12,3)).to.be.undefined
    })
    it('with a non-number second parameter should return undefined',function () {
        expect(lookupChar('pesho','gosho')).to.be.undefined
    })
    it('with a non-integer second parameter should return undefined',function () {
        expect(lookupChar('pesho',3.14)).to.be.undefined
    })
    it('with a non-integer second parameter and non-string first parameter should return undefined',function () {
        expect(lookupChar({string:'string'},[1,2,3,4])).to.be.undefined
    })

    it('with incorrect index should return "Incorrect index"',function () {
        expect(lookupChar('pesho',12)).to.be.equal('Incorrect index')
    })
    it('with incorrect index should return "Incorrect index"',function () {
        expect(lookupChar('pesho',5)).to.be.equal('Incorrect index')
    })
    it('with negative index should return "Incorrect index"',function () {
        expect(lookupChar('pesho',-5)).to.be.equal('Incorrect index')
    })
    it('with negative index should return "Incorrect index"',function () {
        expect(lookupChar('pesho',-1)).to.be.equal('Incorrect index')
    })

    it('with correct index should return correct value',function () {
        expect(lookupChar('pesho',0)).to.be.equal('p')
    })
    it('with correct index should return correct value',function () {
        expect(lookupChar('pesho',3)).to.be.equal('h')
    })
    it('with correct index should return correct value',function () {
        expect(lookupChar('pesho',4)).to.be.equal('o')
    })
})
