import { DoublyLinkedList } from "../DoublyLinkedList.js";

const list = new DoublyLinkedList();

test("push", () => {
  list.push("a");
  list.push("b");
  expect(list.tail.value).toBe("b");
});
