

function solve(arr) {
    let result = '<?xml version="1.0" encoding="UTF-8"?>\n';
    result += '<quiz>\n';
    for (let i = 0; i < arr.length; i += 2) {
        let question = arr[i];
        let answer=arr[i + 1];

        let text = generateText(question, answer);


        result += `${text}`;

    }
    result += '</quiz>\n';

    console.log(result);

    function generateText(question, answer) {
        let text = `  <question>\n    ${question}\n  </question>\n  <answer>\n    ${answer}\n  </answer>\n`;

        return text;
    }
}

solve(["Dry ice is a frozen form of which gas?",
    "Carbon Dioxide",
    "What is the brightest star in the night sky?",
    "Sirius"]
);