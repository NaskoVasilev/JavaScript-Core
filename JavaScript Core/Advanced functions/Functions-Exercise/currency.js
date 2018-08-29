function currencyFormatter(separator, symbol, symbolFirst, value) {
    let result = Math.trunc(value) + separator;
    result += value.toFixed(2).substr(-2, 2);
    if (symbolFirst) return symbol + ' ' + result;
    else return result + ' ' + symbol;
}

function formatter(currencyFormatter) {
    let dollarFormatter = function (value) {
        let result = currencyFormatter(',', '$', true, value);
        return result;
    }
    return dollarFormatter;
}

let result =formatter(currencyFormatter);
console.log(result(15));