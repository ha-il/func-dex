import { Queue } from "../Queue";

const queue = new Queue();

test("enqueue", () => {
  queue.enqueue("a");
  queue.enqueue("b");
  queue.enqueue("c");
  expect(queue.values()).toEqual(["a", "b", "c"]);
});

test("dequeue", () => {
  queue.dequeue();
  expect(queue.values()).toEqual(["b", "c"]);
});
