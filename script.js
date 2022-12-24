function cleanBoard(N) {
    // Create a random game board
    var game_board = document.getElementById('game-board');
    game_board.innerHTML = "";
}

function setBoard(N) {
    player1Turn = true
    solved = false;
    // Create a random game board
    var game_board = document.getElementById('game-board');
    game_board.innerHTML = "";

    // console.log("setting board")
    const empty_placeholder = '_';
    var values = [empty_placeholder];
    for (let index = 0; index < N - 1; index++) {
        values.push(String.fromCharCode(65 + index));
    }


    all_poss_set = gen_all_swaps(values, k);
    all_possible = Array.from(all_poss_set);
    if (no_of_players == 2) {
        game_started = false
    } else {
        var item = all_possible[Math.floor(Math.random() * all_possible.length)];
        values = item.split(',');
    }

    // console.log("setting board 2")
    for (let index = 0; index < N; index++) {
        const div = document.createElement("div");
        div.id = index;
        div.classList.add("circle")
        div.classList.add("active-circle")
        div.setAttribute("onclick", 'swap("' + index + '")')
        if (values[index] != empty_placeholder) {
            const para = document.createElement("p");
            para.innerText = values[index];
            div.appendChild(para);
        }
        game_board.appendChild(div);
    }

    arrangeInCircles(N);

    if (no_of_players == 2) {
        startBtn = document.getElementById('start-button');
        startBtn.classList.remove('d-none');
        move_map = gen_adversarial_moves(current_state(true), Array.from(all_poss_set), k)
    }
}

function arrangeInCircles(N) {
    // Place the circles in a round table fashion
    var elems = document.getElementsByClassName('circle');
    var increase = Math.PI * 2 / elems.length;
    var x = 0, y = 0, angle = 0;

    // could be non-linear relationship
    var radius = 10 * N + 50
    for (var i = 0; i < elems.length; i++) {
        elem = elems[i];
        // modify to change the radius and position of a circle
        x = radius * Math.cos(angle) + 300;
        y = radius * Math.sin(angle) + 300;
        elem.style.position = 'absolute';
        // console.log("x", x)
        elem.style.left = x + 'px';
        elem.style.top = y + 'px';
        angle += increase;
    }
}

function start() {
    game_started = true
    for (node of current_state(true, true)) {
        node.classList.remove('selected-circle', 'valid-circle')
        node.classList.add('circle', 'active-circle')
    }

    startButton = document.getElementById('start-button');
    startButton.classList.add('d-none');
    updateInstructions(player1Name, key = true);
    updateInstructions("Arrange the chairs alphabetically in the clockwise direction without gaps");

    solved = consecutive(current_state(true));
    if (solved) {
        declareWinner();
    }
}

// Returns true if second chair also passed
// otherwise returns false
function player1Move(param) {
    if (solved) {
        return false;
    }

    if (var1 == null) {
        var1 = document.getElementById(param);
        var1.classList.add('selected-circle');

        return false;
    }

    var var2 = document.getElementById(param);

    if (isInValidSwap(var1.id, var2.id)) {
        var1.classList.remove('selected-circle');
        var1 = null;
        return false;
    }

    if (var1.children.length == 0) {
        var1.appendChild(var2.childNodes[0]);
        var2.innerHTML = "";
    } else if (var2.children.length == 0) {
        var2.appendChild(var1.childNodes[0]);
        var1.innerHTML = "";
    } else {
        var1.classList.remove('selected-circle');
        var1 = null;
        return false;
    }
    var1.classList.remove('selected-circle');
    var1 = null;

    solved = consecutive(current_state(true));
    counter++;
    document.getElementById(movesLabel).childNodes[1].innerHTML = counter;
    if (solved) {
        declareWinner();
    }
    return true;
}

