import { BPlusLeafNode, BPlusNode } from "./b-plus-node";

export class BPlusTree<K, T> {

    private _root: BPlusNode<K, T>;

    private _height = 1;

    constructor(order: number, compare: (a: K, b: K) => number) {
        this._root = new BPlusLeafNode(order, compare);
    }

    insert(key: K, val: T) {
        this._root.insert(key, val);
        if (this._root.isOverflow()) {
            this._root = this._root.split();
            this._height++;
        }
    }

    search(key: K): boolean {
        return this._root.search(key);
    }

    fetchRange(begin: K, end: K): K[] {
        return this._root.fetchRange(begin, end);
    }

    get height() {
        return this._height;
    }

}