import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FoodPool')
export class FoodPool extends Component {
    @property({ type: Prefab })
    public foodPrefab = null;

    @property({ type: Node })
    public foodpoolHome;

    public pool = new NodePool;
    public createFood: Node = null;

    initPool() {
        let intitCount = 100;

        for (let i = 0; i < intitCount; i++) {
            let createFood = instantiate(this.foodPrefab);

            if (i == 0) {
                this.foodpoolHome.addChild(createFood);
            } else {
                this.pool.put(createFood);
            }
        }
    }

    addPool() {
        if (this.pool.size() > 0) {
            this.createFood = this.pool.get();
        } else {
            this.createFood = instantiate(this.foodPrefab);
        }

        this.foodpoolHome.addChild(this.createFood);
    }

    reset() {
        this.foodpoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}


