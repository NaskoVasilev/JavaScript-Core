function getFibonator() {
    let firstNum = 0;
    let secondNum = 1;

    function getNextFibNumber() {
        let next = firstNum + secondNum;
        firstNum = secondNum;
        secondNum = next;
        return firstNum;
    }

    return getNextFibNumber
}
fib = getFibonator()
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