function player2Move(param) {
    if (!document.getElementById(param).classList.contains('valid-circle')) {
        return;
    }

    if (var1 == null) {
        var1 = document.getElementById(param);
        var1.classList.add('selected-circle');

        move_map = gen_adversarial_moves(current_state(true), Array.from(all_poss_set), k)
        if (var1.children.length == 0) {
            moves = move_map[0].get('_')
        } else {
            moves = move_map[0].get(var1.childNodes[0].innerHTML)
        }

        for (node of current_state(true, true)) {
            if (node.children.length == 0 || moves.has(node.childNodes[0].innerHTML)) {
                node.classList.add('valid-circle');
            } else {
                node.classList.remove('active-circle');
            }
        }
        return false;
    }

    if (document.getElementById(param) == var1) {
        var1.classList.remove('selected-circle');
        var1 = null;
        move_map = gen_adversarial_moves(current_state(true), Array.from(all_poss_set), k)
        moves = new Set();
        for (let key of move_map[0].keys()) {
            moves.add(key)
        }

        for (node of current_state(true, true)) {
            if (node.children.length == 0 || moves.has(node.childNodes[0].innerHTML)) {
                node.classList.add('valid-circle');
                node.classList.add('active-circle');
            } else {
                node.classList.remove('active-circle');
            }
        }
        return
    }

    var var2 = document.getElementById(param);
    if (var1.children.length == 0) {
        var1.appendChild(var2.childNodes[0]);
        var2.innerHTML = "";
    } else if (var2.children.length == 0) {
        var2.appendChild(var1.childNodes[0]);
        var1.innerHTML = "";
    } else {
        temp = var1.childNodes[0]
        var1.removeChild(temp)
        var1.appendChild(var2.childNodes[0])
        var2.appendChild(temp)
    }
    var1.classList.remove('selected-circle');
    var1 = null;

    change_turn();
    for (node of current_state(true, true)) {
        node.classList.remove('selected-circle', 'valid-circle')
        node.classList.add('circle', 'active-circle')
    }

    passButton = document.getElementById('pass-button');
    passButton.classList.add('d-none');
    d--;
    //document.getElementById(scrambleLeftLabel).childNodes[1].innerHTML = d;

    solved = consecutive(current_state(true));
    if (solved) {
        declareWinner();
    }
    return true;
}

function isInValidSwap(id1, id2) {
    firstCheck = Math.abs(id1 - id2) != k[0] && N - Math.abs(id1 - id2) != k[0]
    secondCheck = Math.abs(id1 - id2) != k[1] && N - Math.abs(id1 - id2) != k[1]
    return firstCheck && secondCheck
}

function settingUpBoard(param) {
    if (var1 == null) {
        var1 = document.getElementById(param);
        var1.classList.add('selected-circle');
        return;
    }

    var var2 = document.getElementById(param);

    if (isInValidSwap(var1.id, var2.id)) {
        var1.classList.remove('selected-circle');
        var1 = null;
        return;
    }

    if (var1.children.length == 0) {
        var1.appendChild(var2.childNodes[0]);
        var2.innerHTML = "";
    } else if (var2.children.length == 0) {
        var2.appendChild(var1.childNodes[0]);
        var1.innerHTML = "";
    } else {
        var1.classList.remove('selected-circle');
        var1 = null;
        return
    }
    var1.classList.remove('selected-circle');
    var1 = null;
}

