class GameView {
    constructor() {
        this.gameBoard = document.getElementById('gameBoard');
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.startButton = document.getElementById('startButton');
    }

    createGameBoard(count, handleBlockClick) {
        for (let i = 0; i < count; i++) {
            const block = document.createElement('div');
            block.classList.add('gameBlock');
            block.dataset.id = i;
            block.addEventListener('click', handleBlockClick);
            this.gameBoard.appendChild(block);
        }
    }

    updateScore(score) {
        this.scoreElement.textContent = score;
    }

    updateTimer(timer) {
        this.timerElement.textContent = timer;
    }

    displayMole(block) {
        const moleImg = document.createElement('img');
        moleImg.src = './mole.jpg'; 
        moleImg.classList.add('mole');
        moleImg.style.display = 'block';
        block.appendChild(moleImg);
    }

    removeMole(block) {
        const moleImg = block.querySelector('.mole');
        if (moleImg) moleImg.remove();
    }

    displaySnake(block) {
        const snakeImg = document.createElement('img');
        snakeImg.src = './snake.jpg'; 
        snakeImg.classList.add('snake');
        snakeImg.style.display = 'block';
        block.appendChild(snakeImg);
    }

    removeSnake(block) {
        const snakeImg = block.querySelector('.snake');
        if (snakeImg) snakeImg.remove();
    }

    bindStartButton(handler) {
        this.startButton.addEventListener('click', handler);
    }

    clearGameBoard() {
        while (this.gameBoard.firstChild) {
            this.gameBoard.removeChild(this.gameBoard.firstChild);
        }
    }
}

export default GameView;
