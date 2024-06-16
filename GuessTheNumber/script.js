document.addEventListener('DOMContentLoaded', (event) => {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let guessInput = document.getElementById('guessInput');
    let guessButton = document.getElementById('guessButton');
    let message = document.getElementById('message');

    guessButton.addEventListener('click', () => {
        let userGuess = parseInt(guessInput.value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            message.textContent = 'Please enter a number between 1 and 100.';
            message.style.color = 'red';
        } else if (userGuess < randomNumber) {
            message.textContent = 'Too low! Try again.';
            message.style.color = 'orange';
        } else if (userGuess > randomNumber) {
            message.textContent = 'Too high! Try again.';
            message.style.color = 'orange';
        } else {
            message.textContent = 'Congratulations! You guessed the number!';
            message.style.color = 'green';
        }
    });
});
