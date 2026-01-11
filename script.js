"use strict";

// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

let scores, currentScore, activePlayer, playing; //declaring the variables here

// starting condition

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  // switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

// dice roll function
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1 generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);

    // change the dice according to the random number
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // check if the rolled dice is 1
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore; //change later
    } else {
      // switch the player - already made the function earlier and i have called it over here
      switchPlayer();
    }
  }
});

// chane the player and add the score to total score when clicked hold
btnHold.addEventListener("click", function () {
  if (playing) {
    //   1 add the current score to the active player
    scores[activePlayer] += currentScore; //scores[1] = scores[1] + currentScore;
    //   now score is stored in the active player variable and it needs to be placed in the total score for that we need to do this
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //   2 check whether the score is above 100
    if (scores[activePlayer] >= 100) {
      //   if yes then the player won
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // switch to next player - already made the function earlier
      switchPlayer();
    }
  }
});

// when clicked on the new game button - all the features should be at initial state
btnNew.addEventListener("click", init);
