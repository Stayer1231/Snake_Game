import { _decorator, CCInteger, Component, director, EventKeyboard, game, Input, input, KeyCode, Node } from 'cc';
import { FoodPool } from './FoodPool';
import { Movement } from './Movement';
import { SnakePool } from './SnakePool';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
    @property({ type: Movement })
    public snakeMovement: Movement;

    @property({type: SnakePool})
    public snakeFunction: SnakePool;

    @property({ type: FoodPool })
    public foodQueue: FoodPool;

    onLoad() {
        this.initListener();
        this.startGame();
    }

    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            
            case KeyCode.KEY_R: //reset the game
                this.resetGame();
                break;

            case KeyCode.ESCAPE: //pause the game
                director.pause();
                break;

            case KeyCode.SPACE:
                director.resume();
        }
    }

    // innitial food placement when start the game
    startGame() {
        this.foodQueue.initPool();
    }

    resetGame() {
        this.snakeMovement.resetSnake();
        this.foodQueue.reset();
        this.snakeFunction.reset();
        director.resume();
    }

    gameOver() {
        this.resetGame();
        director.pause();
    }

    foodCreate() {
        this.foodQueue.addPool();
    }

    update(deltaTime: number) {
        game.frameRate = 18;
    }
}


