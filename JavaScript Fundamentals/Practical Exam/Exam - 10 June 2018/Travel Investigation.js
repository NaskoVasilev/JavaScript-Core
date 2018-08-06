function findValidSentences(dataLines) {
    let validSentences = [];
    let invalidSentences = [];

    let companiesInfo = dataLines.shift();
    let delimiter = dataLines.shift();
    let companies = companiesInfo.split(delimiter)
        .filter(x => x !== "")
        .map(x => x.trim());
    dataLines = dataLines.map(s => s.toLowerCase());

    for (const sentence of dataLines) {
        let isValid = true;

        for (const company of companies) {
            if (!sentence.includes(company)) {
                isValid = false;
            }
        }

        if (isValid) {
            validSentences.push(sentence);
        }
        else {
            invalidSentences.push(sentence);
        }
    }


    if (validSentences.length > 0) {
        console.log('ValidSentences')
        for (let i = 0; i < validSentences.length; i++) {
            console.log(`${i + 1}. ${validSentences[i]}`)
        }
    }

    if (validSentences.length > 0 && invalidSentences.length > 0) {
        console.log("==============================")
    }

    if (invalidSentences.length > 0) {
        console.log('InvalidSentences')
        for (let i = 0; i < invalidSentences.length; i++) {
            console.log(`${i + 1}. ${invalidSentences[i]}`)
        }
    }
}

findValidSentences(["bulgariatour@, minkatrans@, koftipochivkaltd",
    "@,",
    "Mincho e KoftiPochivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
    "dqdo mraz some text but is KoftiPochivkaLTD MinkaTrans",
    "someone continues as no "]
)
console.log()
findValidSentences(["bulgariatour@, minkatrans@, koftipochivkaltd",
    "@,",
    "Mincho  e KoftiPockivkaLTD Tip 123  ve MinkaTrans BulgariaTour",
    "We will koftipochivkaLTD travel e expenses no MinkaTrans mu e BulgariaTour",
    "dqdo BuLGariaTOUR mraz some text but is KoftiPochivkaLTD minkaTRANS"]
)