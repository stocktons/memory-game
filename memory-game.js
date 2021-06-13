"use strict";

/* Memory game: find matching pairs of cards and flip both of them. */

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
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");
  
  for (let color of colors) {
    // create a card
    const card = document.createElement("div");
    // give it the class with that color
    card.classList.add("card", `${color}-card`, "back-card")
    // append it to the gameBoard
    gameBoard.append(card);
     // add a click listener called handleCardClick
    card.addEventListener("click", function(evt){
      handleCardClick(evt);
    })
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  // ... you need to write this ...
  // all this does is toggle between classes, handleCardClick decides if it should run
  card.classList.toggle("back-card");


  
}

/** Flip a card face-down. */

function unFlipCard(card) {
  // ... you need to write this ...
  // only runs if no match
  card.classList.toggle("back-card");
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  // ... you need to write this ...
  // start by restoring event listeners?
  // select and add a variable to name the card? 
  // if first click, just flip and wait, don't do anything else
  // after second click check for match and either wait one second and run unFlipCard or do nothing
  // once clicked, remove event listener from that card
  alert("I got clicked!");

  setTimeout(unFlipCard(), 1000);
}


function toggleAllCards() {
  const cards = document.querySelectorAll('.card');
  for(let card of cards){
    card.classList.toggle('back-card');
  }
}