function  solve(arr) {
    let oddNUums=arr.filter((x,i)=>i%2==1).map(x=>x*2).reverse();

    for (let oddNUum of oddNUums) {
        console.log(oddNUum);
    }

}
solve([10, 15, 20, 25])