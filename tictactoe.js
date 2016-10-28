var readlineSync = require('readline-sync');

game = {};

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

// var prompt = require("prompt");
// prompt.message = "";
// prompt.start();

// var property = {
//     name: "gridPos",
//     message: "Please select a grid!",
//     type: "integer",
//     minumum: 1,
//     maximum: 9,
//     warning: "Please choose a number from 1 - 9",
//     required: true,
//     conform: function (pos) {
//         if (game[pos] == undefined) return true;
//         return false;
//     }
// };

function play() {
    console.log("Let's play tictactoe!");
    console.log("\nINSTRUCTIONS: \nWhen it is your turn, select " +
                "a spot by choosing a number from 1 to 9!");
    for (var i = 0; i < 9; i++) {
        printGrid();
        var mark, gridPos;
        if (i % 2 == 0) {
            mark = "X";
            console.log("\nPlayer 1:");
        } else {
            mark = "O";
            console.log("\nPlayer 2:");
        };
        gridPos = -1;
        while (true) {
            gridPos = readlineSync.question("-> ")
            if (gridPos < 1 || gridPos > 9) {
                console.log("Your input is an invalid number.");
            } else if (game[gridPos] != undefined) {
                console.log("This spot has already been taken. Choose another!");
            } else {
                break;
            };
        }
        game[gridPos] = mark;
        // prompt.get(property, function (err, result) {
        //     console.log("Command-line input received:" + result.gridPos);
        // });


    };
};

play();


