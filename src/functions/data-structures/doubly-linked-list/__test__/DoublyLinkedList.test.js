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

test("get", () => {
  expect(list.get(1).value).toBe("b");
  expect(list.get(2).value).toBe("c");
});

test("set", () => {
  list.set(1, "BE!");
  expect(list.values()).toEqual(["a", "BE!", "c"]);
});

test("insert", () => {
  list.insert(1, "b");
  expect(list.values()).toEqual(["a", "b", "BE!", "c"]);
});

test("remove", () => {
  list.remove(2);
  expect(list.values()).toEqual(["a", "b", "c"]);
});
