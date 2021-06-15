"use strict";

/* Memory game: find matching pairs of cards and flip both of them. */

const gameBoard = document.getElementById("game");
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];
const colors = shuffle(COLORS);
createCards(colors);


/* Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}


/* Create card for every color in colors (each will appear twice) */

function createCards(colors) {
  for (let color of colors) {
    // create a card
    const card = document.createElement("div");
    // give it the class with that color, plus the styles for all cards and the card backs
    card.classList.add("card", `${color}-card`, "back-card")
    gameBoard.append(card); 
  }
}


/* Add an event listener to the parent element 
   Make sure only cards that are face down are clickable
   Lay the groundwork to make sure only two cards at a time can be clicked */

let clickCounter = 0;
const clickEvent = gameBoard.addEventListener('click', function(evt){
    if(evt.target.classList.contains('back-card')){
        handleCardClick(evt);
        clickCounter++;
    }
})

/* Flip a card face-up. */

function flipCard(card) {
  card.classList.remove('back-card');
}

/* Flip a card face-down after 1 second */

function unFlipCard(card) {
  setTimeout(function(){
    card.classList.add('back-card')
  }, 1000);
}

/* Prevent clicks from happening too quickly */

const allCards = document.querySelectorAll('.card');
function noClick(){
  for(let card of allCards){
    card.classList.add('no-click');
  }
  setTimeout(function(){
    for(let card of allCards){
    card.classList.remove('no-click');
    }
  }, 700);
}

/* Congratulatory banner that gets displayed upon proving your mighty memory powers */

function makeWinner(){
  const winner = document.createElement('div');
  winner.classList.add('winner');
  winner.innerText = "You win!";
  return winner;
}

/* Handle clicking on a card: two paths whether it is the first card or the second card to be clicked. */

let cardA, cardB;
let matchCount = 0;

function handleCardClick(evt) {
  console.log(evt);
  const card = evt.target;

  if(clickCounter === 0){ 
    flipCard(card);
    cardA = card;

  } else if(clickCounter === 1){
    flipCard(card);
    cardB = card;
    noClick();
    
    // compare the cards to look for matches, if a match is found, add it to the tally
    // otherwise flip cards back over 

    if(cardA.getAttribute('class') === cardB.getAttribute('class')){
        matchCount++;
        clickCounter = -1; // okay, I'll be honest, I can't figure out why this can't be set to 0 
    } else {
        unFlipCard(cardA);
        unFlipCard(cardB);
        clickCounter = -1;
    }
    card.classList.remove('no-click');
  }

  // count up the total matches to determine if the game has been won

  if(matchCount === 5){
      const header = document.querySelector('header');
      header.append(makeWinner());
  } 
};


/* buttons at the bottom to show the full board or reset the game */

function showAllCards() {
  const cards = document.querySelectorAll('.card');
  for(let card of cards){
    card.classList.remove('back-card');
  }
}

const solution = document.querySelector('.solution');
solution.addEventListener('click', showAllCards);

const newGame = document.querySelector('.new-game');
const refreshPage = function(){
  location.reload();
};
newGame.addEventListener('click', refreshPage);

/* exeunt */