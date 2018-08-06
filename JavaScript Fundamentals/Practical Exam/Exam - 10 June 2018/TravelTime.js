function orderDestinations(dataLines) {
    let destination = {};

    for (const dataLine of dataLines) {
        let [country, town, price] = dataLine.split(" > ");

        if (town[0].toLowerCase() === town[0]) {
            let townName = "";
            townName += town[0].toUpperCase();
            for (let i = 1; i < town.length; i++) {
                townName += town[i];
            }
            town = townName;
        }

        if (!destination.hasOwnProperty(country)) {
            destination[country] = {};
            destination[country][town] = price;
        }
        else {
            if (!destination[country].hasOwnProperty(town)) {
                destination[country][town] = price;
            }
            else {
                if (destination[country][town] > price) {
                    destination[country][town] = price;
                }
            }
        }

    }

    let countries = Object.keys(destination).sort((a, b) => {
        return a.localeCompare(b);
    });

    for (const country of countries) {
        let towns = Object.keys(destination[country]).sort((a, b) => {
            return destination[country][a] - destination[country][b];
        })
        let output = `${country} ->`
        for (const town of towns) {
            output += ` ${town} -> ${destination[country][town]}`
        }
        console.log(output)
    }
}

orderDestinations(["Bulgaria > Sofia > 500",
    "Bulgaria > Sopot > 800",
    "France > Paris > 2000",
    "Albania > Tirana > 1000",
    "Bulgaria > Sofia > 200"]
)