function swap(param) {
    if (!game_started) {
        settingUpBoard(param)
    } else if (player1Turn) {
        complete_move = player1Move(param)

        if (complete_move) {
            if (scrambleMode) {
                change_turn();
                if (d > 0) {
                    move_map = gen_adversarial_moves(current_state(true), Array.from(all_poss_set), k)
                    moves = new Set();
                    for (let key of move_map[0].keys()) {
                        // console.log(typeof moves)
                        moves.add(key)
                    }

                    // console.log("moves", moves)

                    for (node of current_state(true, true)) {
                        if (node.children.length == 0 || moves.has(node.childNodes[0].innerHTML)) {
                            node.classList.add('valid-circle');
                        } else {
                            node.classList.remove('active-circle');
                        }
                    }

                    passButton = document.getElementById('pass-button');
                    passButton.classList.remove('d-none');

                    // Update instructions
                    updateInstructions(player2Name, key = true);
                    updateInstructions("Scramble the green chairs, or pass!")
                }
            }
        }

        if (solved) {
            updateInstructions(player1Name, key = true);
            if (secondRound) {
                updateInstructions("You did it! The chairs are sorted." +
                    "</br>Click 'Results' to see who won!")
            } else {
                updateInstructions("You did it! The chairs are sorted."
                    + "</br>Click 'Next Round' to swap positions.")
            }
        }
    }
    else {
        complete_move = player2Move(param)
        if (complete_move) {
            updateInstructions(player1Name, key = true);
            updateInstructions("Arrange the chairs alphabetically in the clockwise direction without gaps");
        }

        if (solved) {
            updateInstructions(player1Name, key = true);
            if (secondRound) {
                updateInstructions("You did it! The chairs are sorted." +
                    "</br>Click 'Results' to see who won!")
            } else {
                updateInstructions("You did it! The chairs are sorted."
                    + "</br>Click 'Next Round' to swap positions.")
            }
        }
    }
}

function pass() {
    if (var1 != null) {
        var1.classList.remove('selected-circle');
        var1 = null;
    }
    change_turn();
    document.getElementById('pass-button').classList.add('d-none');

    for (node of current_state(true, true)) {
        node.classList.remove('selected-circle', 'valid-circle')
        node.classList.add('circle', 'active-circle')
    }

    if (complete_move) {
        updateInstructions(player1Name, key = true);
        updateInstructions("Arrange the chairs alphabetically in the clockwise direction without gaps");
    }
}

function current_state(include_all = false, div = false) {
    var elems = document.getElementsByClassName('circle');
    var array = [];
    for (var i = 0; i < elems.length; i++) {
        if (div) {
            array.push(elems[i]);
        } else {
            if (elems[i].children.length != 0) {
                array.push(elems[i].childNodes[0].innerHTML);
            } else if (include_all) {
                array.push('_');
            }
        }
    }
    return array
}

function change_turn() {
    if (no_of_players == 2 && d > 0) {
        player1Turn = !player1Turn;
        if (player1Turn) {
            nameDiv = document.getElementById('player1-name');
            nameDiv.innerHTML = "<p id='player1-name-value'>" + player1Name + " playing with width " + k + " </p>";

            name2Div = document.getElementById('player2-name');
            name2Div.innerHTML = "<p id='player2-name-value'>" + player2Name + " waiting </p>";
        } else {
            nameDiv = document.getElementById('player1-name');
            nameDiv.innerHTML = "<p id='player1-name-value'>" + player1Name + " waiting, width " + k + " </p>";

            name2Div = document.getElementById('player2-name');
            name2Div.innerHTML = "<p id='player2-name-value'>" + player2Name + " playing\nscrambles left " + d + " </p>";
        }
    }
}

