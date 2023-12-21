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
let board
let results // all cards are matched = 'Well Done!'
let pairs = []; //keep track of matched cards
let maxAttempts = 0
let wrongGuess = 0;
let cardCount
let winner, moves, cardsAvailable,firstChoice

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

function generateDeck() {
    const cardsOut = Array.form({ lenght: cardCount }, cardImages[0]).flat();
    cardsAvailable = [...cardsOut];
    fisherYatesShuffle(cardsAvailable);
}

function render() {
    generateDeck()
    cardsDisplayDesign()
}

function cardsDisplayDesign() {
    cardContainer.innerHTML = '';

    const cardElements = cardsAvailable.map((card, idx) => {
        const newCard = document.createElement('div');
        newCard.className = `game-card back`;
        newCard.id = `game-card-${idx}`;
        newCard.addEventListener('click', flipCard);
        return newCard;
    });

    cardElements.forEach((cardElement) => {
        cardContainer.appendChild(cardElement);
    });
}