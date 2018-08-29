function add(sum) {
    function addElement(value) {
        return add(sum+value)
    }

    addElement.toString = function () {
        return sum
    }
    return addElement
}

console.log(add(1)(2)(5).toString());
