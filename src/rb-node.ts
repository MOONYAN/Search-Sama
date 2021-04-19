export enum Color {
    Red,
    Black
}

export class RBNode<T> {

    color: Color = Color.Red;

    private _left?: RBNode<T>;

    private _right?: RBNode<T>;

    constructor(
        private value: T,
        private compare: (a: T, b: T) => number) {
    }

    get height(): number {
        const [leftH, rightH] = [this._left, this._right].map(n => n ? n.height : 0);
        return Math.max(leftH, rightH) + 1;
    }

    isUnbalance(): boolean {
        return (this._left ? this._left.isDoubleRed() : false) || (this._right ? this._right.isDoubleRed() : false);
    }

    isDoubleRed(): boolean {
        const [rootR, leftR, rightR] = [this, this._left, this._right].map(n => n ? n.color === Color.Red : false);
        return rootR && (leftR || rightR);
    }

    reBalance(): RBNode<T> | undefined {

        const [leftR, rightR] = [this._left, this._right].map(n => n ? n.color === Color.Red : false);

        // case same as uncle [RR]
        if (leftR && rightR) {
            this._left!.color = Color.Black;
            this._right!.color = Color.Black;
            this.color = Color.Red;
            return this;
        }

        // case RR/RL
        if (rightR) {
            if (this._right!._left?.color === Color.Red) {
                this._right = this._right!.turnRight();
            }
            return this.turnLeft();
        } // case LL/LR
        else {
            if (this._left!._right?.color === Color.Red) {
                this._left!.turnLeft();
            }
            return this.turnRight();
        }
    }

    insert(val: T) {
        if (this.compare(val, this.value) < 0) {
            this.insertLeft(val);
            if (this._left!.isUnbalance()) {
                this._left = this._left!.reBalance();
            }
        } else {
            this.insertRight(val);
            if (this._right!.isUnbalance()) {
                this._right = this._right!.reBalance();
            }
        }
    }

    private insertLeft(val: T) {
        if (!this._left) {
            this._left = new RBNode(val, this.compare);
        } else {
            this._left.insert(val);
        }
    }

    private insertRight(val: T) {
        if (!this._right) {
            this._right = new RBNode(val, this.compare);
        } else {
            this._right.insert(val);
        }
    }

    private turnLeft(): RBNode<T> | undefined {
        let root = this._right;
        this._right = root!._left;
        root!._left = this;
        this.swapColor(root!._left, root!);
        return root;
    }

    private turnRight(): RBNode<T> | undefined {
        let root = this._left;
        this._left = root!._right;
        root!._right = this;
        this.swapColor(root!._right, root!);
        return root;
    }

    private swapColor(a: RBNode<T>, b: RBNode<T>) {
        [a.color, b.color] = [b.color, a.color];
    }
}