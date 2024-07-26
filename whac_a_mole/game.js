document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('startButton');

    let score = 0;
    let timer = 30;
    let gameInterval;
    let moleInterval;
    let snakeInterval;
    const maxMoles = 3;
    const moleAppearanceDuration = 2000;
    const moles = [];
    let snake = { status: false, element: null };

    function createGameBoard() {
        for (let i = 0; i < 12; i++) {
            const block = document.createElement('div');
            block.classList.add('gameBlock');
            block.dataset.id = i;
            block.addEventListener('click', handleBlockClick);
            gameBoard.appendChild(block);
            moles.push({ id: i, status: false, element: block });
        }
    }

    function handleBlockClick(event) {
        const block = event.currentTarget;
        const moleImg = block.querySelector('.mole');
        const snakeImg = block.querySelector('.snake');
        
        if (snakeImg && snakeImg.style.display === 'block') {
            endGameWithSnake();
        } else if (moleImg && moleImg.style.display === 'block') {
            score++;
            scoreElement.textContent = score;
            moleImg.remove();
            moles[block.dataset.id].status = false;
        }
    }

    function showRandomMole() {
        const activeMoles = moles.filter(mole => mole.status);
        if (activeMoles.length >= maxMoles) return;

        let randomIndex;
        let mole;

        do {
            randomIndex = Math.floor(Math.random() * moles.length);
            mole = moles[randomIndex];
        } while (mole.status);

        const block = mole.element;
        const moleImg = document.createElement('img');
        moleImg.src = './mole.jpg'; // replace with your mole image path
        moleImg.classList.add('mole');
        moleImg.style.display = 'block';
        block.appendChild(moleImg);

        mole.status = true;

        // Set a timeout to remove the mole after a certain period if not clicked
        setTimeout(() => {
            if (mole.status) {
                moleImg.remove();
                mole.status = false;
            }
        }, moleAppearanceDuration);
    }

    function showRandomSnake() {
        if (snake.status && snake.element) {
            const snakeImg = snake.element.querySelector('.snake');
            if (snakeImg) snakeImg.remove();
        }

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * moles.length);
        } while (moles[randomIndex].status && moles[randomIndex].element.querySelector('.snake'));

        const block = moles[randomIndex].element;
        const snakeImg = document.createElement('img');
        snakeImg.src = './snake.jpg'; // replace with your snake image path
        snakeImg.classList.add('snake');
        snakeImg.style.display = 'block';
        block.appendChild(snakeImg);

        snake.status = true;
        snake.element = block;
    }

    function endGameWithSnake() {
        alert('Game Over! You clicked on the snake.');
        clearIntervals();
        moles.forEach(mole => {
            mole.status = false;
            const moleImg = mole.element.querySelector('.mole');
            if (moleImg) moleImg.remove();
        });
        if (snake.element) {
            const snakeImg = snake.element.querySelector('.snake');
            if (snakeImg) snakeImg.remove();
        }
    }

    function startGame() {
        score = 0;
        timer = 30;
        scoreElement.textContent = score;
        timerElement.textContent = timer;

        clearIntervals();
        resetGameBoard();

        gameInterval = setInterval(() => {
            timer--;
            timerElement.textContent = timer;
            if (timer <= 0) {
                clearIntervals();
                alert('Time is Over!');
            }
        }, 1000);

        moleInterval = setInterval(showRandomMole, 1000);
        snakeInterval = setInterval(showRandomSnake, 2000);
    }

    function resetGameBoard() {
        moles.forEach(mole => {
            mole.status = false;
            const moleImg = mole.element.querySelector('.mole');
            if (moleImg) moleImg.remove();
        });
        if (snake.element) {
            const snakeImg = snake.element.querySelector('.snake');
            if (snakeImg) snakeImg.remove();
            snake.status = false;
            snake.element = null;
        }
    }

    function clearIntervals() {
        clearInterval(gameInterval);
        clearInterval(moleInterval);
        clearInterval(snakeInterval);
    }

    startButton.addEventListener('click', startGame);

    createGameBoard();
});
