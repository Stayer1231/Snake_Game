import { _decorator, Collider, Color, Component, find, instantiate, Node, Prefab, Sprite, Vec3 } from 'cc';
import { SnakeFunction } from './SnakeFunction';
const { ccclass, property } = _decorator;

@ccclass('SnakePool')
export class SnakePool extends Component {
    @property({ type: Prefab })
    public snakePrefab: Prefab;

    @property({ type: Node })
    public snakePoolHome;

    @property({ type: Node })
    public snake: Node;

    public createSnake: Node = null;

    // initial snake array to store snake part
    public snakeArray: Node[] = [];

    public segmentPos = new Vec3;

    onLoad() {
        this.snakeArray.push(this.snake);
    }

    // add segments
    addPool() {
        // create snake node from snake prefab
        this.createSnake = instantiate(this.snakePrefab);

        // get the prefabs appeared on screen by adding it to main node
        this.snakePoolHome.addChild(this.createSnake);
        // push the prafabs created into the array after snake's head
        this.snakeArray.push(this.createSnake);

        // spawn new snake segments
        this.segmentPos = this.snakeArray[this.snakeArray.length - 1].position;
        this.createSnake.setPosition(this.segmentPos);
    }

    reset() {
        // reset the body of the snake
        for (let i = 1; i < this.snakeArray.length; i++) {
            this.snakeArray[i].destroy();
        }

        // reset the array to 0
        this.snakeArray.length = 0;

        // put head back into the array
        this.snakeArray.push(this.snake);
        this.snake.getComponent(Sprite).color = new Color(18, 230, 0, 255); // green
    }

    update(deltaTime: number) {
        const snakeHead = this.node.getChildByName("Snake_head");
        for (let i = this.snakeArray.length - 1; i > 0; i--) {
            this.snakeArray[i].position = this.snakeArray[i - 1].position;
        }
    }

}


