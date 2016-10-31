/* jshint node: true */
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

var blank = function(gridNum) {
    var rows = {
        r1 : '         ',
        r2 : '    ' + gridNum + '    ',
        r3 : '         ',
    };
    return rows;
};

// Returns a string representing the game grid.
var gameToString = function(game) {
    var gameString = '\n';
    var gridNum = 0;
    for (var i = 0; i < 3; i++) {
        var row1 = '\n';
        var row2 = '\n';
        var row3 = '\n';
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
            }
            row1+=element.r1;
            row2+=element.r2;
            row3+=element.r3;
            if (j < 2) {
                row1+='|';
                row2+='|';
                row3+='|';
            }
        }
        gameString += row1 + row2 + row3;
        if (i < 2) {
            gameString += '\n---------|---------|---------';
        }
    }
    return gameString + '\n';
};

// Make a move, at position gridNum with mark 'X' or 'O'.
// Returns an array containing whether the move was successful
// or not, and an error message if the first value of the array is false.
var move = function(game, gridNum, mark) {
    var isValid = (gridNum >= 1 && gridNum <= 9);
    if (game[gridNum] !== undefined) {
        return [false, 'This spot has already been taken. ' +
                       'Choose another!'];
    } else if (isValid) {
        game[gridNum] = mark;
        return [true];
    }
    return [false, 'Your input is invalid.'];
};

// Checks for game completion, given game board.
// Returns 'X' or 'O' if there is a win, and undefined otherwise.
var done = function(game) {
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
        }

        // Check for horizontal three-in-a-row.
        var j = i + i * (i-1);
        mark = game[j];
        var horizontalWin = (mark == game[j+1] && mark == game[j+2]);
        if (horizontalWin) {
            return mark;
        }
    }
    return undefined;
};

var newGame = function() {
    return {};
};

module.exports.newGame = newGame;
module.exports.done = done;
module.exports.move = move;
module.exports.gameToString = gameToString;
