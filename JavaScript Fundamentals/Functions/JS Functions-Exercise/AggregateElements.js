function aggregateElement(arr) {
    let sum=(a,b)=>a+b;
    let inverse=(a,b)=>a+1/b;
    aggregate(arr,0,sum);
    aggregate(arr,0,inverse);
    aggregate(arr,'',sum);

    function aggregate(array,initialValue,func)
    {
        for (let i = 0; i <array.length; i++) {
            initialValue=func(initialValue,array[i]);
        }
        console.log(initialValue);
    }
}
aggregateElement([1,2,3]);