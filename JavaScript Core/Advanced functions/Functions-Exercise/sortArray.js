function solve(arr,sortMethod){
    if(sortMethod==='asc'){
        arr=arr.sort((a,b)=>a-b);
    }
    else{
        arr=arr.sort((a,b)=>b-a);
    }
    return arr;
}

console.log(solve([14, 7, 17, 6, 8], 'asc'));