function consecutive(arr) {
    console.log(arr);

    let flag = true;
    let second_index;
    let empty = -1;


    //get empty index
    for (let first_index = 0; first_index < arr.length; first_index++) {
        //console.log(first_index);
        if (arr[first_index].charCodeAt(0) == 95) {
            //console.log(arr[first_index].charCodeAt(0));
            empty = first_index;
            //console.log(empty);
        }
    }

    //console.log(empty);
    //empty index = 0
    if (empty == 0) {
        for (let first_index = 1; first_index < arr.length - 1; first_index++) {
            second_index = first_index + 1;
            if (arr[first_index].charCodeAt(0) - arr[second_index].charCodeAt(0) != -1) {
                //console.log(arr[first_index]);
                flag = false;
            }
        }
    }


    //if empty index = N-1

    else if (empty == arr.length - 1) {
        for (let first_index = 0; first_index < arr.length - 2; first_index++) {
            second_index = first_index + 1;
            if (arr[first_index].charCodeAt(0) - arr[second_index].charCodeAt(0) != -1) {
                //console.log(arr[first_index]);
                flag = false;
            }
        }
    }


    //empty spot in the middle of the array

    else if (empty > 0 && empty < arr.length - 1) {
        //check that chair to the left of empty and right of empty are first and last chair
        if (arr[empty - 1].charCodeAt(0) - arr[empty + 1].charCodeAt(0) != arr.length - 2) {
            flag = false;
        }

        // check array elements to the left of empty spot
        for (let first_index = 0; first_index < empty - 1; first_index++) {
            second_index = first_index + 1;
            if (arr[first_index].charCodeAt(0) - arr[second_index].charCodeAt(0) != -1) {
                //console.log(arr[first_index]);
                flag = false;
            }
        }

        // check array elements to the right of empty spot
        for (let first_index = empty + 1; first_index < arr.length - 1; first_index++) {
            second_index = first_index + 1;
            if (arr[first_index].charCodeAt(0) - arr[second_index].charCodeAt(0) != -1) {
                //console.log(arr[first_index]);
                flag = false;
            }
        }
    }


    console.log(flag);
    return flag;
}

function declareWinner() {
    player1Score = counter;
    document.getElementById('next-round-button').classList.remove('d-none');

    nameField = document.getElementById('player1-name-value');
    if (nameField != null) {
        nameDiv = document.getElementById('player1-name');
        nameDiv.innerHTML = "<p>" + player1Name + " wins </p>";
        // cleanBoard(N);
    }
    if (no_of_players == 2) {
        nameDiv = document.getElementById('player2-name');
        nameDiv.innerHTML = null;
    }
}

function newGame() {
    nameField = document.getElementById('player-1');
    if (nameField != null && document.getElementById('player-2') != null) {
        if (nameField.value != "") {
            player1Name = nameField.value;
        }

        if (document.getElementById('player-2').value != "") {
            player2Name = document.getElementById('player-2').value;
        }

        width1 = document.getElementById('swap-width1');
        if (!isEmpty(width1.value)) {
            console.log(width1.value);
            k[0] = Number(width1.value);
        }

        width2 = document.getElementById('swap-width2');
        if (!isEmpty(width2.value)) {
            console.log(width2.value);
            k[1] = Number(width2.value);
        }

        chairCount = document.getElementById('chair-count');
        if (!isEmpty(chairCount.value)) {
            // console.log(chairCount.value);
            N = Number(chairCount.value);
        }

        //for scrambling mode
        //distruptionCount = document.getElementById('scramble-count');
        //if (!isEmpty(distruptionCount.value)) { 
        // console.log(distruptionCount.value);
        //d = Number(distruptionCount.value);
        //scrambleCount = d;
        //}

        // console.log("New Game Clicked")
        // New layout of game
        gameInfo();
        setBoard(N);
    } else {
        InitInfoBoard();
        cleanBoard(N);
    }
}

function gameInfo() {
    infoBoard = document.getElementById("info-board");
    for (node of infoBoard.children) {
        if (!(node.id == 'new-game-button')) {
            node.classList.add("d-none")
        }
    }
    // Hack to restart the game
    document.getElementById("player-1").innerHTML = null;

    nameDiv = document.getElementById('player1-name');
    infoBoard.insertBefore(get_info_row(instructionLabel, "<b>" + "Set up the game by scrambling the chairs" + "</b>", player2Name + "'s Turn:"), nameDiv);
    infoBoard.insertBefore(get_info_row(movesLabel, 0), nameDiv);
    //infoBoard.insertBefore(get_info_row(scrambleLeftLabel, d), nameDiv);
    infoBoard.insertBefore(get_info_row(distanceLabel, k[0] + ", " + k[1]), nameDiv);
    infoBoard.insertBefore(get_info_row(player1Name + "'s " + scoreLabel, player1Score), nameDiv);
    if (no_of_players == 2) {
        infoBoard.insertBefore(get_info_row(player2Name + "'s " + scoreLabel, player2Score), nameDiv);
        name2Div = document.getElementById('player2-name');
        name2Div.innerHTML = "<p id='player2-name-value'>" + player2Name + " waiting </p>";
    }
    // console.log("Game Info generated")
}

