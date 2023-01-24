const buttonReset = document.querySelector('#button-reset');

let isGameDraw9 = false;
let isGameOver = false;

const p1 = {
  button: document.querySelector('#button-score-player-1'),
  score: 0,
  drawScore: 0,
  display: document.querySelector('.score-player-1'),
  drawDisplay: document.querySelector('.draw-score-player-1'),
}

const p2 = {
  button: document.querySelector('#button-score-player-2'),
  score: 0,
  drawScore: 0,
  display: document.querySelector('.score-player-2'),
  drawDisplay: document.querySelector('.draw-score-player-2'),
}

p1.button.addEventListener('click', eventFunction(p1, p2));
p2.button.addEventListener('click', eventFunction(p2, p1));

window.addEventListener('keydown', function (e) {
  const keyPressed = e.code;

  switch (keyPressed) {
    case 'ArrowLeft':
    case 'KeyA':
    case 'KeyH':
      eventFunction(p1, p2)();
      break;
    case 'ArrowRight':
    case 'KeyD':
    case 'KeyL':
      eventFunction(p2, p1)();
      break;
    case 'Space':
      resetGame();
  }
})

buttonReset.addEventListener('click', resetGame)

function resetGame() {
  for (let p of [p1, p2]) {
    p.drawDisplay.classList.add('hide');
    p.display.style.color = 'black';
    p.drawDisplay.style.color = 'black';
    p.drawScore = 0;
    p.score = 0;
    p.drawDisplay.innerText = '0';
    p.display.innerText = '0';
    p.button.disabled = false;
  }

  p1.button.style.backgroundColor = 'green';
  p2.button.style.backgroundColor = 'blue';

  isGameDraw9 = false;
  isGameOver = false;
}

function eventFunction(player, opponent) {
  return function (e) {
    if (!isGameOver) {
      updateScore(player);
      if (drawOn9()) switchToDraw9Mode();
      if (gameOver()) endGame(player, opponent);
    }
  }
}

function switchToDraw9Mode() {
  for (let p of [p1, p2]) {
    p.drawDisplay.classList.remove('hide');
    p.display.style.color = 'gray';
  }

  isGameDraw9 = true;
}

function endGame(winner, loser) {
  for (let p of [winner, loser]) {
    p.button.disabled = true;
    p.button.style.backgroundColor = 'gray';
  }

  if (!isGameDraw9) {
    winner.display.style.color = 'green';
    loser.display.style.color = 'red';
  } else {
    winner.drawDisplay.style.color = 'green';
    loser.drawDisplay.style.color = 'red';
  }

  isGameOver = true;
}

function updateScore(player) {
  if (!drawOn9()) {
    player.score++;
    player.display.innerText = player.score;
  } else {
    player.drawScore++;
    player.drawDisplay.innerText = player.drawScore;
  }
}

function gameOver() {
  return (p1.score === 10 || p2.score === 10) || (Math.abs(p1.drawScore - p2.drawScore) > 1);
}

function drawOn9() {
  return p1.score === 9 && p2.score === 9;
}