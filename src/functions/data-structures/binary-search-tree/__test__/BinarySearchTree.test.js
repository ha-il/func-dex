import { BinarySearchTree, Node } from "../BinarySearchTree";

const tree = new BinarySearchTree();

test("insert", () => {
  tree.insert(10);
  tree.insert(6);
  tree.insert(15);
  tree.insert(3);
  tree.insert(8);
  tree.insert(20);
  expect(tree.root.left.left.value).toBe(3);
});
test("contains 8", () => expect(tree.contains(8)).toBe(true));
test("contains 100", () => expect(tree.contains(100)).toBe(false));
test("BFS", () =>
  expect(tree.BFS().map((n) => n.value)).toEqual([10, 6, 15, 3, 8, 20]));
test("DFS PreOrder", () =>
  expect(tree.DFSPreOrder().map((n) => n.value)).toEqual([
    10, 6, 3, 8, 15, 20,
  ]));
test("DFS PostOrder", () =>
  expect(tree.DFSPostOrder().map((n) => n.value)).toEqual([
    3, 8, 6, 20, 15, 10,
  ]));
test("DFS InOrder", () =>
  expect(tree.DFSInOrder().map((n) => n.value)).toEqual([3, 6, 8, 10, 15, 20]));
