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

test('height: 4', () => {
    let tree: AVLTree<number> = new AVLTree((a, b) => a - b);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    tree.insert(6);
    tree.insert(0);

    expect(tree.height).toEqual(4);
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