"use strict";

/* Memory game: find matching pairs of cards and flip both of them. */
const gameBoard = document.getElementById("game");
const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

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

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click listener for each card to handleCardClick
 */

function createCards(colors) {
  let counter = 1;
  for (let color of colors) {
    // create a card
    const card = document.createElement("div");
    // give it the class with that color
    card.classList.add("card", `${color}-card`, "back-card")
    // give each card a unique id
    card.setAttribute("id", `card${counter}`);
    // append it to the gameBoard
    gameBoard.append(card); 
    // add a click listener called handleCardClick
    // card.addEventListener("click", handleCardClick);
    counter++;
  }
}

let clickCounter = 0;
const clickEvent = gameBoard.addEventListener('click', function(evt){
    if(evt.target.classList.contains('back-card')){
        console.log(`clickCounter is ${clickCounter}`);
        handleCardClick(evt);
        clickCounter++;
        console.log(`clickCounter is ${clickCounter}`);
    }
})

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  // all this does is toggle between classes, handleCardClick decides if it should run
  card.classList.remove('back-card');
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  // only runs if no match
  setTimeout(function(){
    card.classList.add('back-card')
  }, 1000);
}

/** Handle clicking on a card: this could be first-card or second-card. */
let cardA, cardB;
let matchCount = 0;

const allCards = document.querySelectorAll('.card');
function noClick(){
  for(let card of allCards){
    card.classList.add('no-click');
  }
  setTimeout(function(){
    for(let card of allCards){
    card.classList.remove('no-click');
    }
  }, 1000);
}




function handleCardClick(evt) {
  // ... you need to write this ...
  console.log(evt);
  const card = evt.target;
  if(clickCounter === 0){ // and classList !== classList and one other card is flipped (loop through all cards and check classList.length for any to be less than 3)
   
    flipCard(card);
    cardA = card;
    console.log('cardA is ' + cardA.classList);
  } else if(clickCounter === 1){
        flipCard(card);
        cardB = card;
        console.log('cardB is ' + cardB.classList);
        noClick();
        
        if(cardA.getAttribute('class') === cardB.getAttribute('class')){
            matchCount++;
            clickCounter = -1;
            card.classList.remove('no-click');
        } else {
            unFlipCard(cardA);
            unFlipCard(cardB);
            clickCounter = -1;
            card.classList.remove('no-click');
        }
    }
    console.log(`${matchCount} matches`);
    if(matchCount === 5){
        console.log("You win!");
    }
    
  };



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