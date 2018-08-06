function findUniqueSequence(arr) {
    let uniqueArrays = new Set();
    for (const currentArr of arr) {
        let numbers = JSON.parse(currentArr).sort((a,b)=>b-a);
        uniqueArrays.add(JSON.stringify(numbers));
    }

    [...uniqueArrays].map(arr=>JSON.parse(arr)).sort((a,b)=>{
        return a.length-b.length
    }).forEach(arr=>console.log(`[${arr.join(', ')}]`))

}

findUniqueSequence(
    [
        '[-3, -2, -1, 0, 1, 2, 3, 4]',
        '[10, 1, -17, 0, 2, 13]',
        '[4, -3, 3, -2, 2, -1, 1, 0]',
    ]
)