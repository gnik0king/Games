document.addEventListener('DOMContentLoaded', (event) => {
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let guessInput = document.getElementById('guessInput');
    let guessButton = document.getElementById('guessButton');
    let message = document.getElementById('message');
    let body = document.body;

    guessButton.addEventListener('click', () => {
        let userGuess = parseInt(guessInput.value);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            message.textContent = 'Please enter a number between 1 and 100.';
            message.style.color = 'red';
            flashBackground('red');
        } else if (userGuess < randomNumber) {
            message.textContent = 'Too low! Try again.';
            message.style.color = 'orange';
            flashBackground('red');
        } else if (userGuess > randomNumber) {
            message.textContent = 'Too high! Try again.';
            message.style.color = 'orange';
            flashBackground('red');
        } else {
            message.textContent = 'Congratulations! You guessed the number!';
            message.style.color = 'green';
            flashBackground('green');
        }
    });

    function flashBackground(color) {
        body.style.backgroundColor = color;
        setTimeout(() => {
            body.style.backgroundColor = '#f4f4f4';
        }, 500);
    }
});
