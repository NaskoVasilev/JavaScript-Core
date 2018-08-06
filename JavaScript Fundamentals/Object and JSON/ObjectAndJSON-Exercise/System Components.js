function storeComponents(data) {
    let system = new Map();

    for (const line of data) {
        let [systemName, componentName, subcomponentName] = line.split(" | ");

        if (!system.has(systemName)) {
            system.set(systemName, new Map([
                [componentName, [subcomponentName]]
            ]));
        }
        else {
            if (!system.get(systemName).has(componentName)) {
                system.get(systemName).set(componentName, [subcomponentName])
            }
            else {
                system.get(systemName).get(componentName).push(subcomponentName)
            }
        }
    }
    let outerKeys = Array.from(system.keys()).sort((a, b) => {
        let diff = system.get(b).size - system.get(a).size;
        if (diff === 0) {
            return a.localeCompare(b);
        }
        return diff;
    });

    for (const outerKey of outerKeys) {
        console.log(outerKey);

        let innerKeys = Array.from(system.get(outerKey).keys()).sort((a, b) => {
            return system.get(outerKey).get(b).length - system.get(outerKey).get(a).length;
        })

        for (const innerKey of innerKeys) {
            console.log("|||" + innerKey);
            for (const subcomponentName of system.get(outerKey).get(innerKey)) {
                console.log("||||||" + subcomponentName)
            }

        }


    }

}

storeComponents(
    [
        'SULS | Main Site | Home Page',
        'SULS | Main Site | Login Page',
        'SULS | Main Site | Register Page',
        'SULS | Judge Site | Login Page',
        'SULS | Judge Site | Submittion Page',
        'Lambda | CoreA | A23',
        'SULS | Digital Site | Login Page',
        'Lambda | CoreB | B24',
        'Lambda | CoreA | A24',
        'Lambda | CoreA | A25',
        'Lambda | CoreC | C4',
        'Indice | Session | Default Storage',
        'Indice | Session | Default Security',
    ]
)