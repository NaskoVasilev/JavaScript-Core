let player=require('./player.js')
let game=require('./game.js')

document.getElementById('startGame').addEventListener('click', function () {
    player.setName(document.getElementById('playername').value); // player.
    game.printGame(); // game.
});

// add click handler to the calculate score button
document.getElementById('calculate').addEventListener('click', function () {
    game.calculateScore(); // game.
});

// set the default number of problems
document.getElementById('problemCount').value = game.getProblemCount();