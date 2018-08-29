(function () {
    Array.prototype.last=function () {
        return this[this.length-1]
    }
    Array.prototype.skip=function (n) {
        let result=[];
        if(n<0||n>=this.length){
            throw 'In skip function element count is negative number or greater than array length'
        }
        for(let i=n;i<this.length;i++){
            result.push(this[i])
        }
        return result;
    }
    Array.prototype.take=function (n) {
        let result=[];
        if(n>this.length){
            n=this.length
        }if(n<=0){
            throw "In take function element count is negative number";
        }
        for (let i = 0; i <n; i++) {
            result.push(this[i])
        }
        return result;
    }
    Array.prototype.sum=function () {
        let sum=0;
        for (let i = 0; i <this.length; i++) {
            sum+=this[i];
        }
        return sum;
    }
    Array.prototype.average=function () {
        return this.sum()/this.length;
    }
})()

let arr=[1,2,3,4,5,6,7,8,9]
console.log(arr.last())
console.log(arr.skip(-4))
console.log(arr.take(4))
console.log(arr.sum())
console.log(arr.average())