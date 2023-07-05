import { SinglyLinkedList } from "../SinglyLinkedList.js";

const list = new SinglyLinkedList();

test("push", () => expect(list.push("Hello").head.value).toBe("Hello"));
test("push", () => expect(list.push("World").tail.value).toBe("World"));
test("push", () => expect(list.push("World").length).toBe(3));
