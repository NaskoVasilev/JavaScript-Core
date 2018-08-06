function calculate(arr) {
    let numbers = [];

    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];
        if (typeof(current) === "number") {
            numbers.push(current)
        }
        else {
            if(numbers.length<2){
                console.log("Error: not enough operands!");
                return;
            }
            let num2 = numbers.pop();
            let num1 = numbers.pop();

            switch (arr[i]) {
                case'+':
                    numbers.push(num1 + num2);
                    break;
                case'-':
                    numbers.push(num1 - num2);
                    break;
                case'*':
                    numbers.push(num1 * num2);
                    break;
                case'/':
                    numbers.push(num1 / num2);
                    break;
            }
        }


    }
    if(numbers.length===1){
        console.log(numbers[0])
    }
    else{
        console.log("Error: too many operands!")
    }
}

calculate([333,3,'/',11,'-'])
//calculate([3, 4, '+'])
calculate([31, 2, '+', 11, '/'])
calculate([-1, 1, '+', 101, '*', 18, '+', 3, '/'])
//calculate([7, 33, 8, '-'])