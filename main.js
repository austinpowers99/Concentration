/*----- constants -----*/
const cardImages = [
    '', 
    '', 
    '', 
    '', 
    '', 
    '', 
    '', 
    '', 
    '', 
    '', 
    '', 
    ''
];

/*----- app's state (variables) -----*/
let board;
let results; // all cards are matched = 'Well Done!'
let pairs = []; //keep track of matched cards
let maxAttempts = 0
let wrongGuess = 0;

/*----- cached element references -----*/
const cards = document.querySelectorAll('.card');
const button = document.querySelector('button');
const message = document.querySelector('h3')
const gameBoard = document.getElementById('game-board');


/*----- event handlers -----*/
cards.forEach(card => card.addEventListener('click', handleClick));
function initEventListeners() {
    ['easy', 'medium', 'hard'].forEach(level => {
        document.getElementById(`${level}-game`).addEventListener('click', () => initGame(level));
    });

    resetBtnEl.addEventListener('click', () => initGame(currentLevel));
}

document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    initGame('easy'); // Default initialization
});

/*----- Functions -----*/

const levelInfo = {
    easy: { moves: 10, time: 60, expectedPairs: 4 },
    medium: { moves: 15, time: 90, expectedPairs: 8 },
    hard: { moves: 20, time: 120, expectedPairs: 12 },
};

function initGame(level) {
    const info = levelInfo[level];

    movesLeft.textContent = `${moves = info.moves}`;
    timeRemaining.textContent = `${timeLeft = info.time} seconds`;
    expectedPairs =  info.expectedPairs;
    cardCount = info.expectedPairs;

    render();
}
