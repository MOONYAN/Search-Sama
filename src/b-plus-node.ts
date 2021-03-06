export abstract class BPlusNode<K, T> {

    keys: K[];

    constructor(protected order: number, protected compare: (a: K, b: K) => number) {
        this.keys = [];
    }

    abstract split(): BPlusNode<K, T>;

    abstract insert(key: K, val: T): void;

    abstract search(key: K): boolean;

    abstract fetchRange(begin: K, end: K): K[];

    isOverflow(): boolean {
        return this.keys.length === this.order;
    }

    protected get minDegree(): number {
        return (this.order + 1) >>> 1;
    }

    protected get minKey(): number {
        return this.order >>> 1;
    }
}

export class BPlusInternalNode<K, T> extends BPlusNode<K, T> {

    children: BPlusNode<K, T>[];

    constructor(order: number, compare: (a: K, b: K) => number) {

        super(order, compare);
        this.children = [];
    }

    split(): BPlusNode<K, T> {

        const pk = this.minKey;
        let left = new BPlusInternalNode<K, T>(this.order, this.compare);
        let right = new BPlusInternalNode<K, T>(this.order, this.compare);

        left.keys = this.keys.slice(0, pk);
        right.keys = this.keys.slice(pk + 1);
        left.children = this.children.slice(0, this.minDegree);
        right.children = this.children.slice(this.minDegree);

        this.children = [left, right];
        this.keys = [this.keys[pk]];

        return this;
    }

    insert(key: K, val: T): void {

        let pos = 0;

        while (pos < this.keys.length && this.compare(key, this.keys[pos]) > 0) {
            pos++;
        }

        this.children[pos].insert(key, val);

        if (this.children[pos].isOverflow()) {
            this.children[pos] = this.children[pos].split();
            this.mergeChild(pos);
        }
    }

    search(key: K): boolean {
        let pos = 0;
        while (pos < this.keys.length && this.compare(key, this.keys[pos]) >= 0) {
            pos++;
        }
        return this.children[pos].search(key);
    }

    fetchRange(begin: K, end: K): K[] {
        let pos = 0;
        while (pos < this.keys.length && this.compare(begin, this.keys[pos]) >= 0) {
            pos++;
        }
        return this.children[pos].fetchRange(begin, end);
    }

    private mergeChild(pos: number) {

        let node = this.children[pos] as BPlusInternalNode<K, T>;
        this.keys = [...this.keys.slice(0, pos), ...node.keys, ...this.keys.slice(pos)];
        this.children = [...this.children.slice(0, pos), ...node.children, ...this.children.slice(pos + 1)];
    }
}

export class BPlusLeafNode<K, T> extends BPlusNode<K, T> {

    datas: T[];

    next?: BPlusLeafNode<K, T>;

    constructor(order: number, compare: (a: K, b: K) => number) {

        super(order, compare);
        this.datas = [];
    }

    split(): BPlusNode<K, T> {

        const pk = this.minKey;

        let right = new BPlusLeafNode<K, T>(this.order, this.compare);

        right.keys = this.keys.slice(pk);
        this.keys = this.keys.slice(0, pk);

        right.datas = this.datas.slice(pk);
        this.datas = this.datas.slice(0, pk);
        
        this.next = right;

        let upgrade = new BPlusInternalNode<K, T>(this.order, this.compare);
        upgrade.children = [this, right];
        upgrade.keys = [right.keys[0]];

        return upgrade;
    }

    insert(key: K, val: T): void {

        const length = this.keys.length;
        let pos = length;

        while (pos > 0 && this.compare(key, this.keys[pos - 1]) < 0) {
            this.keys[pos] = this.keys[pos - 1];
            this.datas[pos] = this.datas[pos - 1];
            pos--;
        }

        this.keys[pos] = key;
        this.datas[pos] = val;
    }

    search(key: K): boolean {
        let pos = 0;
        while (pos < this.keys.length && this.compare(key, this.keys[pos]) > 0) {
            pos++;
        }
        return this.compare(key, this.keys[pos]) === 0;
    }

    fetchRange(begin: K, end: K): K[] {

        let collection: K[] = [];

        for (let i = 0; i < this.keys.length; i++) {
            const k = this.keys[i];
            if (this.compare(begin, k) > 0) {
                continue;
            }
            if (this.compare(k, end) <= 0) {
                collection.push(k);
            } else {
                return collection;
            }
        }
        return (this.next) ? collection.concat(this.next.fetchRange(begin, end)) : collection;
    }
}