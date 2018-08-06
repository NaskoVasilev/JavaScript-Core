function solve(arr) {
    let increasingnNubers=[]
if (arr.length>0){
    increasingnNubers.push(arr[0]);
}
    let index=1;
    for (let i = 1; i <arr.length; i++) {
        if(arr[i]>=increasingnNubers[index-1]){
            increasingnNubers[index]=arr[i];
            index++;
        }
    }
    console.log(increasingnNubers.join('\n'))
}

solve([1,2,3,4,5,6,2,5,8,5,2])