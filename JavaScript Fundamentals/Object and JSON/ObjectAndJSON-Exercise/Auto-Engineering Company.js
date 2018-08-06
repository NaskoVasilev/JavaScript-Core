function storeCarsData(carsData) {
    let cars = new Map();

    for (const carData of carsData) {
        let [brand, model, price] = carData.split(" | ");
        price = Number(price);

        if (!cars.has(brand)) {
            cars.set(brand, new Map([
                [model, price]
            ]));
        }
        else {
            if (!cars.get(brand).has(model)) {
                cars.get(brand).set(model, price)
            }
            else {
                cars.get(brand).set(model, cars.get(brand).get(model) + price)
            }
        }
    }

    for (const [car, models] of cars) {
        console.log(car);
        for (const [model, price] of models) {
            console.log(`###${model} -> ${price}`)
        }
    }
}

storeCarsData([
        'Audi | Q7 | 1000',
        'Audi | Q6 | 100',
        'BMW | X5 | 1000',
        'BMW | X6 | 100',
        'Citroen | C4 | 123',
        'Volga | GAZ-24 | 1000000',
        'Lada | Niva | 1000000',
        'Lada | Jigula | 1000000',
        'Citroen | C4 | 22',
        'Citroen | C5 | 10',
    ]
)