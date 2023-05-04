import { _decorator, Canvas, Collider2D, Color, Component, Contact2DType, director, EventKeyboard, find, Game, game, Input, input, instantiate, IPhysics2DContact, KeyCode, Node, NodePool, Prefab, Sprite, SpriteAtlas, UITransform, Vec3 } from 'cc';
import { SnakePool } from './SnakePool';
const { ccclass, property } = _decorator;

@ccclass('SnakeFunction')
export class SnakeFunction extends Component {
    @property ({ type: SnakePool})
    public snakePool: SnakePool;

    @property({ type: Node })
    public snakeHead: Node;

    public game;

    public isCollided: boolean = false;

    onLoad() {
        this.game = find("GameCtrl").getComponent("GameCtrl");
        const collider = this.node.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.isCollided = true;
        
        // when snake collides with it self
        if (otherCollider.tag === 2) {
            this.snakeHead.getComponent(Sprite).color = new Color(255, 0, 0, 255); // red
            this.snakeHead.setSiblingIndex(this.snakePool.node.children.length);
            director.pause();
        }

        // when snake eat apple
        if (otherCollider.tag === 1) {
            setTimeout(() => {
                this.snakePool.addPool();
                otherCollider.node.destroy();
                this.game.foodCreate();
            }, 0);
        }
    }
}