function updateScore(player, score) {
    document.getElementById(player + "'s " + scoreLabel).childNodes[1].innerHTML = score;
}

function updateInstructions(update, key = false) {
    if (key) {
        document.getElementById(instructionLabel).childNodes[0].innerHTML = update + "'s Turn:";
    } else {
        document.getElementById(instructionLabel).childNodes[1].innerHTML = "<b>" + update + "</b>";
    }
}

function get_info_row(id, value, key_value = null) {
    var div = document.createElement("div");
    div.id = id;
    div.className = "row";
    key = document.createElement("p");
    key.className = "col";
    key.innerHTML = id;
    if (key_value != null) { key.innerHTML = key_value; }
    valueCont = document.createElement("p");
    valueCont.className = "col"
    valueCont.innerHTML = value
    div.appendChild(key);
    div.appendChild(valueCont);
    return div;
}

function getInitGameInfoHTML() {
    var player1NameDiv = document.createElement("div");
    player1NameDiv.id = "player1-name";
    player1NameDiv.className = "form-group";

    var label1 = document.createElement("label");
    label1.setAttribute("for", "player-1");
    label1.innerHTML = " Arranger Name ";
    player1NameDiv.appendChild(label1);

    var input1 = document.createElement("input");
    input1.setAttribute("type", "text");
    input1.setAttribute("class", "form-control");
    input1.setAttribute("placeholder", "Alice");
    input1.id = "player-1";
    player1NameDiv.appendChild(input1);

    // Swap width
    var swapWidthContainer = document.createElement("div");
    swapWidthContainer.id = "swap-width-container";
    swapWidthContainer.classList.add('form-group', 'row');

    var widthCol1 = document.createElement("div");
    widthCol1.className = "col";

    var label2 = document.createElement("label");
    label2.setAttribute("for", "swap-width1");
    label2.innerHTML = " Distance 1 ";
    widthCol1.appendChild(label2);

    var input2 = document.createElement("input");
    input2.setAttribute("type", "text");
    input2.setAttribute("class", "form-control");
    input2.setAttribute("placeholder", "2");
    input2.id = "swap-width1";
    widthCol1.appendChild(input2)
    swapWidthContainer.appendChild(widthCol1);

    var widthCol2 = document.createElement("div");
    widthCol2.className = "col";

    var label2_width2 = document.createElement("label");
    label2_width2.setAttribute("for", "swap-width2");
    label2_width2.innerHTML = " Distance 2 ";
    widthCol2.appendChild(label2_width2);

    var input2_width2 = document.createElement("input");
    input2_width2.setAttribute("type", "text");
    input2_width2.setAttribute("class", "form-control");
    input2_width2.setAttribute("placeholder", "3");
    input2_width2.id = "swap-width2";
    widthCol2.appendChild(input2_width2);
    swapWidthContainer.appendChild(widthCol2);

    // Number of chairs
    var chairContainer = document.createElement("div");
    chairContainer.id = "chair-container";
    chairContainer.className = "form-group";

    var label3 = document.createElement("label");
    label3.setAttribute("for", "chair-count");
    label3.innerHTML = " Chair Count ";
    chairContainer.appendChild(label3);

    var input3 = document.createElement("input");
    input3.setAttribute("type", "text");
    input3.setAttribute("class", "form-control");
    input3.setAttribute("placeholder", "6");
    input3.id = "chair-count";
    chairContainer.appendChild(input3);

    // Number of scramble
    var scrambleContainer = document.createElement("div");
    scrambleContainer.id = "scramble-container";
    scrambleContainer.className = "form-group";

    var label5 = document.createElement("label");
    label5.setAttribute("for", "scramble-count");
    label5.innerHTML = "Scramble Count ";
    //scrambleContainer.appendChild(label5);

    var input5 = document.createElement("input");
    input5.setAttribute("type", "text");
    input5.setAttribute("class", "form-control");
    input5.setAttribute("placeholder", "3");
    input5.id = "scramble-count";
    //scrambleContainer.appendChild(input5);

    // Pass button
    var passButtonContainer = document.createElement("div");
    passButtonContainer.id = "pass-button";
    passButtonContainer.classList = "d-none row mt-2 justify-content-md-center";
    var passButton = document.createElement("button");
    passButton.setAttribute("type", "button");
    passButton.setAttribute("class", "col-5 btn btn-primary");
    passButton.setAttribute("onClick", "pass();");
    passButton.innerHTML = "Pass";
    passButtonContainer.appendChild(passButton);

    // Next Round button
    var nextRoundContainer = document.createElement("div");
    nextRoundContainer.id = "next-round-button";
    nextRoundContainer.classList = "d-none row mt-2 justify-content-md-center";
    var nextRound = document.createElement("button");
    nextRound.setAttribute("type", "button");
    nextRound.setAttribute("class", "col-5 btn btn-primary");
    nextRound.setAttribute("onClick", "nextRound();");
    nextRound.innerHTML = "Next Round";
    nextRoundContainer.appendChild(nextRound);

    // Start button
    var startGameContainer = document.createElement("div");
    startGameContainer.id = "start-button";
    startGameContainer.classList = "d-none row mt-2 justify-content-md-center";
    var startGame = document.createElement("button");
    startGame.setAttribute("type", "button");
    startGame.setAttribute("class", "col-9 btn btn-primary");
    startGame.setAttribute("onClick", "start()");
    startGame.innerHTML = "Start";
    startGameContainer.appendChild(startGame);

    // Game button
    var newGameContainer = document.createElement("div");
    newGameContainer.id = "new-game-button";
    newGameContainer.classList = "row mt-2 justify-content-md-center";
    var newGame = document.createElement("button");
    newGame.setAttribute("type", "button");
    newGame.setAttribute("class", "col-9 btn btn-primary");
    newGame.setAttribute("onClick", "newGame();");
    newGame.innerHTML = "New game";
    newGameContainer.appendChild(newGame);



    info_list = [newGameContainer, startGameContainer, nextRoundContainer, passButtonContainer, chairContainer, swapWidthContainer];
    // player 2
    if (no_of_players == 2) {
        var player2NameDiv = document.createElement("div");
        player2NameDiv.id = "player2-name";
        player2NameDiv.className = "form-group";

        var label4 = document.createElement("label");
        label4.setAttribute("for", "player-2");
        label4.innerHTML = " Scrambler Name ";
        player2NameDiv.appendChild(label4);

        var input4 = document.createElement("input");
        input4.setAttribute("type", "text");
        input4.setAttribute("class", "form-control");
        input4.setAttribute("placeholder", "Bob");
        input4.id = "player-2";
        player2NameDiv.appendChild(input4);
        info_list.push(player2NameDiv);
    }
    info_list.push(player1NameDiv);

    return info_list
}

