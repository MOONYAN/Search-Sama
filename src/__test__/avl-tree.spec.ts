import { AVLTree } from '../avl-tree';

test('height: 0', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);

    expect(tree.height).toEqual(0);
})

test('height: 1', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    tree.insert(0);

    expect(tree.height).toEqual(1);
})

test('height: 2', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    tree.insert(0);
    tree.insert(1);

    expect(tree.height).toEqual(2);
})


test('height: 3', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    tree.insert(0);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);

    expect(tree.height).toEqual(3);
})

test('height: 2 LL', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    tree.insert(2);
    tree.insert(1);
    tree.insert(0);
    expect(tree.height).toEqual(2);
})

test('height: 2 LR', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    tree.insert(2);
    tree.insert(0);
    tree.insert(1);
    expect(tree.height).toEqual(2);
})

test('height: 2 RR', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    tree.insert(0);
    tree.insert(1);
    tree.insert(2);
    expect(tree.height).toEqual(2);
})

test('height: 2 RL', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    tree.insert(0);
    tree.insert(2);
    tree.insert(1);
    expect(tree.height).toEqual(2);
})

test('height: 3 LL', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    for (let i = 5; i > 0; i--) {
        tree.insert(i);
    }
    expect(tree.height).toEqual(3);
})

test('height: 3 LR', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    tree.insert(5);
    tree.insert(4);
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    expect(tree.height).toEqual(3);
})

test('height: 3 RR', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    for (let i = 0; i < 5; i++) {
        tree.insert(i);
    }
    expect(tree.height).toEqual(3);
})

test('height: 3 RL', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(5);
    tree.insert(4);
    expect(tree.height).toEqual(3);
})

test('level 0 search empty tree', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    expect(tree.search(0)).toEqual(false);
})

test('level 1 search exist', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    tree.insert(1);
    expect(tree.search(1)).toEqual(true);
})

test('level 2 search inexist', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    expect(tree.search(0)).toEqual(false);
})

test('level 2 search exist', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    expect(tree.search(3)).toEqual(true);
})