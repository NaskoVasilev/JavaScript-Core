

function solve(arr){
    let num=Number(arr[0]);

    for (let i = 1; i <arr.length; i++) {
        num=result(num,arr[i]);
        console.log(num);
    }

    function result(num,operation){
        switch (operation) {
            case'chop':
                return num/2;
            case'dice':
                return Math.sqrt(num);
            case'spice':
                return num+1;
            case'bake':
                return 3*num;
            case'fillet':
                return num*0.8;
        }
    }


}

solve([9, 'dice', 'spice', 'chop', 'bake', 'fillet'])