import { _decorator, Canvas, Collider2D, Component, Contact2DType, director, find, IPhysics2DContact, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}

const randomGap = (min: number, max: number) => {
    const random = Math.random(); // generates a random number between 0 and 1
    return random < 0.5 ? min : max; // returns 10 if random is less than 0.5, otherwise returns 20
}

@ccclass('FoodSpawn')
export class FoodSpawn extends Component {
    @property({ type: Node })
    public food: Node;

    private _grid = 20;

    // temp position
    public foodPos = new Vec3;
    public moveSpeed = 200;

    onLoad() {
        // init pos
        this.initPos();
    }

    initPos() {
        // get canvas size
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);

        // canvas size
        const canvasWidth = canvas.getComponent(UITransform).width;
        const canvasHeight = canvas.getComponent(UITransform).height;

        // food size
        const foodWidth = this.food.getComponent(UITransform).width;
        const foodHeight = this.food.getComponent(UITransform).height;

        // set position to temp pos of food
        this.foodPos.x = random(-15, 15) * this._grid - randomGap(-10, 10);
        this.foodPos.y = random(-11, 11) * this._grid - randomGap(-10, 10);

        // set position
        this.food.setPosition(this.foodPos);
    }
}


