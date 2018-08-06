function parseSurvey(data) {
    //let regex=/<svg><cat><text>.*?\[(.+?)\].*?<\/text><\/cat>\s*<cat>(<g><val>([\s\S]*)<\/val>([\s\S]*)<\/g>)+<\/cat><\/svg>/
    let regex=/<svg>[\s\S]*?<cat>[\s\S]*?<text>[\s\S]*?\[([\s\S]+)\][\s\S]*?<\/text>[\s\S]*?<\/cat>[\s\S]*?<cat>([\s\S]+)<\/cat><\/svg>/
    let surveyRegex=/<svg>.+<\/svg>/
    let rateRegex=/<g><val>([0-9]|10)<\/val>(\d+)<\/g>/g

    if(data.match(surveyRegex)){
        let match=regex.exec(data);

        if(match){
            let label=match[1];

            let rate="";
            let totalRate=0;
            let count=0;
            while (rate=rateRegex.exec(data)){
                let votes=Number(rate[1]);
                let value=Number(rate[2]);
                totalRate+=votes*value;
                count+=value;
            }

            let averageRate=totalRate/count;
            averageRate=averageRate.toFixed(2);
            console.log(`${label}: ${(averageRate*100)/100}`)
        }
        else{
            console.log("Invalid format")
        }

    }
    else{
        console.log("No survey found")
    }

}

parseSurvey("<p>Some random text</p><svg><cat><text>How do you rate our food? [Food - General]</text></cat><cat><g><val>1</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></cat></svg><p>Some more random text</p>")