/*----- constants -----*/
const cardValues = ['images/cow.png', 'images/fox.png', 'images/horse.png', 'images/pig.png', 'images/rabbit.png', 'images/sheep.png',
'images/cow.png', 'images/fox.png', 'images/horse.png', 'images/pig.png', 'images/rabbit.png', 'images/sheep.png'];

/*----- app's state (variables) -----*/
let board;
let results; // all cards are matched = 'Well Done!'
let maxAttempts = 0
let wrongGuess = 0;
let winner; 
let selectedCards; // array to store selected cards

/*----- cached element references -----*/
const cards = document.querySelectorAll('.card');
const backCardEl = document.getElementsByClassName('back-card');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const message = document.querySelector('h3')
const gameBoard = document.getElementById('game-board');


/*----- event handlers -----*/
cards.forEach(card => card.addEventListener('click', handleClick)); // for the back of the cards
startBtn.addEventListener('click', init);
restartBtn.addEventListener('click', init);


/*----- Functions -----*/
init();

function init() {
    selectedCards= [];
    winner = true;
    message.innerHTML = 'You get 4 wrong guesses!';
    render();

    cards.forEach(card => {
        if (!card.classList.contains('flipUp') && !card.classList.contains('match')) {
            card.addEventListener('click', handleClick);
        }
    })
};

function render() { //after initialization, it calls the render function which updates the game display
    shuffle(cardValues);
    renderAssignPics();
    cards.forEach((card) => card.removeEventListener('click', handleClick));
}

function shuffle(array) {
    for (let origId = array.length - 1; origId > 0; origId--) {
      const newId = Math.floor(Math.random() * (origId + 1));
        [array[origId], array[newId]] = [array[newId], array[origId]];
    }
}

function renderAssignPics() {
    cards.forEach((card, i) => {
        // Remove existing images from the card
        while (card.firstChild) {
            card.removeChild(card.firstChild);
        }

        const frontImg = document.createElement('img');
        const backImg = document.createElement('img');

        frontImg.src = 'images/farm.png'; // The path to the image in the back of the card
        frontImg.style.height = '20.5vmin';
        frontImg.style.width = '18.30vmin';

        backImg.src = cardValues[i];
        backImg.style.height = '20.5vmin';
        backImg.style.width = '18.30vmin';
        backImg.classList.add('hidden'); // Initially hide the back image

        // Initially, show only the front image
        card.appendChild(frontImg);
        card.appendChild(backImg);

        card.addEventListener('click', function () {
            frontImg.classList.toggle('hidden');
            backImg.classList.toggle('hidden');
        });
    });
}

function handleClick(evt) {
    if (evt.target.classList.contains('selected') || evt.target.classList.contains('match')) { // Guard rail
        return;
    }
    evt.target.classList.add('selected', 'flipUp');
    selectedCards.push(evt.target);

    if (selectedCards.length === 2) {
        cards.forEach((card) => card.removeEventListener('click', handleClick));
        setTimeout(() => {
            checkMatch();
        }, 1000);
    }
}


function checkMatch() {
    const [card1, card2] = selectedCards;

    if (card1.nextElementSibling.src === card2.nextElementSibling.src) {
        selectedCards.forEach(card => {
            card.classList.remove('selected');
            card.classList.add('match');
            disablePointerEvents(card);
            message.innerHTML = 'WHAT A MATCH!';
            card.removeEventListener('click', handleClick);
        });
    } else {
        // If no match, remove class from cards in array
        selectedCards.forEach(card => {
            card.classList.remove('selected', 'flipUp');
            resetCardStyles(card);
            card.addEventListener('click', handleClick);
        });
    }
    // Re-enable card clicks and reset array to empty
    cards.forEach(card => card.addEventListener('click', handleClick));
    selectedCards = [];
}

function resetCardStyles(card) {
    setTimeout(() => {
        card.classList.remove('flipUp');
        card.querySelector('.front').classList.remove('hidden');
        card.querySelector('.back').classList.add('hidden');
    }, 1000);
}

function checkForWin() {
    let allMatched = true;

    for (const backCard of backCardEl) {
        if (!backCard.classList.contains('match')) {
            allMatched = false;
            break;
        }
    }

    if (allMatched) {
        stopGame(true, 'WELL DONE! YOU WIN!');
    }
}

function stopGame(isWinner, message) {
    cards.forEach((card) => card.removeEventListener('click', handleClick));
    message.innerHTML = `<h3 ${isWinner ? 'YES' : 'NO'}>${message}</h3>`;
}

function restartGame () { 
    window.location.reload();
};
