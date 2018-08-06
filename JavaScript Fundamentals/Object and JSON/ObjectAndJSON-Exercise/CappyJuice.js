function calculateBottlesOfJuice(arr) {
    // let map = new Map();
    // let obj={};
    // for (let currentJuice of arr) {
    //     let array = currentJuice.split(' => ');
    //     let name = array[0];
    //     let quantity = Number(array[1]);
    //
    //     if(!obj.hasOwnProperty(name)){
    //         obj[name]=quantity;
    //     }
    //     else{
    //         obj[name]+=quantity;
    //     }
    //
    //     if(obj[name]>=1000){
    //         let bottles=Math.floor(obj[name]/1000);
    //         map.set(name,bottles)
    //     }
    // }
    // for (let [key, value] of map) {
    //         console.log(key + " => " + value);
    // }

    //Second solution
    //Using objects

    let juiceObj = {};
    let bottlesObj = {};

    for (let currentJuice of arr) {
        let [name, quantity] = currentJuice.split(" => ");
        quantity=Number(quantity);
        if (!juiceObj.hasOwnProperty(name)) {
            juiceObj[name] = quantity;
        }
        else {
            juiceObj[name] += quantity;
        }

        if (juiceObj[name] >= 1000) {
            bottlesObj[name]=Math.floor(juiceObj[name]/1000);
        }
    }

    for (let key in bottlesObj) {
        console.log(key+" => "+bottlesObj[key]);
    }
}

calculateBottlesOfJuice(
    [
        'Kiwi => 234',
        'Pear => 2345',
        'Watermelon => 3456',
        'Kiwi => 4567',
        'Pear => 5678',
        'Watermelon => 6789',
    ]
)