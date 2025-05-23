const age = prompt('This game is only for adults! Enter your age below');

if (Number(age) < 18) {
  alert('Sorry, you must be at least 18 years old to play.');
  document.body.innerHTML = '<h1>Access denied</h1>';
} else {
  let randomNumber = Math.floor(Math.random() * 100) + 1;

  const guesses = document.querySelector('.guesses');
  const lastResult = document.querySelector('.lastResult');
  const lowOrHigh = document.querySelector('.lowOrHigh');

  const container = document.querySelector('.container');
  const guessSubmit = document.querySelector('.guessSubmit');
  const guessField = document.querySelector('#guessField');

  let guessCount = 1;
  let resetButton;

  function checkGuess() {
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
      guesses.textContent = 'Yours previous guesses: ';
    }

    guesses.textContent = `${guesses.textContent} ${userGuess}`;

    if (userGuess === randomNumber) {
      lastResult.textContent = 'Congratulations! You got it right!';
      lastResult.style.backgroundColor = 'green';
      lowOrHigh.textContent = '';
      setGameOver();
    } else if (guessCount === 5) {
      lastResult.textContent = `GAME OVER! Number was ${randomNumber}`;
      setGameOver();
    } else {
      lastResult.style.backgroundColor = 'red';
      lastResult.textContent = 'WRONG!';
      if (userGuess < randomNumber) {
        lowOrHigh.textContent = 'Last guess was too low!';
      } else {
        lowOrHigh.textContent = 'Last guess was too high!';
      }
    }
    guessCount++;
    guessField.value = '';
    guessField.focus();
  }

  function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start New Game';
    container.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
  }

  function resetGame() {
    guessCount = 1;
    guessField.disabled = false;
    guessSubmit.disabled = false;
    const resultParas = document.querySelectorAll('.resultParas p');
    for (const para of resultParas) {
      para.textContent = '';
    }
    resetButton.remove();
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 100) + 1;
  }
  guessSubmit.addEventListener('click', checkGuess);
}
