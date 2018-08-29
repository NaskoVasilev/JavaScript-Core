let results = [];

function addResult(newResult) {
    results.push(newResult);
}
function updateScoreboard() {

    let output = `<h2>Scoreboard</h2>`;

    // loop over all results and create the html for the scoreboard
    for (let result of results) {
        output += `<h4>${result.name}: ${result.score}/${result.problems} for factor ${result.factor}</h4>`
    }

    // add the updated scoreboard to the page
    let scoresElement = document.getElementById('scores');
    scoresElement.innerHTML = output;
}

module.exports={updateScoreboard,addResult};