function nextRound() {
    if (!secondRound) {
        secondRound = true
        console.log("next round starting")

        // TODO: Need to set k to the form filled values
        var1 = null, solved = false, d = scrambleCount, player1Turn = true;
        temp = player1Name;
        player1Name = player2Name, player2Name = temp;

        // console.log("scores: ", player1Score, " ", player2Score)
        player2Score = player1Score;
        player1Score = 0;

        all_poss_set = null;
        game_started = true;
        counter = 0;
        document.getElementById('next-round-button').classList.add('d-none');
        document.getElementById('next-round-button').childNodes[0].innerHTML = "Results"
        //document.getElementById(scrambleLeftLabel).childNodes[1].innerHTML = d;
        document.getElementById(movesLabel).childNodes[1].innerHTML = counter;

        updateScore(player2Name, player2Score)
        updateInstructions(player2Name, key = true)
        updateInstructions("Set up the game by scrambling the chairs");

        setBoard(N);
    } else {
        document.getElementById('next-round-button').classList.add('d-none');
        if (player1Score < player2Score) {
            document.getElementById('info-board').innerHTML = "Congrats " + player1Name + ", you win! " +
                "</br>" + player1Name + "'s Score: " + player1Score +
                "</br>" + player2Name + "'s Score: " + player2Score;
        } else if (player1Score > player2Score) {
            document.getElementById('info-board').innerHTML = "Congrats " + player2Name + ", you win! " +
                "</br>" + player2Name + "'s Score: " + player2Score +
                "</br>" + player1Name + "'s Score: " + player1Score;
        } else {
            document.getElementById('info-board').innerHTML = " Looks like it was a tie. Play again?";
        }
        var newGameContainer = document.createElement("div");
        newGameContainer.id = "new-game-button";
        newGameContainer.classList = "row mt-2 justify-content-md-center";
        var newGame = document.createElement("button");
        newGame.setAttribute("type", "button");
        newGame.setAttribute("class", "col-9 btn btn-primary");
        newGame.setAttribute("onClick", "newGame();");
        newGame.innerHTML = "New game";
        newGameContainer.appendChild(newGame);
        document.getElementById('info-board').appendChild(newGameContainer)
    }
}

