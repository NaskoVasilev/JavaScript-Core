function battles(dataLines, matrix) {
    let kingdoms = {};
    let generalsWins = {};
    let generalsLoses = {};
    let kingdomsWins = {};
    let kingdomsLoses = {};

    for (const dataLine of dataLines) {
        let kingdom = dataLine.kingdom;
        let general = dataLine.general;
        let army = Number(dataLine.army);

        if (!kingdoms.hasOwnProperty(kingdom)) {
            kingdoms[kingdom] = {};
            kingdoms[kingdom][general] = army;
        }
        else {
            if (!kingdoms[kingdom].hasOwnProperty(general)) {
                kingdoms[kingdom][general] = army;
            }
            else {
                kingdoms[kingdom][general] += army;
            }
        }
    }

    for (const kingdomsKey in kingdoms) {
        kingdomsWins[kingdomsKey] = 0;
        kingdomsLoses[kingdomsKey] = 0;
        for (const general in kingdoms[kingdomsKey]) {
            generalsWins[general] = 0;
            generalsLoses[general] = 0;
        }

    }

    for (let i = 0; i < matrix.length; i++) {
        let [attackingKingdom, attackingGeneral, defendingKingdom, defendingGeneral] = matrix[i];

        if (attackingKingdom !== defendingKingdom) {
            let attackingArmy = kingdoms[attackingKingdom][attackingGeneral];
            let defendingArmy = kingdoms[defendingKingdom][defendingGeneral];

            if (attackingArmy > defendingArmy) {
                kingdoms[attackingKingdom][attackingGeneral]=Math.floor( kingdoms[attackingKingdom][attackingGeneral]*1.1)
                kingdoms[defendingKingdom][defendingGeneral]=Math.floor(kingdoms[defendingKingdom][defendingGeneral]*0.9)


                generalsWins[attackingGeneral]++;
                kingdomsWins[attackingKingdom]++;
                generalsLoses[defendingGeneral]++;
                kingdomsLoses[defendingKingdom]++;

            }
            else if (defendingArmy > attackingArmy) {
                kingdoms[attackingKingdom][attackingGeneral]=Math.floor( kingdoms[attackingKingdom][attackingGeneral]*0.9)
                kingdoms[defendingKingdom][defendingGeneral]=Math.floor(kingdoms[defendingKingdom][defendingGeneral]*1.1)

                generalsLoses[attackingGeneral]++;
                kingdomsLoses[attackingKingdom]++;
                generalsWins[defendingGeneral]++;
                kingdomsWins[defendingKingdom]++;
            }
        }

    }

    let keys = Object.keys(kingdoms).sort((k1, k2) => {
        let diffInWins = kingdomsWins[k2] - kingdomsWins[k1];

        if (diffInWins === 0) {
            let diffInLoses = kingdomsLoses[k1] - kingdomsLoses[k2];
            if (diffInLoses === 0) {
                return k1.localeCompare(k2);
            }
            return diffInLoses;
        }
        return diffInWins;
    })
    let winner = keys[0];
    console.log(`Winner: ${winner}`);
    let sortedGenerals = Object.keys(kingdoms[winner]).sort((g1, g2) => {
        return kingdoms[winner][g2] - kingdoms[winner][g1];
    })

    for (const sortedGeneral of sortedGenerals) {
        console.log(`/\\general: ${sortedGeneral}`)
        console.log(`---army: ${kingdoms[winner][sortedGeneral]}`)
        console.log(`---wins: ${generalsWins[sortedGeneral]}`)
        console.log(`---losses: ${generalsLoses[sortedGeneral]}`)
    }
}

battles([{kingdom: "Maiden Way", general: "Merek", army: 5000},
        {kingdom: "Stonegate", general: "Ulric", army: 4900},
        {kingdom: "Stonegate", general: "Doran", army: 70000},
        {kingdom: "YorkenShire", general: "Quinn", army: 0},
        {kingdom: "YorkenShire", general: "Quinn", army: 2000},
        {kingdom: "Maiden Way", general: "Berinon", army: 100000}],
    [["YorkenShire", "Quinn", "Stonegate", "Ulric"],
        ["Stonegate", "Ulric", "Stonegate", "Doran"],
        ["Stonegate", "Doran", "Maiden Way", "Merek"],
        ["Stonegate", "Ulric", "Maiden Way", "Merek"],
        ["Maiden Way", "Berinon", "Stonegate", "Ulric"]]
)
// battles([ { kingdom: "Stonegate", general: "Ulric", army: 5000 },
//         { kingdom: "YorkenShire", general: "Quinn", army: 5000 },
//         { kingdom: "Maiden Way", general: "Berinon", army: 1000 } ],
//     [ ["YorkenShire", "Quinn", "Stonegate", "Ulric"],
//         ["Maiden Way", "Berinon", "YorkenShire", "Quinn"] ]
// )