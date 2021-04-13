import { BNode } from "./b-node";

export class BTree<T> {

    private _root: BNode<T>;

    private _height = 1;

    constructor(order: number, compare: (a: T, b: T) => number) {
        this._root = new BNode<T>(order, true, compare);
    }

    insert(val: T) {
        let node = this._root;
        node.insert(val);
        if (node.isFull()) {
            node.split();
            this._height++;
        }
    }

    get height() {
        return this._height;
    }
}