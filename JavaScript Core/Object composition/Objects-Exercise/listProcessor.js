function solve(arr) {
    let listProcessor=(function () {
        let words=[];
        function add(word) {
            words.push(word);
        }
        function remove(word) {
            words=words.filter(w=>w!==word);
        }
        function print() {
            console.log(words.join(','));;
        }
        return {add,remove,print}
    })()

    for (const cmd of arr) {
        let[command,value]=cmd.split(' ')
        listProcessor[command](value);
    }
}
solve(['add hello', 'add again', 'remove hello', 'add again', 'print'])
