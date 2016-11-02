/* jshint node: true */
var readlineSync = require('readline-sync');
var sb = require('./scoreboard.js');
var tictactoe = require('./tictactoe.js');

// Play.
var play = function() {
    var quit;
    var scoreboard = sb.createScoreBoard();
    var player1First = true;
    console.log('Let\'s play tictactoe!\nINSTRUCTIONS: \nWhen it is ' +
                'your turn, select a spot by choosing a number from 1 to 9!');
  
    while (true) {
        playRound(player1First, scoreboard);
        console.log(sb.scoreboardToString(scoreboard));
        quit = readlineSync.question('\n\nDo you wish to quit the game ' +
                                        'now? Type \'q\' to quit.\n-> ');
        if (quit == 'q' || quit == 'Q') {
            break;
        }
        player1First = !player1First;
    }
    end(scoreboard);
};

// Play a round of the game.
var playRound = function(player1First, scoreboard) {
    console.log('\n\nNEW GAME:');
    var game = tictactoe.newGame();
    if (scoreboard === undefined) {
        scoreboard = sb.createScoreBoard();
        player1First = true;
    }
    var player, gridPos, mark, winner;
    for (var i = 0; i < 9; i++) {
        if (player1First) {
            player = i;
        } else {
            player = i + 1;
        }
        console.log(tictactoe.gameToString(game));
        if (player % 2 === 0) {
            mark = 'X';
            console.log('\nPlayer 1:');
        } else {
            mark = 'O';
            console.log('\nPlayer 2:');
        }
        makeMove(game, mark);
        game[gridPos] = mark;
        winner = tictactoe.done(game);
        if (winner == 'X') {
            console.log('\nPlayer 1 wins!');
            sb.keepScore(scoreboard, mark);
            break;
        } else if (winner == 'O') {
            console.log('\nPlayer 2 wins!');
            sb.keepScore(scoreboard, mark);
            break;
        }
    }
    console.log(tictactoe.gameToString(game));
    if (winner === undefined) {
        console.log('This game ended in a draw.');
    }
};

// Get move from command line input.
function makeMove(game, mark) {
    var gridPos, result;
    while (true) {
        gridPos = readlineSync.question('-> ');
        result = tictactoe.move(game, gridPos, mark);
        if (result[0]) {
            break;
        }
        console.log(result[1]);
    }
}

// Print out overall winner at the end of the game.
function end(scoreboard) {
    console.log('\n\nThank you for playing!');
    var overallWinner = sb.overallWinner(scoreboard);
    if (overallWinner === 1) {
        console.log('OVERALL WINNER: PLAYER 1!');
    } else if (overallWinner === 2) {
        console.log('OVERALL WINNER: PLAYER 2!');
    } else {
        console.log('EVERYONE IS A WINNER! :) (Both players tied!)');
    }
    console.log();
}

module.exports.play = play;
module.exports.playRound = playRound;

