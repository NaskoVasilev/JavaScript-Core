function gcd(firstNum,secondNum){
    if(firstNum>secondNum){
        firstNum-=secondNum;
        return gcd(firstNum,secondNum)
    }
    else if(firstNum<secondNum){
        secondNum-=firstNum
        return gcd(firstNum,secondNum)
    }
    else{
        return firstNum;
    }
}

let divisor=gcd(252,105)
console.log(divisor);