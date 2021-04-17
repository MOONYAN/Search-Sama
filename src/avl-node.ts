export class AVLNode<T> {

    private _height = 1;

    private _left?: AVLNode<T>;

    private _right?: AVLNode<T>;

    constructor(
        private value: T,
        private compare: (a: T, b: T) => number) {
    }

    get height() {
        return this._height;
    }

    get hightDiff(): number {
        const [leftH, rightH] = [this._left, this._right].map(n => n ? n._height : 0);
        return leftH - rightH;
    }

    isUnbalance(): boolean {
        return Math.abs(this.hightDiff) > 1;
    }

    rotate(): AVLNode<T> | undefined {

        const diff = this.hightDiff;
        let root: AVLNode<T> | undefined = this;

        if (diff > 1) {
            if (this._left!.hightDiff === -1) {
                this._left = this._left!.turnLeft();
            }
            root = this.turnRight();

        } else if (diff < -1) {
            if (this._right!.hightDiff === 1) {
                this._right = this._right!.turnRight();
            }
            root = this.turnLeft();
        }
        return root;
    }

    insert(val: T) {
        if (this.compare(val, this.value) < 0) {
            this.insertLeft(val);
            if (this._left!.isUnbalance()) {
                this._left = this._left!.rotate();
            }
        } else {
            this.insertRight(val);
            if (this._right!.isUnbalance()) {
                this._right = this._right!.rotate();
            }
        }
        this.updateHeight();
    }

    private insertLeft(val: T) {
        if (!this._left) {
            this._left = new AVLNode(val, this.compare);
        } else {
            this._left.insert(val);
        }
    }

    private insertRight(val: T) {
        if (!this._right) {
            this._right = new AVLNode(val, this.compare);
        } else {
            this._right.insert(val);
        }
    }

    private updateHeight() {
        const [leftH, rightH] = [this._left, this._right].map(n => n ? n._height : 0);
        this._height = Math.max(leftH, rightH) + 1;
    }

    private turnLeft(): AVLNode<T> | undefined {
        let root = this._right;
        this._right = root!._left;
        root!._left = this;
        root!._left.updateHeight();   
        root!.updateHeight();     
        return root;
    }

    private turnRight(): AVLNode<T> | undefined {
        let root = this._left;
        this._left = root!._right;
        root!._right = this;
        root!._right.updateHeight();
        root!.updateHeight();
        return root;
    }
}