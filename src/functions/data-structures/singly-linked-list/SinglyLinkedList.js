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
}
