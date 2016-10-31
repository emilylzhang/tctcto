/* jshint node: true */

// Creates a scoreboard to hold player 1 and player 1's scores.
var createScoreBoard = function() {
    return {player1 : 0, player2 : 0};
};

// Returns a number representing the overall winner, or 0 if there is a draw.
var overallWinner = function(scoreboard) {
    if (scoreboard.player1 > scoreboard.player2) {
        return 1;
    } else if (scoreboard.player2 > scoreboard.player1) {
        return 2;
    }
    return 0;
};

// Returns a string representing the scoreboard.
var scoreboardToString = function(scoreboard) {
    return '\n------------------\n' +
           'CURRENT SCOREBOARD:' +
           '\nPLAYER 1: ' + scoreboard.player1 + 
           '\nPLAYER 2: ' + scoreboard.player2;
};

// Increments score for the winning player.
var keepScore = function(scoreboard, mark) {
    if (mark === 'X') {
        scoreboard.player1++;
    } else if (mark === 'O') {
        scoreboard.player2++;
    }
};

module.exports.keepScore = keepScore;
module.exports.createScoreBoard = createScoreBoard;
module.exports.overallWinner = overallWinner;
module.exports.scoreboardToString = scoreboardToString;
