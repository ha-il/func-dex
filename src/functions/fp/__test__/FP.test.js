import {
  map,
  filter,
  reduce,
  go,
  pipe,
  range,
  L,
  take,
  join,
  find,
  flatten,
  deepFlat,
  go1,
  delay,
  C,
  tap,
} from "../FP.js";

const f = pipe(
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100
);

const g = pipe(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100
);

const data = {
  keypad: {
    id: 0,
    grid: [
      [
        '<svg data-testid="1"><g></svg>',
        '<svg data-testid="2"><g></svg>',
        '<svg data-testid="9"><g></svg>',
        '<svg data-testid="blank1"><g></svg>',
      ],
      [
        '<svg data-testid="4"><g></svg>',
        '<svg data-testid="0"><g></svg>',
        '<svg data-testid="5"><g></svg>',
        '<svg data-testid="3"><g></svg>',
      ],
    ],
  },
};

test("map", () => expect(map((v) => v + 1, [1, 2, 3])).toEqual([2, 3, 4]));

test("filter", () =>
  expect(filter((p) => p % 2, [1, 2, 3, 4, 5])).toEqual([1, 3, 5]));

test("reduce", () => expect(reduce((a, b) => a + b, 0, [1, 2, 3])).toBe(6));

test("reduce: no acc", () =>
  expect(reduce((a, b) => a + b, [1, 2, 3])).toBe(6));

test("go", () =>
  expect(
    go(
      0,
      (a) => a + 1,
      (a) => a + 10,
      (a) => a + 100
    )
  ).toBe(111));

test("pipe: 1 arg", () => expect(f(0)).toBe(111));

test("pipe: 2 args", () => expect(g(0, 1)).toBe(111));

test("go, map, filter, reduce", () =>
  expect(
    go(
      [1, 2, 3, 4, 5],
      (iter) => map((v) => v * v, iter),
      (iter) => filter((v) => v % 2, iter),
      (iter) => reduce((a, b) => a + b, iter)
    )
  ).toBe(35));

test("curry: go, map, filter, reduce", () =>
  expect(
    go(
      [1, 2, 3, 4, 5],
      map((v) => v * v),
      filter((v) => v % 2),
      reduce((a, b) => a + b)
    )
  ).toBe(35));

test("range", () => expect(range(5)).toEqual([0, 1, 2, 3, 4]));

test("L.range", () => expect(reduce((a, b) => a + b, L.range(5))).toBe(10));

test("take", () => expect(go(range(100), take(3))).toEqual([0, 1, 2]));

test("L.map", () =>
  expect([...L.map((v) => v * v, [1, 2, 3])]).toEqual([1, 4, 9]));

test("L.filter", () =>
  expect([...L.filter((v) => v % 2, [1, 2, 3])]).toEqual([1, 3]));

test("join", () => expect(join("/", [2023, 7, 8])).toBe("2023/7/8"));

test("find", () =>
  expect(find((v) => v === "c", ["a", "b", "c", "d"])).toBe("c"));

test("L.flatten", () =>
  expect([...L.flatten([[1, 2], [3, 4], 5])]).toEqual([1, 2, 3, 4, 5]));

test("flatten", () =>
  expect(flatten([[1, 2], [3, 4], 5])).toEqual([1, 2, 3, 4, 5]));

test("L.deepFlat", () =>
  expect([...L.deepFlat([[[[[1], 2], 3], 4], 5])]).toEqual([1, 2, 3, 4, 5]));

test("deepFlat", () =>
  expect(deepFlat([[[[[1], 2], 3], 4], 5])).toEqual([1, 2, 3, 4, 5]));

test("2d array", () =>
  expect(
    go(
      data.keypad.grid,
      flatten,
      map((s) => s.match(/data-testid="([^"]+)"/)[1])
    )
  ).toEqual(["1", "2", "9", "blank1", "4", "0", "5", "3"]));

test("delay go1", () => expect(go1(delay(100, 10), (a) => a + 5)).toBe(15));

test("go with Promise", async () =>
  expect(
    await go(
      1,
      (a) => a + 10,
      (a) => Promise.resolve(a + 100),
      (a) => a + 1000
    )
  ).toBe(1111));

test("Lazy Promise", async () => {
  expect(
    await go(
      [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
      L.map((a) => a + 10),
      take(2)
    )
  ).toEqual([11, 12]);
});

test("Lazy not Promise", async () => {
  expect(
    await go(
      [1, 2, 3],
      L.map((a) => a + 10),
      take(2)
    )
  ).toEqual([11, 12]);
});

test("filter nop", async () => {
  expect(
    await go(
      [1, 2, 3, 4, 5, 6],
      L.map((a) => Promise.resolve(a * a)),
      L.filter((a) => a % 2),
      take(2)
    )
  ).toEqual([1, 9]);
});

test("reduce nop", async () => {
  expect(
    await go(
      [1, 2, 3, 4],
      L.map((a) => Promise.resolve(a * a)),
      L.filter((a) => Promise.resolve(a % 2)),
      reduce((a, b) => a + b)
    )
  ).toBe(10);
});

test("C.reduce", async () => {
  expect(
    await go(
      [1, 2, 3, 4, 5],
      L.map((a) => delay(1000, a * a)),
      L.filter((a) => delay(1000, a % 2)),
      C.reduce((a, b) => a + b)
    )
  ).toBe(35);
});

test("C.take", async () => {
  expect(
    await go(
      [1, 2, 3, 4, 5],
      L.map((a) => delay(1000, a * a)),
      L.filter((a) => delay(1000, a % 2)),
      C.take(2)
    )
  ).toEqual([1, 9]);
});

test("C.map", async () => {
  expect(await C.map((a) => delay(1000, a * a), [1, 2, 3, 4])).toEqual([
    1, 4, 9, 16,
  ]);
});

test("C.filter", async () => {
  expect(await C.filter((a) => delay(1000, a % 2), [1, 2, 3, 4])).toEqual([
    1, 3,
  ]);
});

test("tap", () => {
  expect(
    go(
      [1, 2, 3, 4, 5],
      tap(map((a) => a + 1)),
      map((a) => a * a)
    )
  ).toEqual([1, 4, 9, 16, 25]);
});
