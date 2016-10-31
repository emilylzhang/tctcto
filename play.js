/* jshint node: true */
var readlineSync = require('readline-sync');
var sb = require('./scoreboard.js');
var tictactoe = require('./tictactoe');

function play() {
    var mark, gridPos, winner, quit, player;
    var scoreboard = sb.createScoreBoard();
    var first = false;
    console.log('Let\'s play tictactoe!\nINSTRUCTIONS: \nWhen it is ' +
                'your turn, select a spot by choosing a number from 1 to 9!');
  
    playloop:
    while (true) {
        game = tictactoe.newGame();
        winner = undefined;
        gameloop:
        for (var i = 0; i < 9; i++) {
            if (first) {
                player = i + 1;
            } else {
                player = i;
            }
            console.log(tictactoe.gameToString(game));
            if (player % 2 === 0) {
                mark = 'X';
                console.log('\nPlayer 1:');
            } else {
                mark = 'O';
                console.log('\nPlayer 2:');
            }
            gridPos = -1;
            while (true) {
                gridPos = readlineSync.question('-> ');
                var result = tictactoe.move(game, gridPos, mark);
                if (result[0]) {
                    break;
                }
                console.log(result[1]);
            }
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
        console.log(sb.scoreboardToString(scoreboard));
        quit = readlineSync.question('\n\nDo you wish to quit the game ' +
                                        'now? Type \'q\' to quit.\n-> ');
        if (quit == 'q' || quit == 'Q') {
            break playloop;
        }
        console.log('\n\nNEW GAME:');
        first = !first;
    }
    console.log('\n\nThank you for playing!' +
                '\nOVERALL WINNER:');
    var overallWinner = sb.overallWinner(scoreboard);
    if (overallWinner === 1) {
        console.log('PLAYER 1!');
    } else if (overallWinner === 2) {
        console.log('PLAYER 2!');
    } else {
        console.log('EVERYONE IS A WINNER! :) (Both players tied!)');
    }
    console.log();
}

play();
