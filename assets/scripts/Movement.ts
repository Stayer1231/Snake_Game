import { _decorator, Canvas, Component, director, EventKeyboard, game, Input, input, KeyCode, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Movement')
export class Movement extends Component {
    @property({ type: Node })
    public snake: Node;

    public snakePos = new Vec3;
    public grid = 20;

    public snakeDirection: "up" | "down" | "left" | "right";

    onLoad() {
        this.initPos();
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        
        // set default snake's moving direction to RIGHT
        this.snakeDirection = 'right';
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {

            case KeyCode.ARROW_RIGHT:
                if (this.snakeDirection !== "left") {
                    this.snakeDirection = "right";
                }
                break;

            case KeyCode.ARROW_LEFT:
                if (this.snakeDirection !== "right") {
                    this.snakeDirection = "left";
                }
                break;

            case KeyCode.ARROW_UP:
                if (this.snakeDirection !== "down") {
                    this.snakeDirection = "up";
                }
                break;

            case KeyCode.ARROW_DOWN:
                if (this.snakeDirection !== "up") {
                    this.snakeDirection = "down";
                }
                break;

        }
    }

    initPos() {
        // get canvas size
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);

        // set position of snake when game start
        this.snakePos.x = -10;
        this.snakePos.y = -10;

        // set to real canvas
        this.snake.setPosition(this.snakePos);
    }

    update(deltaTime: number) {
        game.frameRate = 20;

        // get canvas size
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);

        //set snake to real positio, update it
        this.snakePos = this.snake.position;

        // move snake based on its direction
        if (this.snakeDirection === "up") {
            this.snakePos.y += this.grid;
            this.snake.setPosition(this.snakePos);

        } else if (this.snakeDirection == "left") {
            this.snakePos.x -= this.grid;
            this.snake.setPosition(this.snakePos);

        } else if (this.snakeDirection == "right") {
            this.snakePos.x += this.grid;
            this.snake.setPosition(this.snakePos);

        } else if (this.snakeDirection == "down") {
            this.snakePos.y -= this.grid;
            this.snake.setPosition(this.snakePos);
        }

        // make snake appear the other side of screen if it goes out
        if (this.snakePos.x < - canvas.getComponent(UITransform).width / 2) {
            this.snakePos.x = canvas.getComponent(UITransform).width / 2 - 10;
            this.snake.setPosition(this.snakePos);

        } else if (this.snakePos.x > canvas.getComponent(UITransform).width / 2) {
            this.snakePos.x = - canvas.getComponent(UITransform).width / 2 - 10;
            this.snake.setPosition(this.snakePos);

        } else if (this.snakePos.y < - canvas.getComponent(UITransform).height / 2) {
            this.snakePos.y = canvas.getComponent(UITransform).height / 2 - 10;
            this.snake.setPosition(this.snakePos);

        } else if (this.snakePos.y > canvas.getComponent(UITransform).height / 2) {
            this.snakePos.y = - canvas.getComponent(UITransform).height / 2 - 10;
            this.snake.setPosition(this.snakePos);
        }

    }

    resetSnake() {
        this.initPos();
        this.snakeDirection = 'right';
    }
}


