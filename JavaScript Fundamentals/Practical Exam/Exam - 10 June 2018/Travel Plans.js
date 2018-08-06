function calculateGold(arr) {
    let specializedProfessions = ['Programming', 'Hardware maintenance', 'Cooking', 'Translating', 'Designing']
    let averageProfessions = ['Driving', 'Managing', 'Fishing', 'Gardening']
    let clumsyProfessions = ['Singing', 'Accounting', 'Teaching', 'Exam-Making', 'Acting', 'Writing', 'Lecturing', 'Modeling', 'Nursing']

    let totalGold = 0;
    let specializedCustomers = 0;
    let clumsyCustomers = 0;
    for (const line of arr) {
        let [profession, gold] = line.split(" : ");

        gold = Number(gold);

        if (specializedProfessions.includes(profession)) {

            if (gold >= 200) {
                specializedCustomers++;
                totalGold += gold * 0.8;
                if (specializedCustomers % 2 === 0) {
                    totalGold += 200;
                }
            }
        }
        else if (averageProfessions.includes(profession)) {
            totalGold += gold;
        }
        else if (clumsyProfessions.includes(profession)) {
            clumsyCustomers++;
            totalGold += gold;
            if (clumsyCustomers % 2 === 0) {
                totalGold -= gold * 0.05;
            }
            else if (clumsyCustomers % 3 === 0) {
                totalGold -= gold * 0.1;
            }
        }
    }

    console.log(`Final sum: ${totalGold.toFixed(2)}`)

    if (totalGold < 1000) {
        console.log(`Mariyka need to earn ${(1000 - totalGold).toFixed(2)} gold more to continue in the next task.`)
    }
    else {
        console.log(`Mariyka earned ${(totalGold - 1000).toFixed(2)} gold more.`)
    }
}

calculateGold(["Programming : 500", "Driving : 243.55", "Acting : 200", "Singing : 100", "Cooking : 199", "Hardware maintenance : 800", "Gardening : 700", "Programming : 500"])
console.log()
calculateGold(["Programming : 500", "Driving : 243", "Singing : 100", "Cooking : 199"])