function solve(arr){
    let map=new Map();
    for (let info of arr) {
        let[townName,product,quantity,price]=info.split(/ -> | : /g);
        let total=Number(quantity)* Number(price);
        if(!map.has(townName)){
            //warning
            map.set(townName,new Map([[product,total]]))
        }
        else {
            if(!map.get(townName).has(product)){
                map.get(townName).set(product,total);
            }
            else{
                map.get(townName).set(product,map.get(townName).get(product)+total
                )
            }
        }
    }

    for (let [key,value] of map) {
        console.log("Town - "+key);
        for (let [product,total] of value) {
            console.log(`$$$${product} : ${total}`)
        }

    }
}

solve(['Sofia -> Laptops HP -> 200 : 2000',
    'Sofia -> Raspberry -> 200000 : 1500',
    'Sofia -> Audi Q7 -> 200 : 100000',
    'Montana -> Portokals -> 200000 : 1',
    'Montana -> Qgodas -> 20000 : 0.2',
    'Montana -> Chereshas -> 1000 : 0.3']
)