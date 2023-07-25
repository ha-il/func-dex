/* 이진 탐색 트리
- 시간 복잡도
  - 접근: O(log(n))
  - 탐색: O(log(n))
  - 삽입: O(log(n))
  - 삭제: O(log(n))
- 공간 복잡도: O(n)
*/

export class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let currentNode = this.root;
    while (true) {
      if (value === currentNode.value) return undefined;
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return this;
        }
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      }
    }
  }
  contains(value) {
    if (this.root === null) return false;
    let currentNode = this.root;
    let found = false;
    while (currentNode && !found) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else {
        return true;
      }
    }
    return false;
  }
  BFS() {
    const result = [];
    const queue = [];
    let node = this.root;
    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      result.push(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }
  DFSPreOrder() {
    const result = [];
    const preOrder = (node) => {
      result.push(node);
      if (node.left) preOrder(node.left);
      if (node.right) preOrder(node.right);
    };
    preOrder(this.root);
    return result;
  }
  DFSPostOrder() {
    const result = [];
    const postOrder = (node) => {
      if (node.left) postOrder(node.left);
      if (node.right) postOrder(node.right);
      result.push(node);
    };
    postOrder(this.root);
    return result;
  }
  DFSInOrder() {
    const result = [];
    const InOrder = (node) => {
      if (node.left) InOrder(node.left);
      result.push(node);
      if (node.right) InOrder(node.right);
    };
    InOrder(this.root);
    return result;
  }
}