function isEmpty(str) {
    return !str.trim().length;
}

function InitInfoBoard() {
    var1 = null, k = structuredClone(defaultK), solved = false, player1Score = 0, player2Score = 0;
    N = 6, no_of_players = 2, player1Turn = true;
    player1Name = "Alice", player2Name = "Bob";
    all_poss_set = null;
    game_started = true;
    counter = 0;
    secondRound = false;

    console.log("new k: ", k, defaultK)
    const infoBoard = document.getElementById('info-board');
    infoBoard.innerHTML = "";
    getInitGameInfoHTML().forEach(element => {
        infoBoard.insertBefore(element, infoBoard.children[0]);
    });
}

// Utilities to generate valid game boards
function rephrase(arr, random = false) {
    i = 0
    new_arr = []
    var start = 'A';
    if (random) {
        start = 'B'
    }
    while (true) {
        if (arr[i] == start) {
            new_arr = arr.slice(i).concat(arr.slice(0, i));
            break;
        }
        i++;
    }
    // console.log("rephrased ", arr, " to ", new_arr)
    return new_arr;
}

function right_swap(arr, k = 2) {
    if (k == 0) {
        return arr;
    }

    var new_arr = []
    var i = 0
    while (true) {
        if (arr[i] == '_') {
            index = (i + k) % arr.length
            if (i > index) {
                i += index
                index = i - index
                i = i - index
            }
            // console.log("locations to swap: ", i, index)
            new_arr = arr.slice(0, i).concat(arr[index], arr.slice(i + 1, index), arr[i], arr.slice(index + 1))
            break;
        }
        i++;
    }
    // console.log("right swapped ", arr, " to ", new_arr)
    return new_arr;
}

function gen_all_right_swaps_recursive(my_set, arr, k, drop = false) {
    var new_state1 = right_swap(arr, k[0]);
    var new_state2 = right_swap(arr, k[1]);

    if (new_state1.join() != arr.join()) {
        if (drop) {
            val = arrayRemove(rephrase(new_state1), '_').join();
        } else {
            val = rephrase(new_state1).join();
        }
        // console.log("considering ", val)
        // console.log(typeof my_set)
        if (!my_set.has(val)) {
            // console.log("adding ", val)
            my_set.add(val);
            gen_all_right_swaps_recursive(my_set, arr, k, drop = false)
        }
    }

    if (new_state2.join() != arr.join()) {
        if (drop) {
            val = arrayRemove(rephrase(new_state2), '_').join();
        } else {
            val = rephrase(new_state2).join();
        }
        // console.log("2 considering ", val)
        // console.log("2 ", typeof my_set)
        if (!my_set.has(val)) {
            // console.log("2 adding ", val)
            my_set.add(val);
            gen_all_right_swaps_recursive(my_set, arr, k, drop = false)
        }
    }
}

