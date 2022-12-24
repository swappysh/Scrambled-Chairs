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
    <p> <strong> Distances: </strong> Only chairs at these distances from the empty chair can be swapped</p>
    <p> <strong> Chair Count: </strong> The number of chairs around the table </p>

<h2> Rules: </h2>
    <p> - The scrambler goes first and moves chairs around based on the permitted distances. When done, the scrambler clicks on Start.</p>
    <p> - It then becomes the arranger's turn where they can swap chairs at the permitted distances with the empty chair.</p>
    <p> - The round goes on until the arranger makes the chairs alphabetical in the clockwise direction without gaps.</p>
    <p> - In the next round, the players swap roles and play with the same rules.</p>
    <p> - The player who arranges the chairs in fewer moves wins.</p>
</p>


<p> <strong> Note: </strong> For best experience, maximize the window </p>
EOD;

// Size of the popup window
$width = 940;
$height = 1000;
// If your score is sortable, 1 if higher score is better, -1 if smaller score is better, 0 otherwise.
$scoring = 0;

include '../../template.php';
