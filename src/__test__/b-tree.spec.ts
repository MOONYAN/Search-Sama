import { BTree } from './../b-tree';

test('level 1', () => {
    let tree: BTree<number> = new BTree<number>(3, (a, b) => a - b);
    tree.insert(1);
    tree.insert(2);
    expect(tree.height).toEqual(1);
});

test('level 2', () => {
    let tree: BTree<number> = new BTree<number>(3, (a, b) => a - b);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    expect(tree.height).toEqual(2);
})

test('level 3 decrease', () => {
    let tree: BTree<number> = new BTree<number>(3, (a, b) => a - b);
    for (let i = 7; i > 0; i--) {
        tree.insert(i);
    }
    expect(tree.height).toEqual(3);
})

test('level 3 increase', () => {
    let tree: BTree<number> = new BTree<number>(3, (a, b) => a - b);
    for (let i = 0; i < 7; i++) {
        tree.insert(i);
    }
    expect(tree.height).toEqual(3);
})

test('level 1 search inexist', () => {
    let tree: BTree<number> = new BTree<number>(3, (a, b) => a - b);
    tree.insert(1);
    tree.insert(2);
    expect(tree.search(0)).toEqual(false);
})

test('level 1 search exist', () => {
    let tree: BTree<number> = new BTree<number>(3, (a, b) => a - b);
    tree.insert(1);
    tree.insert(2);
    expect(tree.search(2)).toEqual(true);
})

test('level 2 search inexist', () => {
    let tree: BTree<number> = new BTree<number>(3, (a, b) => a - b);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    expect(tree.search(0)).toEqual(false);
})

test('level 2 search exist', () => {
    let tree: BTree<number> = new BTree<number>(3, (a, b) => a - b);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    expect(tree.search(2)).toEqual(true);
})

test('level 3 search inexist', () => {
    let tree: BTree<number> = new BTree<number>(3, (a, b) => a - b);
    for (let i = 1; i <= 7; i++) {
        tree.insert(i);
    }
    expect(tree.search(0)).toEqual(false);
})

test('level 3 search exist', () => {
    let tree: BTree<number> = new BTree<number>(3, (a, b) => a - b);
    for (let i = 0; i <= 7; i++) {
        tree.insert(i);
    }
    expect(tree.search(2)).toEqual(true);
})