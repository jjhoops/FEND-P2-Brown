# Memory Game Project

This is Project 2 in the Udacity Front End Web Developer (FEND) Nanodegree program.  The project requires a modern web browser to run.  It utiiizes Javascript for the main game engine and CSS to manipulate the "cards" via classes.

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

This memory game consists of eight pairs of symbols placed on cards, initially hidden from the user. The goal of the game is to match all eight cards in as few moves and as quickly as possible. 

The user clicks on two cards to reveal the card symbols.  If the symbols match, the cards stay in the revealed state, otherwise they return to hidden.

The game will keep track of the total time for a game as well as the number of moves, where a move is counted by revealing one pair of cards.  The user begins with a total of three stars.  The star rating decreases after a certain number of moves have been completed.  nce all cards have been matched, a pop-up screen displays to show the number of moves and time for the game.

The user may restart the game at any time by clicking the restart arrow in the upper right of the screen.

The user may replay a finished game by clicking the Replay button on the pop-up screen.

## Contributing

This project began with "starter" code provided by Udacity through GitHub: https://github.com/udacity/fend-project-memory-game

This starter code utilizes "font-awesome" and "Coda: via linked stylesheets.

<link rel="stylesheet prefetch" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
<link rel="stylesheet prefetch" href="https://fonts.googleapis.com/css?family=Coda">

The code utilizes "geometry2.png" background file from Subtle Patterns.

It utilizes a Shuffle function from http://stackoverflow.com/a/2450976 to "shuffle" the cards.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
