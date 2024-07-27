class GameModel {
    constructor() {
        this.score = 0;
        this.timer = 30;
        this.moles = [];
        this.snake = { status: false, element: null };
    }

    initializeMoles(count) {
        this.moles = [];
        for (let i = 0; i < count; i++) {
            this.moles.push({ id: i, status: false, element: null });
        }
    }

    resetGame() {
        this.score = 0;
        this.timer = 30;
        this.moles.forEach(mole => {
            mole.status = false;
            mole.element = null;
        });
        this.snake.status = false;
        this.snake.element = null;
    }

    increaseScore() {
        this.score++;
    }

    decreaseTimer() {
        this.timer--;
    }

    isGameOver() {
        return this.timer <= 0;
    }

    setMoleStatus(id, status) {
        this.moles[id].status = status;
    }

    setSnakeStatus(status, element = null) {
        this.snake.status = status;
        this.snake.element = element;
    }
}

export default GameModel;
