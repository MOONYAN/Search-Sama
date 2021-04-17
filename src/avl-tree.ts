import { AVLNode } from './avl-node';

export class AVLTree<T> {

    private _root?: AVLNode<T>;

    constructor(private compare: (a: T, b: T) => number) {

    }

    insert(val: T) {
        if (!this._root) {
            this._root = new AVLNode(val, this.compare);
        } else {
            this._root.insert(val);
            if (this._root.isUnbalance()) {
                this._root = this._root.rotate();
            }
        }
    }

    get height() {
        return (this._root) ? this._root.height : 0;
    }
}