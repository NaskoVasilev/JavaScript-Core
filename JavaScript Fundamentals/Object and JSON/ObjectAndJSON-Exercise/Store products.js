function orderProductsByName(products) {
    let storedProducts = {};

    for (let product of products) {
        let productInfo=product.split(" : ");
        let finalProduct=productInfo[0]+": "+productInfo[1];
        let letter = product[0];
        if (!storedProducts.hasOwnProperty(letter)) {
            storedProducts[letter] = [];
        }
        storedProducts[letter].push(finalProduct);
    }

    let keys = Object.keys(storedProducts).sort();

    for (let key of keys) {
        console.log(key);
        console.log(storedProducts[key].sort((a, b) => a.toLowerCase()
            .localeCompare(b.toLowerCase())).map(x=>"  "+x).join("\n"))
    }
}

orderProductsByName([
        'Appricot : 20.4',
        'Fridge : 1500',
        'TV : 1499',
        'Deodorant : 10',
        'Boiler : 300',
        'Apple : 1.25',
        'Anti-Bug Spray : 15',
        'T-Shirt : 10',
    ]
)