import { SinglyLinkedList } from "../SinglyLinkedList.js";

const list = new SinglyLinkedList();

test("push a", () => expect(list.push("a").head.value).toBe("a"));
test("push b", () => expect(list.push("b").tail.value).toBe("b"));
test("push c", () => expect(list.push("c").length).toBe(3));
test("pop c", () => expect(list.pop().value).toBe("c"));
test("shift a", () => expect(list.shift().value).toBe("a"));
test("unshift z", () => {
  list.unshift("z");
  expect(list.head.value).toBe("z");
});
test("get", () => {
  list.push("c");
  list.push("d");

  expect(list.get(1).value).toBe("b");
});
