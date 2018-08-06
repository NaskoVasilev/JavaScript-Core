function lowestPrice(data) {
    let products=new Map();

    for (let info of data) {
        let[townName,product,price]=info.split(" | ");

        if(!products.has(product)){
            products.set(product,new Map());
        }
        products.get(product).set(townName,Number(price));
    }

    for (let [key,value] of products) {
        let sortedKeys=Array.from(value.keys()).sort((a,b)=>{
           return value.get(a)-value.get(b);
        })
        console.log(`${key} -> ${value.get(sortedKeys[0])} (${sortedKeys[0]})`)
    }
}

lowestPrice(['Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10']
)