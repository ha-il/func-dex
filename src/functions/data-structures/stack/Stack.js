class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  push(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      const nextNode = this.first;
      this.first = newNode;
      newNode.next = nextNode;
    }
    return this.size++;
  }
  pop() {
    if (this.size === 0) return null;
    const targetNode = this.first;
    if (this.size === 1) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return targetNode;
  }
  *[Symbol.iterator]() {
    let currentNode = this.first;
    while (currentNode) {
      yield currentNode;
      currentNode = currentNode.next;
    }
  }
  values() {
    const array = [];
    for (const a of this) {
      array.unshift(a.value);
    }
    return array;
  }
}

export default Stack;
