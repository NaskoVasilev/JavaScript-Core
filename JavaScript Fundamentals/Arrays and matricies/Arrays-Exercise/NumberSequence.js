function solve(length , count) {
    let arr=[1];
    for (let i = 1; i <length; i++) {
        let start=Math.max(0,i-count);
        let end=i;
        let sum=0;
        for (let i = start; i <end; i++) {
            sum+=arr[i];
        }

        arr[i]=sum;
    }

    for (let num of arr) {
        console.log(num);
    }
}
solve(6,3);