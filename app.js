const buttonScorePlayer1 = document.querySelector('#button-score-player-1');
const buttonScorePlayer2 = document.querySelector('#button-score-player-2');
const buttonReset = document.querySelector('#button-reset');
const scorePlayer1 = document.querySelector('.score-player-1');
const scorePlayer2 = document.querySelector('.score-player-2');
const drawScorePlayer1 = document.querySelector('.draw-score-player-1');
const drawScorePlayer2 = document.querySelector('.draw-score-player-2');
const controls = document.querySelector('.controls');
const drawScores = document.querySelectorAll('.draw-score');
const normalScores = document.querySelectorAll('.normal-score');
const allScores = document.querySelectorAll('.score');

let isGameDraw9 = false;

controls.addEventListener('click', function (e) {
  if (!isGameDraw9) {
    if (e.target.id === 'button-score-player-1')
      updateScore(scorePlayer1);
    else if (e.target.id === 'button-score-player-2')
      updateScore(scorePlayer2);

    if (someoneWin()) endGame();

    if (drawOn9()) {
      for (let el of drawScores)
        el.classList.remove('hide');

      for (let el of normalScores)
        el.style.color = 'gray';

      isGameDraw9 = true;
    }
  } else {
    if (e.target.id === 'button-score-player-1')
      updateScore(drawScorePlayer1);
    else if (e.target.id === 'button-score-player-2')
      updateScore(drawScorePlayer2);

    if (differenceOf2()) endGame();
  }
})

buttonReset.addEventListener('click', function (e) {
  e.stopPropagation();
  for (let el of drawScores)
    el.classList.add('hide');

  isGameDraw9 = false;

  for (let el of allScores)
    el.innerText = '0';

  for (let el of normalScores)
    el.style.color = 'black';

  buttonScorePlayer1.disabled = false;
  buttonScorePlayer2.disabled = false;
  buttonScorePlayer1.style.backgroundColor = 'green';
  buttonScorePlayer2.style.backgroundColor = 'blue';
})

function endGame() {
  buttonScorePlayer1.disabled = true;
  buttonScorePlayer2.disabled = true;
  buttonScorePlayer1.style.backgroundColor = 'gray';
  buttonScorePlayer2.style.backgroundColor = 'gray';
}

function someoneWin() {
  return parseInt(scorePlayer1.innerText) === 10 || parseInt(scorePlayer2.innerText) === 10;
}

function updateScore(player) {
  let currentScore = parseInt(player.innerText);
  currentScore++;
  player.innerText = currentScore;
}

function drawOn9() {
  return parseInt(scorePlayer1.innerText) === 9 && parseInt(scorePlayer2.innerText) === 9;
}

function differenceOf2() {
  return Math.abs(parseInt(drawScorePlayer1.innerText) - parseInt(drawScorePlayer2.innerText)) > 1;
}