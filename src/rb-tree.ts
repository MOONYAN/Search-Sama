import { Color, RBNode } from './rb-node';

export class RBTree<T> {

    private _root?: RBNode<T>;

    constructor(private compare: (a: T, b: T) => number) {

    }

    insert(val: T) {
        if (!this._root) {
            this._root = new RBNode<T>(val, this.compare);
        } else {
            this._root.insert(val);
            if (this._root.isUnbalance()) {
                this._root = this._root.reBalance();
            }
        }
        this._root!.color = Color.Black;
    }

    get height() {
        return (this._root) ? this._root.height : 0;
    }
}