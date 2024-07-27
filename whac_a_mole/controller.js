import GameModel from './model.js';
import GameView from './view.js';

class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.bindStartButton(this.startGame.bind(this));
        this.view.createGameBoard(12, this.handleBlockClick.bind(this));
        this.model.initializeMoles(12);
    }

    handleBlockClick(event) {
        const block = event.currentTarget;
        const moleImg = block.querySelector('.mole');
        const snakeImg = block.querySelector('.snake');
        
        if (snakeImg && snakeImg.style.display === 'block') {
            this.endGameWithSnake();
        } else if (moleImg && moleImg.style.display === 'block') {
            this.model.increaseScore();
            this.view.updateScore(this.model.score);
            this.view.removeMole(block);
            this.model.setMoleStatus(block.dataset.id, false);
        }
    }

    showRandomMole() {
        const activeMoles = this.model.moles.filter(mole => mole.status);
        if (activeMoles.length >= 3) return;

        let randomIndex;
        let mole;

        do {
            randomIndex = Math.floor(Math.random() * this.model.moles.length);
            mole = this.model.moles[randomIndex];
        } while (mole.status);

        const block = this.view.gameBoard.children[mole.id];
        this.view.displayMole(block);
        this.model.setMoleStatus(mole.id, true);

        setTimeout(() => {
            if (this.model.moles[mole.id].status) {
                this.view.removeMole(block);
                this.model.setMoleStatus(mole.id, false);
            }
        }, 2000);
    }

    showRandomSnake() {
        if (this.model.snake.status && this.model.snake.element) {
            this.view.removeSnake(this.model.snake.element);
        }

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.model.moles.length);
        } while (this.model.moles[randomIndex].status && this.model.moles[randomIndex].element.querySelector('.snake'));

        const block = this.view.gameBoard.children[randomIndex];
        this.view.displaySnake(block);
        this.model.setSnakeStatus(true, block);
    }

    endGameWithSnake() {
        alert('Game Over! You clicked on the snake.');
        this.clearIntervals();
        this.model.resetGame();
        this.view.clearGameBoard();
        this.view.createGameBoard(12, this.handleBlockClick.bind(this));
    }

    startGame() {
        this.model.resetGame();
        this.view.updateScore(this.model.score);
        this.view.updateTimer(this.model.timer);
        this.clearIntervals();
        this.gameInterval = setInterval(() => {
            this.model.decreaseTimer();
            this.view.updateTimer(this.model.timer);
            if (this.model.isGameOver()) {
                this.clearIntervals();
                alert('Time is Over!');
            }
        }, 1000);
        this.moleInterval = setInterval(this.showRandomMole.bind(this), 1000);
        this.snakeInterval = setInterval(this.showRandomSnake.bind(this), 2000);
    }

    clearIntervals() {
        clearInterval(this.gameInterval);
        clearInterval(this.moleInterval);
        clearInterval(this.snakeInterval);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const model = new GameModel();
    const view = new GameView();
    new GameController(model, view);
});
