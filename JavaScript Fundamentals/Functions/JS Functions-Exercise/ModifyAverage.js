function averageDigitSum(num) {
    num=num.toString();
    let sum=0;
    for (let i = 0; i <num.length; i++) {
         sum+=Number(num[i]);
    }
    return sum/num.length;
}

function solve(num) {

    let averageSum=averageDigitSum(num);
    if(averageSum>5){
        console.log(num);
        return ;
    }
    else{

        while(averageSum<=5){
            let newNumber=num.toString()+"9";
            num=Number(newNumber);
            averageSum=averageDigitSum(num);
        }
        console.log(num);
    }
}

solve(5835)