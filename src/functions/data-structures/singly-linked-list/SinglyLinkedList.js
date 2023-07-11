/* 단일 연결 리스트
- 시간 복잡도
  - 접근: O(n)
  - 탐색: O(n)
  - 삽입: O(1)
  - 삭제: O(n)
- 공간 복잡도: O(n)
*/

export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  *[Symbol.iterator]() {
    let currentNode = this.head;
    while (currentNode) {
      yield currentNode;
      currentNode = currentNode.next;
    }
  }
  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (this.length === 0) return undefined;
    let deletedNode = this.head;
    let newTailNode = deletedNode;
    while (deletedNode.next) {
      newTailNode = deletedNode;
      deletedNode = deletedNode.next;
    }
    this.tail = newTailNode;
    this.tail.next = null;
    this.length--;
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    return deletedNode;
  }
  shift() {
    if (this.head === 0) return undefined;
    let deletedNode = this.head;
    this.head = deletedNode.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    return deletedNode;
  }
  unshift(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let counter = 0;
    let currentNode = this.head;
    while (counter++ < index) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  set(value, index) {
    const foundNode = this.get(index);
    if (!foundNode) return false;
    foundNode.value = value;
    return true;
  }
  values() {
    const currentList = [];
    for (const n of this) {
      currentList.push(n.value);
    }
    return currentList;
  }
}
