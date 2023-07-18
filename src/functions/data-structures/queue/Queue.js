/* 큐
- 시간 복잡도
  - 삽입: O(1)
  - 삭제: O(1)
*/

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  enqueue(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return this.size++;
  }
  dequeue() {
    if (this.size === 0) return false;
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
    const currentQueue = [];
    for (const n of this) {
      currentQueue.push(n.value);
    }
    return currentQueue;
  }
}