function gen_all_swaps(arr, k = defaultK, drop = false) {
    arr = arrayRemove(arr, '_')
    var my_set = new Set()
    for (let i = 0; i < arr.length; i++) {
        gen_all_right_swaps_recursive(my_set, arr.slice(0, i).concat('_', arr.slice(i)), k, drop)
    }
    return my_set;
}

function is_adversary_move(arr, move, k = defaultK) {
    if (move == arr.join()) {
        return null
    }

    move = move.split(',')
    if (move.length != arr.length) {
        return null
    }

    invalid = false;
    var first_miss_index = -1, sec_miss_index = -1;
    for (let i = 0; i < move.length; i++) {
        if (move[i] != arr[i]) {
            if (first_miss_index == -1) {
                first_miss_index = i
            } else if (sec_miss_index != -1 || isInValidSwap(i, first_miss_index, k)) {
                // TODO: Need to check isInValidSwap validity
                // Math.abs(id1 - id2) != k[0] && N - Math.abs(id1 - id2) != k[0]
                invalid = true;
                break;
            } else {
                sec_miss_index = i;
            }
        }
    }

    if (invalid) {
        first_miss_index = -1
        sec_miss_index = -1
        invalid = false
        arr = rephrase(arr, true)
        move = rephrase(move, true)

        // console.log("second_loop", arr, move)
        for (let i = 0; i < move.length; i++) {
            if (move[i] != arr[i]) {
                //   console.log("second_loop", move[i], arr[i])
                if (first_miss_index == -1) {
                    first_miss_index = i
                } else if (sec_miss_index != -1 || isInValidSwap(i, first_miss_index, k)) {
                    // console.log("second loop", i, first_miss_index, move.length)
                    invalid = true;
                    break;
                }
                sec_miss_index = i;
            } else {
                sec_miss_index = i;
            }
        }
    }

    if (invalid) {
        return null;
    }

    return [true, arr[first_miss_index], arr[sec_miss_index]]
}

function gen_adversarial_moves(arr, all_valid_states, k = defaultK) {
    arr = rephrase(arr)
    moves = new Map();
    count = 0
    for (let i = 0; i < all_valid_states.length; i++) {
        resp = is_adversary_move(arr, all_valid_states[i], k)
        if (resp != null) {
            count++
            moves = add_to_mapset(moves, resp[1], resp[2])
            moves = add_to_mapset(moves, resp[2], resp[1])
        }
    }

    return [moves, count]
}

function add_to_mapset(moves, k, v) {
    if (moves.has(k)) {
        moves.set(k, moves.get(k).add(v))
    } else {
        temp = new Set();
        temp.add(v);
        moves.set(k, temp)
    }
    return moves
}

function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}

function getUnion(setA, setB) {
    const union = new Set(setA);

    for (const element of setB) {
        union.add(element);
    }

    return union;
}

// Default script runs
const defaultK = [2, 3];
const scrambleLeftLabel = "Scrambles Left: ";
const movesLabel = "Moves: ", instructionLabel = "Instructions: ";
const scoreLabel = "Score: ";
const distanceLabel = "Distance: ";

var var1, k = structuredClone(defaultK), solved = false, scrambleCount = 3;
var d = 3, player1Score = 0, player2Score = 0, counter = 0;
var N = 6, no_of_players = 2, player1Turn = true;
var player1Name = "Alice", player2Name = "Bob";
var all_poss_set = null;
var game_started = true;
var secondRound = false;
var scrambleMode = false;

InitInfoBoard();