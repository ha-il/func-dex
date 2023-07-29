import { PriorityQueue } from "../PriorityQueue";

const priorityQueue = new PriorityQueue();

priorityQueue.enqueue("최하", 5);
priorityQueue.enqueue("상", 2);
priorityQueue.enqueue("최상", 1);
priorityQueue.enqueue("중", 3);
priorityQueue.enqueue("하", 4);

test("dequeue 1", () => {
  const node = priorityQueue.dequeue();
  expect([node.priority, node.value]).toEqual([1, "최상"]);
});
test("dequeue 2", () => {
  const node = priorityQueue.dequeue();
  expect([node.priority, node.value]).toEqual([2, "상"]);
});
test("dequeue 3", () => {
  const node = priorityQueue.dequeue();
  expect([node.priority, node.value]).toEqual([3, "중"]);
});
test("dequeue 4", () => {
  const node = priorityQueue.dequeue();
  expect([node.priority, node.value]).toEqual([4, "하"]);
});
test("dequeue 5", () => {
  const node = priorityQueue.dequeue();
  expect([node.priority, node.value]).toEqual([5, "최하"]);
});
