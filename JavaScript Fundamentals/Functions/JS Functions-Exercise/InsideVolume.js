

function solve(arr){
    for (let i = 0; i <arr.length; i+=3) {
        let x=arr[i];
        let y=arr[i+1];
        let z=arr[i+2];

        if (inVolume(x,y,z)){
            console.log("inside");
        }
        else{
            console.log("outside");
        }
    }

    function inVolume(x,y,z){
        let x1=10,x2=50;
        let y1=20,y2=80;
        let z1=15,z2=50;

        if (x1<=x&&x2>=x){
            if (y1<=y&&y2>=y){
                if (z1<=z&&z2>=z){
                    return true;
                }
            }
        }
    }
}

solve([18,20,22])