var readlineSync = require('readline-sync');

// var game = {};
var player1 = 0;
var player2 = 0;

var X = {
    r1 : '         ',
    r2 : '    \\/   ',
    r3 : '    /\\   ',
};

var O = {
    r1 : '    _    ',
    r2 : '   | |   ',
    r3 : '   |_|   ',
};

function blank(gridNum) {
    var rows = {
        r1 : '         ',
        r2 : '    ' + gridNum + '    ',
        r3 : '         ',
    };
    return rows;
};

function printGrid(game) {
    console.log();
    var gridNum = 0;
    for (var i = 0; i < 3; i++) {
        row1 = '';
        row2 = '';
        row3 = '';
        for (var j = 0; j < 3; j++) {
            gridNum++;
            var element;
            switch(game[gridNum]) {
                case 'X':
                    element = X;
                    break;
                case 'O':
                    element = O;
                    break;
                default:
                    element = blank(gridNum);
                    break;
            };
            row1+=element['r1'];
            row2+=element['r2'];
            row3+=element['r3'];
            if (j < 2) {
                row1+='|';
                row2+='|';
                row3+='|';
            };
        };
        console.log(row1);
        console.log(row2);
        console.log(row3);
        if (i < 2) {
            console.log('---------|---------|---------');
        };
    };
    console.log();
};

function play(game) {
    var mark, gridPos, winner, quit, player;
    var first = false;
    console.log('Let\'s play tictactoe!');
    console.log('\nINSTRUCTIONS: \nWhen it is your turn, select ' +
                'a spot by choosing a number from 1 to 9!');
    console.log('Alternatively, you can give up by typing \'I surrender\'.');
    playloop:
    while (true) {
        winner = undefined;
        gameloop:
        for (var i = 0; i < 9; i++) {
            if (first) {
                player = i + 1;
            } else {
                player = i;
            };
            printGrid(game);
            if (player % 2 == 0) {
                mark = 'X';
                console.log('\nPlayer 1:');
            } else {
                mark = 'O';
                console.log('\nPlayer 2:');
            };
            gridPos = -1;
            while (true) {
                gridPos = readlineSync.question('-> ');
                var isValid = (gridPos >= 1 || gridPos <= 9);
                if (game[gridPos] != undefined) {
                    console.log('This spot has already been taken. ' +
                                'Choose another!');
                } else if (isValid) {
                    break;
                } else if (gridPos == 'I surrender') {
                    console.log('Surrender accepted.');
                    if (mark == 'X') {
                        winner = 'O';
                    } else {
                        winner = 'X';
                    };
                    break gameloop;
                } else {
                    console.log('Your input is invalid.');
                };
            };
            game[gridPos] = mark;
            winner = done(game);
            if (winner == 'X') {
                console.log('\nPlayer 1 wins!');
                player1++;
                break;
            } else if (winner == 'O') {
                console.log('\nPlayer 2 wins!');
                player2++;
                break;
            };
        };
        printGrid(game);
        if (winner == undefined) {
            console.log('This game ended in a draw.');
        }
        console.log('\n------------------\n' +
                    'CURRENT SCOREBOARD:' +
                    '\nPLAYER 1: ' + player1 + 
                    '\nPLAYER 2: ' + player2);
        quit = readlineSync.question('\n\nDo you wish to quit the game ' +
                                        'now? Type \'q\' to quit.\n-> ');
        if (quit == 'q' || quit == 'Q') {
            break playloop;
        };
        console.log('\n\nNEW GAME:');
        first = !first;
        game = {};
    };
    console.log('\n\nThank you for playing!' +
                '\nOVERALL WINNER:');
    if (player1 > player2) {
        console.log('PLAYER 1!');
    } else if (player2 > player1) {
        console.log('PLAYER 2!');
    } else {
        console.log('EVERYONE IS A WINNER! :) (Both players tied!)');
    }
    console.log();
};


// Checks for game completion, given game board.
// Returns 'X' or 'O' if there is a win, and undefined otherwise.
function done(game) {
    for (var i = 1; i <= 3; i++) {
        var mark = game[i];
        var leftDiagonalWin = (i == 1 && mark == game[i+4] && 
                               mark == game[i+8]);
        var rightDiagonalWin = (i == 3 && mark == game[i+2] && 
                                mark == game[i+4]);
        var verticalWin = (mark == game[i+3] && mark == game[i+6]);

        if (leftDiagonalWin) {
            return mark;
        } else if (rightDiagonalWin) {
            return mark;
        } else if (verticalWin) {
            return mark;
        };

        // Check for horizontal three-in-a-row.
        var j = i + i * (i-1);
        console.log(i +' ' +j);
        mark = game[j];
        var horizontalWin = (mark == game[j+1] && mark == game[j+2]);
        if (horizontalWin) {
            return mark;
        };
    };
    return undefined;
};

play({});


