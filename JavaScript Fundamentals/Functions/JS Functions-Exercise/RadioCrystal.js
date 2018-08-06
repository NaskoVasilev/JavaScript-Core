function solve(arr) {
    let target = arr[0];
    for (let i = 1; i < arr.length; i++) {
        let thickness = arr[i];
        let counter = 0;
        let isZero = false;
        console.log(`Processing chunk ${arr[i]} microns`);
        while (thickness / 4 >= target) {
            thickness /= 4;
            counter++;
        }
        if (counter > 0) {
            console.log(`Cut x${counter}`);
            console.log("Transporting and washing");
            thickness = Math.floor(thickness);
        }
        counter = 0;
        while (thickness * 0.8 >= target) {
            thickness *= 0.8;
            counter++;
        }
        if (counter > 0) {
            console.log(`Lap x${counter}`);
            console.log("Transporting and washing");
            thickness = Math.floor(thickness);
        }
        counter = 0;
        while (thickness - 20 >= target) {
            thickness -= 20;
            counter++;
        }

        if (counter > 0) {
            console.log(`Grind x${counter}`);
            console.log("Transporting and washing");
        }
        counter = 0;
        while (thickness - 2 >= target) {
            thickness -= 2;
            counter++;
        }
        if (thickness == target) {
            if (counter > 0) {
                console.log(`Etch x${counter}`);
                console.log("Transporting and washing");
            }
            console.log(`Finished crystal ${target} microns`)
        }
        if (thickness - 1 == target) {
            counter++;
            console.log(`Etch x${counter}`);
            console.log("Transporting and washing");
            console.log("X-ray x1")
            console.log(`Finished crystal ${target} microns`)
        }
        else if (thickness + 1 == target) {
            if (counter > 0) {
                console.log(`Etch x${counter}`);
                console.log("Transporting and washing");
            }
            console.log("X-ray x1")
            console.log(`Finished crystal ${target} microns`)
        }

    }
}


solve([1000, 4000,8100]);