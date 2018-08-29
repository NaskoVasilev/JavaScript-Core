function produceCar(carParts) {
    let car={model:carParts.model};
    let engine;
    let horsePower=carParts.power;
    if(horsePower<=90){
        engine={power:90,volume:1800}
    }
    else if(horsePower<=120){
        engine={power:120,volume:2400}
    }
    else {
        engine={power:200,volume:3500}
    }
    car.engine=engine;
    car.carriage={type:carParts.carriage,color:carParts.color}
    if(carParts.wheelsize%2===0){
        carParts.wheelsize--;
    }
    car.wheels=[];
    for (let i = 0; i <4; i++) {
        car.wheels.push(carParts.wheelsize)
    }

    return car;
}

console.log(produceCar({
        model: 'VW Golf II',
        power: 90,
        color: 'blue',
        carriage: 'hatchback',
        wheelsize: 14
    }
));