// FP.js의 파일의 함수는 유인동 개발자님의 functional-javascript-01 저장소를 참고했음을 밝힙니다.
// 저장소 링크: https://github.com/indongyoo/functional-javascript-01
// 관련 강의: 함수형 프로그래밍과 JavaScript ES6+
// 강의 링크: https://www.inflearn.com/course/functional-es6

// curry
export const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);

// isIterable
export const isIterable = (a) => {
  return a != null && !!a[Symbol.iterator];
};

// Promise
// go1, nop, reduceF, head, delay
export const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

export const nop = Symbol("nop");

export const reduceF = (acc, a, f) =>
  a instanceof Promise
    ? a.then(
        (a) => f(acc, a),
        (e) => (e == nop ? acc : Promise.reject(e))
      )
    : f(acc, a);
export const head = (iter) => go1(take(1, iter), ([h]) => h);

export const delay = curry((time, a) => {
  new Promise((resolve) => setTimeout(resolve, time));
  return a;
});

// Lazy
// L.map, L.filter, L.range
export const L = {
  map: curry(function* (f, iter) {
    for (const a of iter) {
      yield go1(a, f);
    }
  }),
  filter: curry(function* (f, iter) {
    for (const a of iter) {
      const b = go1(a, f);
      if (b instanceof Promise)
        yield b.then((b) => (b ? a : Promise.reject(nop)));
      else if (b) yield a;
    }
  }),
  range: function* (l) {
    let i = -1;
    while (++i < l) {
      yield i;
    }
  },
};

// reduce, take
export const reduce = curry((f, acc, iter) => {
  if (!iter) return reduce(f, head((iter = acc[Symbol.iterator]())), iter);

  iter = iter[Symbol.iterator]();
  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = reduceF(acc, cur.value, f);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

export const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a
          .then((a) => ((res.push(a), res).length == l ? res : recur()))
          .catch((e) => (e == nop ? recur() : Promise.reject(e)));
      }
      res.push(a);
      if (res.length == l) return res;
    }
    return res;
  })();
});

// go, pipe, tap takeAll
export const go = (...args) => reduce((a, f) => f(a), args);

export const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

export const tap =
  (f, ...fs) =>
  (a, ...as) =>
    go1(reduce(go1, f(a, ...as), fs), (_) => a);

export const takeAll = take(Infinity);

// map, filter, range
export const map = curry(pipe(L.map, takeAll));

export const filter = curry(curry(pipe(L.filter, takeAll)));

export const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

// Flat
// L.flatten, L.deepFlat, L.flatMap
L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

L.deepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};

L.flatMap = curry(pipe(L.map, L.flatten));

// flatten, deepFlat, flatMap
export const flatten = pipe(L.flatten, takeAll);

export const deepFlat = pipe(L.deepFlat, takeAll);

export const flatMap = (f, iter) => L.flat(L.map(f, iter));

// Utils
// join, find
export const join = curry((sep = ",", iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter)
);

export const find = curry((f, iter) =>
  go(iter, L.filter(f), take(1), ([v]) => v)
);

// Concurrency
// noop, catchNoop
const noop = () => {};

const catchNoop = (arr) => (
  arr.forEach((a) => (a instanceof Promise ? a.catch(noop) : a)), arr
);

// C.reduce, C.take
export const C = {
  reduce: curry((f, acc, iter) => {
    const iter2 = catchNoop(iter ? [...iter] : [...acc]);
    return iter ? reduce(f, acc, iter2) : reduce(f, iter2);
  }),
  take: curry((l, iter) => take(l, catchNoop([...iter]))),
};

// C.map, C.filter
C.takeAll = C.take(Infinity);
C.map = curry(pipe(L.map, C.takeAll));
C.filter = curry(pipe(L.filter, C.takeAll));
