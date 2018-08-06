function orderGladiators(arr) {
    let gladiators = {};
    let totalSkill = {};

    for (const gladiatorInfo of arr) {
        if (gladiatorInfo.includes(" -> ")) {
            let [name, technique, skill] = gladiatorInfo.split(' -> ');
            skill = Number(skill);
            if (!gladiators.hasOwnProperty(name)) {
                gladiators[name] = {};
                gladiators[name][technique] = skill;
                totalSkill[name] = skill;
            }
            else {
                if (!gladiators[name].hasOwnProperty(technique)) {
                    gladiators[name][technique] = skill;
                    totalSkill[name] += skill;
                }
                else {
                    if (gladiators[name][technique] < skill) {
                        gladiators[name][technique] = skill;
                        totalSkill[name] += skill - gladiators[name][technique];
                    }
                }
            }
        }
        else if (gladiatorInfo.includes(" vs ")) {
            let [firstGladiator, secondGladiator] = gladiatorInfo.split(" vs ")

            if (gladiators.hasOwnProperty(firstGladiator) && gladiators.hasOwnProperty(secondGladiator)) {
                for (const technique in gladiators[firstGladiator]) {
                    if (gladiators[secondGladiator].hasOwnProperty(technique)) {
                        let secondGladiatorSkill = gladiators[secondGladiator][technique];
                        let firstGladiatorSkill = gladiators[firstGladiator][technique];
                        if (firstGladiatorSkill < secondGladiatorSkill) {
                            delete gladiators[firstGladiator]
                            break;
                        }
                        else if (secondGladiatorSkill < firstGladiatorSkill) {
                            delete gladiators[secondGladiator]
                            break;
                        }
                    }
                }
            }
        }
        else {
            let outerKeys = Object.keys(gladiators).sort((a, b) => {
                let differneceInTotalScore = totalSkill[b] - totalSkill[a];
                if (differneceInTotalScore === 0) {
                    return a.localeCompare(b);
                }
                return differneceInTotalScore
            })

            for (const outerKey of outerKeys) {
                console.log(`${outerKey}: ${totalSkill[outerKey]} skill`);
                let innerKeys = Object.keys(gladiators[outerKey]).sort((a, b) => {
                    let differneceInScore = gladiators[outerKey][b] - gladiators[outerKey][a];
                    if (differneceInScore === 0) {
                        return a.localeCompare(b);
                    }
                    return differneceInScore
                })

                for (const innerKey of innerKeys) {
                    console.log(`- ${innerKey} <!> ${gladiators[outerKey][innerKey]}`)
                }
            }
        }
    }

}

orderGladiators(
    [
        'Pesho -> BattleCry -> 400',
        'Gosho -> PowerPunch -> 300',
        'Stamat -> Duck -> 200',
        'Stamat -> Tiger -> 250',
        'Ave Cesar',
    ]
)
orderGladiators(
    [
        'Pesho -> Duck -> 400',
        'Julius -> Shield -> 150',
        'Gladius -> Heal -> 200',
        'Gladius -> Support -> 250',
        'Gladius -> Shield -> 250',
        'Pesho vs Gladius',
        'Gladius vs Julius',
        'Gladius vs Gosho',
        'Ave Cesar',
    ]
)