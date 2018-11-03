/*
 * Create a list that holds all of your cards
 */
var deck = document.querySelector('.deck');
var cards = document.querySelectorAll('.card');
var toggledCards = []; // Keep track of cards chosen
var moves = 0; // # of moves in the game
var timer = 0; // Game timer
var timerRunning = false;
var timeDisplay;
var stars = 3; // Keep track of stars remaining
const resetButton = document.querySelector('.restart');
var matchedPairs = 0; // Keep track of matched pairs for game win
const winningPairs = 8; // Max possible # of pairs

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function shuffleCards() { //Uses Shuffle function to shuffle deck; reset when shuffled
    const currentDeck = Array.from(document.querySelectorAll('.deck li'));
    const newDeck = shuffle(currentDeck);
    for (card of newDeck) {
        resetCard(card);
        deck.appendChild(card);
    }
}
function resetCard(eventTarget) { //Reset card to not showing
    eventTarget.className = 'card';
}

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

function clickValidation(eventTarget, eventClasses) {
    return (
        toggledCards.length < 2 &&
        !toggledCards.includes(eventTarget) &&
        !eventClasses.contains('match')
    )
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

function updateStars() { //Check for condition to remove a star
    if (moves === 10 || moves === 15) {
        removeStar();
        stars--;
    }
}

function removeStar() { //Remove a star from the display
    const starsDisplay = document.querySelectorAll('.stars li');
    for (star of starsDisplay) {
        if (star.style.display !== 'none') { //Hides the next star
            star.style.display = 'none';
            break;
        }
    }
}

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

function resetMoves() { //Reset moves amd display
    moves = 0;
    document.querySelector('.moves').innerHTML = `${moves} moves`;
}

function resetStars() { //Restore 3 stars for next game
    stars = 3;
    const starsDisplay = document.querySelectorAll('.stars li');
    for (star of starsDisplay) {
        star.style.display = 'inline'; //Display stars
    }
}

function resetTimer() {
    stopTimer();
    timer = 0;
    displayTimer();
    timerRunning = false;
}

function resetGame() { //Actions to reset game
    resetMoves();
    resetStars();
    resetTimer();
    matchedPairs = 0;
    shuffleCards();
}

function gameWinner() { //Actions when game is won
    stopTimer();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
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