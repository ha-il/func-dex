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
test("set", () => {
  list.set("a", 0);
  expect(list.values()).toEqual(["a", "b", "c", "d"]);
});

test("insert", () => {
  list.insert(0, "z");
  list.insert(5, "f");
  expect(list.values()).toEqual(["z", "a", "b", "c", "d", "f"]);
});

test("remove", () => {
  list.remove(5);
  list.remove(0);
  list.remove(1);
  expect(list.values()).toEqual(["a", "c", "d"]);
});
