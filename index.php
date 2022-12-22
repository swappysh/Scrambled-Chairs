<?php
// Filename of your index page
$index = "game.html";
// Metadata
$game = "Scrambled Chairs";
$team = "Timeout";
$instruction = <<<EOD

<h2> Objective: </h2>
<p> <strong> Arranger: </strong> Arrange the chairs around the table in alphabetical order </p>

<p> <strong> Scrambler: </strong> Scramble the chairs to make it hard for the arranger to win</p>

<h2> Settings: </h2>
    <p> <strong> Distance 1 & 2: </strong> Only chairs at these distances from the empty chair can be swapped</p>
    <p> <strong> Chair Count: </strong> The number of chairs around the table </p>
    <p> <strong> Scramble Count: </strong> The number of times the scrambler can swap chairs during the game</p>

<h2> Rules: </h2>
    <p> - The scrambler goes first and moves chairs around to set the board</p>
    <p> - The scrambler can only swap chairs that are at the set distances from the empty chair</p>
    <p> - Once the scrambler confirms the board, they can start the game</p>
    <p> - Each player will take turns now starting with the arranger</p>
    <p> - The arranger can only swap chairs that are at the set distances from the empty chair</p>
    <p> - On the scrambler's turn they can either swap any two green chairs or pass</p>
    <p> - The round goes on until the arranger makes the chairs alphabetical in the clockwise direction</p>
    <p> - In the subsequent rounds, the players swap roles and play with the same rules
</p>


<p> <strong> Note: </strong> For best experience, maximize the window </p>
EOD;

// Size of the popup window
$width = 940;
$height = 1000;
// If your score is sortable, 1 if higher score is better, -1 if smaller score is better, 0 otherwise.
$scoring = 0;

include '../../template.php';
