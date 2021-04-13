export class BNode<T> {

    private records: T[];

    private children: BNode<T>[];

    constructor(
        private order: number,
        private isLeaf: boolean,
        private compare: (a: T, b: T) => number) {

        this.records = [];
        this.children = [];
    }

    private get minDegree(): number {
        return (this.order + 1) >>> 1;
    }

    private get minRecord(): number {
        return this.order >>> 1;
    }
    insert(val: T) {
        if (this.isLeaf) {
            this.insertToLeaf(val);
        } else {
            this.insertToChild(val);
        }
    }

    isFull(): boolean {
        return this.records.length === this.order;
    }

    split() {
        const pk = this.minDegree - 1;
        let left = new BNode<T>(this.order, this.isLeaf, this.compare);
        let right = new BNode<T>(this.order, this.isLeaf, this.compare);

        left.records = this.records.slice(0, pk);
        right.records = this.records.slice(pk + 1);
        left.children = this.children.slice(0, pk + 1);
        right.children = this.children.slice(pk + 1);

        this.children = [left, right];
        this.records = [this.records[pk]];
        this.isLeaf = false;
    }

    private insertToLeaf(val: T) {

        const length = this.records.length;
        let pos = length;

        while (pos > 0 && this.compare(val, this.records[pos - 1]) < 0) {
            this.records[pos] = this.records[pos - 1];
            pos--;
        }

        this.records[pos] = val;
    }

    private insertToChild(val: T) {

        let pos = 0;

        while (pos < this.records.length && this.compare(val, this.records[pos]) > 0) {
            pos++;
        }

        this.children[pos].insert(val);

        if (this.children[pos].isFull()) {
            this.children[pos].split();
            this.mergeChild(pos);
        }
    }

    private mergeChild(pos: number) {

        let node = this.children[pos];
        this.records = [...this.records.slice(0, pos), ...node.records, ...this.records.slice(pos)];
        this.children = [...this.children.slice(0, pos), ...node.children, ...this.children.slice(pos + 1)];
    }
}