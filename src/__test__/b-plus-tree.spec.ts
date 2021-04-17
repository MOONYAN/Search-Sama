import { BPlusTree } from './../b-plus-tree';

test('level 1', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    tree.insert(1, 1);
    tree.insert(2, 2);
    expect(tree.height).toEqual(1);
});

test('level 2', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    tree.insert(1, 1);
    tree.insert(2, 2);
    tree.insert(3, 3);
    expect(tree.height).toEqual(2);
})

test('level 3 decrease', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    for (let i = 7; i > 0; i--) {
        tree.insert(i, i);
    }
    expect(tree.height).toEqual(3);
})

test('level 3 increase', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    for (let i = 0; i < 5; i++) {
        tree.insert(i, i);
    }
    expect(tree.height).toEqual(3);
})

test('level 1 search inexist', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    tree.insert(1, 1);
    tree.insert(2, 2);
    expect(tree.search(0)).toEqual(false);
})

test('level 1 search exist', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    tree.insert(1, 1);
    tree.insert(2, 2);
    expect(tree.search(2)).toEqual(true);
})

test('level 2 search inexist', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    tree.insert(1, 1);
    tree.insert(2, 2);
    tree.insert(3, 3);
    expect(tree.search(0)).toEqual(false);
})

test('level 2 search exist', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    tree.insert(1, 1);
    tree.insert(2, 2);
    tree.insert(3, 3);
    expect(tree.search(2)).toEqual(true);
})

test('level 3 search inexist', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    for (let i = 1; i <= 5; i++) {
        tree.insert(i, i);
    }
    expect(tree.search(0)).toEqual(false);
})

test('level 3 search exist', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    for (let i = 1; i <= 5; i++) {
        tree.insert(i, i);
    }
    expect(tree.search(2)).toEqual(true);
})

test('level 1 fetch range', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    tree.insert(1, 1);
    tree.insert(2, 2);
    expect(tree.fetchRange(1, 3)).toEqual([1, 2]);
})

test('level 2 fetch range', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    tree.insert(1, 1);
    tree.insert(2, 2);
    tree.insert(3, 3);
    expect(tree.fetchRange(1, 3)).toEqual([1, 2, 3]);
})

test('level 2 fetch mid range', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    tree.insert(1, 1);
    tree.insert(2, 2);
    tree.insert(3, 3);
    expect(tree.fetchRange(3,5)).toEqual([3]);
})

test('level 3 fetch range', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    for (let i = 1; i <= 5; i++) {
        tree.insert(i, i);
    }
    expect(tree.fetchRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
})

test('level 3 fetch mid range', () => {
    let tree: BPlusTree<number, number> = new BPlusTree<number, number>(3, (a, b) => a - b);
    for (let i = 1; i <= 5; i++) {
        tree.insert(i, i);
    }
    expect(tree.fetchRange(2, 4)).toEqual([2, 3, 4]);
})

