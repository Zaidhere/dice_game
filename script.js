"use strict";

const score_1 = document.querySelector(".score1");
const score_2 = document.querySelector(".score2");

const restart = document.querySelector(".newGame");
const roll = document.querySelector(".roll");
const hold = document.querySelector(".hold");

let points_1 = document.querySelector(".points-1");
let points_2 = document.querySelector(".points-2");

let dice = document.querySelector(".dice");
dice.classList.add("hidden");
let player = 0;
let value = 0;
score_1.textContent = 0;
score_2.textContent = 0;

function setPlayer() {
  if (player === 0) {
    document.querySelector(".right").classList.remove("rightbg");
    document.querySelector(".left").classList.add("leftbg");
  } else {
    document.querySelector(".left").classList.remove("leftbg");
    document.querySelector(".right").classList.add("rightbg");
  }
}

setPlayer();

roll.addEventListener("click", function () {
  const number = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove("hidden");
  dice.src = `dice-${number}.png`;

  if (!Winner()) {
    value += number;
    if (number == 1) {
      if (player == 0) points_1.textContent = 0;
      else points_2.textContent = 0;
      player = (player + 1) % 2;
      value = 0;
      setPlayer();
    } else {
      if (player == 0) points_1.textContent = value;
      else points_2.textContent = value;
    }
  }
});

hold.addEventListener("click", function () {
  Winner();
  if (player == 0) score_1.textContent = Number(score_1.textContent) + value;
  else score_2.textContent = Number(score_2.textContent) + value;
  Winner();
  value = 0;
  points_1.textContent = 0;
  points_2.textContent = 0;
  player = (player + 1) % 2;
  setPlayer();
});

restart.addEventListener("click", function () {
  score_1.textContent = 0;
  score_2.textContent = 0;
  points_1.textContent = 0;
  points_2.textContent = 0;
  document.querySelector(".left").classList.remove("leftWinner");
  document.querySelector(".right").classList.remove("rightWinner");
  document.querySelector(".player1").textContent = "PLAYER 1";
  document.querySelector(".player2").textContent = "PLAYER 2";

  player = 0;
  value = 0;
  setPlayer();
});

function Winner() {
  if (Number(score_1.textContent) >= 100) {
    document.querySelector(".left").classList.add("leftWinner");
    document.querySelector(".player1").textContent = "WINNER";
    return 1;
  } else if (Number(score_2.textContent) >= 100) {
    document.querySelector(".right").classList.add("rightWinner");
    document.querySelector(".player2").textContent = "WINNER";
    return 1;
  }
  return 0;
}
