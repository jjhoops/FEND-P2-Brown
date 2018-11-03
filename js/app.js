/* FEND Project #2 Memory Game
Author: Jeffrey Brown
*/
var deck = document.querySelector('.deck');
var cards = document.querySelectorAll('.card');
const resetButton = document.querySelector('.restart');
const modalClose = document.querySelector('.modal-close');
const modalCancel = document.querySelector('.modal-cancel');
const modalReplay = document.querySelector('.modal-replay');

var toggledCards = []; // Keep track of cards chosen
var moves = 0; // # of moves in the game
var timer = 0; // Game timer
var timerRunning = false;
var timeDisplay;
var stars = 3; // Keep track of stars remaining
var matchedPairs = 0; // Keep track of matched pairs for game win
const winningPairs = 8; // Max possible # of pairs

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Card Handling Functions
function toggleCard(eventTarget) { //Toggle classes when card is chosen
    eventTarget.classList.toggle('open');
    eventTarget.classList.toggle('show');
}

function resetCard(eventTarget) { //Reset card to not showing
    eventTarget.className = 'card';
}

function addToggleCard(eventTarget) { // Add card to array when selected
    toggledCards.push(eventTarget);
}

function checkMatch() { //Once two cards are selected, check if they match
    let first = toggledCards[0];
    let second = toggledCards[1];
    let firstName = first.firstElementChild.className;
    let secondName = second.firstElementChild.className;
    if (firstName === secondName) { //Toggle match class if a match
        first.classList.toggle('match');
        second.classList.toggle('match');
        toggledCards = []; //Reset the array of chosen cards
        matchedPairs++;
    } else {
        setTimeout(function() { // Delay before flipping unmatched cards back
            toggleCard(first);
            toggleCard(second);
            toggledCards = [];
        }, 1000);
        clickEnable = true;
    }
}

function shuffleCards() { //Uses Shuffle function to shuffle deck; reset when shuffled
    const currentDeck = Array.from(document.querySelectorAll('.deck li'));
    const newDeck = shuffle(currentDeck);
    for (card of newDeck) {
        resetCard(card);
        deck.appendChild(card);
    }
}


function clickValidation(eventTarget, eventClasses) {
    return (
        toggledCards.length < 2 &&
        !toggledCards.includes(eventTarget) &&
        !eventClasses.contains('match')
    )
}

//Moves Handling functions
function updateMoves() { //Update move count on screen
    moves++;
    const movesIndicator = document.querySelector('.moves');
    if (moves === 1) {
        movesIndicator.innerHTML = `${moves} move`;
    } else {
        movesIndicator.innerHTML = `${moves} moves`;
    }
}

function resetMoves() { //Reset moves amd display
    moves = 0;
    document.querySelector('.moves').innerHTML = `${moves} moves`;
}

//Star Handling functions
function updateStars() { //Check for condition to remove a star
    if (moves === 10 || moves === 15) {
        removeStar();
        stars--;
    }
}

function removeStar() { //Remove a star from the display
    const starsDisplay = document.querySelectorAll('.stars li');
    for (star of starsDisplay) {
        if (star.style.display !== 'none') { //Hies the next star
            star.style.display = 'none';
            break;
        }
    }
}

function resetStars() { //Restore 3 stars for next game
    stars = 3;
    const starsDisplay = document.querySelectorAll('.stars li');
    for (star of starsDisplay) {
        star.style.display = 'inline'; //Display stars
    }
}

//Timer Handling Functions
function startTimer() {
    timeDisplay = setInterval(function() {
        timer++;
        displayTimer();
    }, 1000); //1000ms = 1s
}

function stopTimer() {
    clearInterval(timeDisplay);
}

function displayTimer() { //Display timer on screen
    const clock = document.querySelector('.clock');
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    if (seconds < 10) { //To deal with conversion to time display
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}

function resetTimer() {
    stopTimer();
    timer = 0;
    displayTimer();
    timerRunning = false;
}

//Game Handling Functions

function resetGame() { //Actions to reset game
    resetMoves();
    resetStars();
    resetTimer();
    matchedPairs = 0;
    shuffleCards();
}

function gameWinner() { //Actions when game is won
    stopTimer();
    winningModal();
}

//Modal Functions - displayed after game is won
function swapModal() { //Toggles hide class to show or hide modal
    const modal = document.querySelector('.modal-bkgnd');
    modal.classList.toggle('hide');
}

function winningStats() { //Updates modal display with winning stats
    const timeStat = document.querySelector('.modal-time');
    const starStat = document.querySelector('.modal-stars');
    const moveStat = document.querySelector('.modal-moves');
    const clockTime = document.querySelector('.clock').innerHTML;

    timeStat.innerHTML = `Time = ${clockTime}`;
    starStat.innerHTML = `Stars = ${stars}`;
    moveStat.innerHTML = `Moves = ${moves}`;
}

function winningModal() { //Manages the modal's display and button functions
    swapModal();
    winningStats();

}

//Gane Execution
resetButton.addEventListener('click', function() {
    resetGame();
});
modalClose.addEventListener('click', function() {
    swapModal();
});
modalCancel.addEventListener('click', function() {
    swapModal();
});
modalReplay.addEventListener('click', function() {
    swapModal();
    resetGame();
});

//initial shuffle
shuffleCards();

//Card events
for (card of cards) {
    card.addEventListener('click', function(event) {
        const eventTarget = event.target;
        let eventClasses = event.target.classList;
        if (clickValidation(eventTarget, eventClasses)) {
            if (!timerRunning) {
                startTimer();
                timerRunning = true;
            }
            if (toggledCards.length < 2) {
                toggleCard(eventTarget);
                addToggleCard(eventTarget);
            }
            if (toggledCards.length === 2) { //Check match and update game functions once 2 selected
                checkMatch();
                updateMoves();
                updateStars();
                if (matchedPairs === winningPairs) { //Check for winning condition
                    gameWinner();
                }
            }
        }
    });
}