import Stack from "../Stack";

const stack = new Stack();

test("push", () => {
  stack.push("a");
  stack.push("b");
  stack.push("c");
  expect(stack.values()).toEqual(["a", "b", "c"]);
});

test("push", () => {
  stack.pop();
  expect(stack.values()).toEqual(["a", "b"]);
});
