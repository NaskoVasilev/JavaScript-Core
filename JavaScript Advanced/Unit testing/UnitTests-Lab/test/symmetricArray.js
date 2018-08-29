const expect=require('chai').expect;
function isSymmetric(arr) {
    if (!Array.isArray(arr))
        return false; // Non-arrays are non-symmetric
    let reversed = arr.slice(0).reverse(); // Clone and reverse
    let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
    return equal;
}

describe('symmetric array',function () {
    describe('True tests',function () {
        it('should return true for [1,2,3,3,2,1]',function () {
            let arr=[1,2,3,3,2,1];
            let result = isSymmetric(arr);
            expect(result).to.be.equal(true)
        })
        it('should return true for [-1,2,-1]',function () {
            let arr=[-1,2,-1];
            let result = isSymmetric(arr);
            expect(result).to.be.equal(true)
        })
        it('should return true for [1]',function () {
            let arr=[1];
            let result = isSymmetric(arr);
            expect(result).to.be.equal(true)
        })
        it("should return true for [5,'hi',{a:5},new Date(),{a:5},'hi',5] ",function () {
            let arr=[5,'hi',{a:5},new Date(),{a:5},'hi',5];
            let result = isSymmetric(arr);
            expect(result).to.be.equal(true)
        })
    })

    describe('False tests',function(){
        it('should return false for [1,2,3,2,2,1]',function () {
            let arr=[1,2,3,2,2,1];
            let result = isSymmetric(arr);
            expect(result).to.be.equal(false)
        })
        it('should return false for [-1,2,1]',function () {
            let arr=[-1,2,1];
            let result = isSymmetric(arr);
            expect(result).to.be.equal(false)
        })
        it('should return false for [1,2]',function () {
            let arr=[1,2];
            let result = isSymmetric(arr);
            expect(result).to.be.equal(false)
        })
        it("should return false for [5,'hi',{a:5},new Date(),{X:5},'hi',5] ",function () {
            let arr=[5,'hi',{a:5},new Date(),{X:5},'hi',5] ;
            let result = isSymmetric(arr);
            expect(result).to.be.equal(false)
        })
        it('should return false for "1,2,3,2,1"',function () {
            let arr="1,2,3,2,1";
            let result = isSymmetric(arr);
            expect(result).to.be.equal(false)
        })
    })
})
