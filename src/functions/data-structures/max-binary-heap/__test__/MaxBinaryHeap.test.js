import { MaxBinaryHeap } from "../MaxBinaryHeap";

const heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);

test("insert", () => {
  heap.insert(55);
  expect(heap.values).toEqual([55, 39, 41, 18, 27, 12, 33]);
});

test("extractMax", () => {
  heap.extractMax();
  expect(heap.values).toEqual([41, 39, 33, 18, 27, 12]);
});
