/* 이중 연결 리스트
- 시간 복잡도
  - 접근: O(n)
  - 탐색: O(n)
  - 삽입: O(1)
  - 삭제: O(1)
- 공간 복잡도: O(n)
*/

export class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}
export class DoublyLinkedList {
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
  values() {
    const currentList = [];
    for (const n of this) {
      currentList.push(n.value);
    }
    return currentList;
  }
  push(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  pop() {
    if (this.length === 0) return undefined;
    const targetNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
      targetNode.prev = null;
    }
    this.length--;
    return targetNode;
  }
  unshift(value) {
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  shift() {
    if (this.length === 0) return undefined;
    const targetNode = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = targetNode.next;
      this.head.prev = null;
      targetNode.next = null;
    }
    this.length--;
    return targetNode;
  }
  get(index) {
    if (index < 0 || index > this.length) return null;

    const midIndex = Math.floor(this.length / 2);
    let targetNode, counter;

    if (index <= midIndex) {
      targetNode = this.head;
      counter = 0;
      while (counter !== index) {
        targetNode = targetNode.next;
        counter++;
      }
    } else {
      targetNode = this.tail;
      counter = this.length - 1;
      while (counter !== index) {
        targetNode = targetNode.next;
        counter--;
      }
    }
    return targetNode;
  }
  set(index, value) {
    const targetNode = this.get(index);
    if (targetNode) {
      targetNode.value = value;
      return true;
    }
    return false;
  }
  insert(index, value) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(value);
    if (index === this.length) return !!this.push(value);

    const newNode = new Node(value);
    const targetNode = this.get(index - 1);
    const nextNode = targetNode.next;

    targetNode.next = newNode;
    newNode.prev = targetNode;
    newNode.next = nextNode;
    nextNode.prev = newNode;

    this.length++;
    return true;
  }
  remove(index) {
    if (index < 0 || index > this.length) return undefined;
    if (index === this.length - 1) return this.pop();
    if (index === 0) return this.shift();

    const targetNode = this.get(index);

    const prevNode = targetNode.prev;
    const nextNode = targetNode.next;

    prevNode.next = nextNode;
    nextNode.prev = prevNode;

    this.length--;
    return targetNode;
  }
}
