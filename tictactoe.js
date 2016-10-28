const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// Game introduction
function intro() {
    console.log("Let's play tictactoe!")
    console.log();
    console.log("         |         |         ");
    console.log("    1    |    2    |    3    ");
    console.log("         |         |         ");
    console.log("---------|---------|---------");
    console.log("         |         |         ");
    console.log("    4    |    5    |    6    ");
    console.log("         |         |         ");
    console.log("---------|---------|---------");
    console.log("         |         |         ");
    console.log("    7    |    8    |    9    ");
    console.log("         |         |         ");
    console.log("When it is your turn, choose a number to mark the grid!");
};

game = {};

function X() {
    var row1, row2, row3;
    row1 = "         ";
    row2 = "    \\/   ";
    row3 = "    /\\   ";
    return [row1, row2, row3];
};

function O() {
    var row1, row2, row3;
    row1 = "    _    ";
    row2 = "   | |   ";
    row3 = "   |_|   ";
    return [row1, row2, row3];
}

function blank() {
    var row1, row2, row3;
    row1 = "         ";
    row2 = "         ";
    row3 = "         ";
    return [row1, row2, row3];
}

function printgrid() {
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
                case 'X':
                    element = X();
                    break;
                case 'O':
                    element = O();
                    break;
                default:
                    element = blank();
                    break;
            };
            row1+=element[0];
            row2+=element[1];
            row3+=element[2];
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
    for (var i = 0; i < 9; i++) {
        var mark;
        if (i % 2 == 0) {
            mark = 'X';
            console.log("Player 1, please select a grid.");
        } else {
            mark = 'O';
            console.log("Player 2, please select a grid.");
        };

        // var response = -1;
        // while (response < 0 || response > 9) {
        //     rl.question('Player 1, please select a grid. ', (response) => {});
        // }
        // rl.close();
        // var response = readline();
        // while (response < 0 || response > 9) {
        //     console.log("This number does not correspond to a grid. Try again.");
        //     response = readline();
        // };


    };
};

play();


