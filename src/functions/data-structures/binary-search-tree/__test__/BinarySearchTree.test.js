import { BinarySearchTree, Node } from "../BinarySearchTree";

const tree = new BinarySearchTree();
tree.root = new Node(10);
tree.root.right = new Node(15);
tree.root.left = new Node(7);
tree.root.left.right = new Node(9);

test("tree", () => expect(tree.root.left.right.value).toBe(9));
test("insert", () => {
  tree.insert(6);
  expect(tree.root.left.left.value).toBe(6);
});
test("contains 9", () => expect(tree.contains(9)).toBe(true));
test("contains 100", () => expect(tree.contains(100)).toBe(false));
