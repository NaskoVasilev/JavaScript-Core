let player=require('./player.js')
let scoreboard=require('./scoreboard.js')

// private members
let factorElement = document.getElementById('factor');
let problemsPerGame = 3; // set default value

function printGame() {

    player.logPlayer(); // player.

    // determine the number of problems to show
    setProblemCount(document.getElementById('problemCount').value);

    // create the html for the current game
    let gameForm = '';
    for (let i = 1; i <= problemsPerGame; i++) {
        gameForm += `<div class="form-group">`;
        gameForm += `<label for="answer${i}" class="col-sm-2 control-label">`;
        gameForm += `${factorElement.value} x ${i} = </label>`;
        gameForm += `<div class="col-sm-1"><input type="text" class="form-control" id="answer${i}">`;
        gameForm += `</div>`;
    }

    // add the new game to the page
    let gameElement = document.getElementById('game');
    gameElement.innerHTML = gameForm;

    // enable the calculate score button
    document.getElementById('calculate').removeAttribute('disabled');
}


function calculateScore() {

    let problemsInGame = getProblemCount();
    let score = 0;

    // loop trough the text boxes and calculate the number that are correct
    for (let i = 1; i <= problemsInGame; i++) {
        let answer = document.getElementById(`answer${i}`).value;
        if(i * factorElement.value == answer) {
            score++;
        }
    }

    //create a new result object to pass to the scoreboard
    let result = {
        name: player.getName(), // player.
        score: score,
        problems: problemsInGame,
        factor: factorElement.value
    };

    // add the result and update the scoreboard
    scoreboard.addResult(result); //scoreboard.
    scoreboard.updateScoreboard(); //scoreboard.

    // disable calculate score button
    document.getElementById('calculate').setAttribute('disabled', 'true');
}

function setProblemCount(newProblemCount) {
    problemsPerGame = newProblemCount;
}

function getProblemCount() {
    return problemsPerGame;
}

module.exports={printGame,getProblemCount,calculateScore}