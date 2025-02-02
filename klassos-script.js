const words = ['python', 'coding', 'game', 'computer', 'learn', 'world'];
let selectedWord, displayWord, remainingAttempts;

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord = Array(selectedWord.length).fill('_');
    remainingAttempts = 10;

    document.getElementById('word-display').textContent = displayWord.join(' ');
    document.getElementById('attempts-count').textContent = remainingAttempts;
    document.getElementById('feedback').textContent = '';
    document.getElementById('guess-input').value = '';
}

function checkGuess() {
    const guessInput = document.getElementById('guess-input');
    const feedbackDiv = document.getElementById('feedback');
    const guess = guessInput.value.toLowerCase();

    if (!guess || guess.length !== 1) {
        feedbackDiv.textContent = 'אנא הכניסו אות אחת בלבד';
        return;
    }

    let found = false;
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guess) {
            displayWord[i] = guess;
            found = true;
        }
    }

    if (!found) {
        remainingAttempts--;
        document.getElementById('attempts-count').textContent = remainingAttempts;
    }

    document.getElementById('word-display').textContent = displayWord.join(' ');
    guessInput.value = '';

    if (!displayWord.includes('_')) {
        feedbackDiv.textContent = 'כל הכבוד! ניצחתם!';
        disableGame();
    } else if (remainingAttempts === 0) {
        feedbackDiv.textContent = `נגמרו הניסיונות. המילה הייתה: ${selectedWord}`;
        disableGame();
    }
}

function disableGame() {
    document.getElementById('submit-btn').disabled = true;
    document.getElementById('guess-input').disabled = true;
}

// Initialize game on page load
document.addEventListener('DOMContentLoaded', initGame);
