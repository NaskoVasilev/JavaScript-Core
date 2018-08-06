function solve(arr) {
    let rotations=Number(arr.pop())%arr.length;

    for (let i = 0; i <rotations; i++) {
        let lastElement=arr.pop();
        arr.unshift(lastElement);
    }

    console.log(arr.join(" "))
}
solve([1,2,3,4,2])
