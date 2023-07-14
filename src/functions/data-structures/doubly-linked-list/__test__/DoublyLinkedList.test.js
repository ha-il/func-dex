import { DoublyLinkedList } from "../DoublyLinkedList.js";

const list = new DoublyLinkedList();

test("push", () => {
  list.push("a");
  list.push("b");
  expect(list.tail.value).toBe("b");
});

test("pop", () => {
  list.pop();
  expect(list.tail.value).toBe("a");
  list.pop();
  expect(list.tail).toBe(null);
});

test("shift", () => {
  list.push("a");
  list.push("b");
  list.push("c");
  list.shift();
  expect(list.values()).toEqual(["b", "c"]);
});

test("unshift", () => {
  list.unshift("a");
  expect(list.values()).toEqual(["a", "b", "c"]);
});
