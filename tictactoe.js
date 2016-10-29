var readlineSync = require('readline-sync');

var game = {};
var player1 = 0;
var player2 = 0;

const x = {
    r1 : "         ",
    r2 : "    \\/   ",
    r3 : "    /\\   "
};

const o = {
    r1 : "    _    ",
    r2 : "   | |   ",
    r3 : "   |_|   "
};

function blank(gridNum) {
    var rows = {
        r1 : "         ",
        r2 : "    " + gridNum + "    ",
        r3 : "         "
    };
    return rows;
};

function printGrid() {
    console.log();

    num = Object.keys(game).length;
    var gridNum = 0;
    for (var i = 0; i < 3; i++) {
        row1 = "";
        row2 = "";
        row3 = "";
        for (var j = 0; j < 3; j++) {
            gridNum++;
            var element;
            switch(game[gridNum]) {
                case "X":
                    element = x;
                    break;
                case "O":
                    element = o;
                    break;
                default:
                    element = blank(gridNum);
                    break;
            };
            row1+=element["r1"];
            row2+=element["r2"];
            row3+=element["r3"];
            if (j < 2) {
                row1+="|";
                row2+="|";
                row3+="|";
            };
        };
        console.log(row1);
        console.log(row2);
        console.log(row3);
        if (i < 2) {
            console.log("---------|---------|---------");
        };
    };
    console.log();
};

function play() {
    var mark, gridPos, winner, quit, player;
    var first = false;
    console.log("Let's play tictactoe!");
    console.log("\nINSTRUCTIONS: \nWhen it is your turn, select " +
                "a spot by choosing a number from 1 to 9!");
    console.log("Alternatively, you can give up by typing 'I surrender'.");
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
            printGrid();
            if (player % 2 == 0) {
                mark = "X";
                console.log("\nPlayer 1:");
            } else {
                mark = "O";
                console.log("\nPlayer 2:");
            };
            gridPos = -1;
            while (true) {
                gridPos = readlineSync.question("-> ");
                if (game[gridPos] != undefined) {
                    console.log("This spot has already been taken. " + 
                                "Choose another!");
                } else if (gridPos >= 1 || gridPos <= 9) {
                    break;
                } else if (gridPos == "I surrender") {
                    console.log("Surrender accepted.");
                    if (mark == "X") {
                        winner = "O";
                    } else {
                        winner = "X";
                    };
                    break gameloop;
                } else {
                    console.log("Your input is invalid.");
                };
            };
            game[gridPos] = mark;
            winner = done();
            if (winner == "X") {
                console.log("\nPlayer 1 wins!");
                player1++;
                break;
            } else if (winner == "O") {
                console.log("\nPlayer 2 wins!");
                player2++;
                break;
            };
        };
        printGrid();
        if (winner == undefined) {
            console.log("This game ended in a draw.");
        }
        console.log("\n------------------\n" + 
                    "CURRENT SCOREBOARD:" +
                    "\nPLAYER 1: " + player1 + 
                    "\nPLAYER 2: " + player2);
        quit = readlineSync.question("\n\nDo you wish to quit the game " +
                                        "now? Type 'q' to quit.\n-> ");
        if (quit == "q" || quit == "Q") {
            break playloop;
        };
        console.log("\n\nNEW GAME:");
        first = !first;
        game = {};
    };
    console.log("\n\nThank you for playing!" +
                "\nOVERALL WINNER:");
    if (player1 > player2) {
        console.log("PLAYER 1!");
    } else if (player2 > player1) {
        console.log("PLAYER 2!");
    } else {
        console.log("EVERYONE IS A WINNER! :) (Both players tied!)");
    }
    console.log();
};


// Checks for game completion.
function done() {
    for (var i = 1; i <= 3; i++) {
        var mark = game[i];
        if (i == 1 && mark == game[i+4] && mark == game[i+8]) {
            // Check diagonal to the left.
            return mark;
        } else if (i == 3 && mark == game[i+2] && mark == game[i+4]) {
            // Check diagonal to the right.
            return mark;
        } else if (mark == game[i+3] && mark == game[i+6]) {
            // Check for vertical three-in-a-row.
            return mark;
        };
        // Check for horizontal three-in-a-row.
        var j = i + i * (i-1);
        console.log(i +" " +j);
        mark = game[j];
        if (mark == game[j+1] && mark == game[j+2]) {
            return mark;
        };
    };
    return undefined;
};

play();


