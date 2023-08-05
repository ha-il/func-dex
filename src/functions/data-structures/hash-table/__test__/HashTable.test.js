import { HashTable, hash } from "../HashTable";

test("hash 1", () => expect(hash("red", 10)).toBe(7));
test("hash 2", () => expect(hash("blue", 10)).toBe(0));
test("hash 3", () => expect(hash("green", 10)).toBe(9));

const ht = new HashTable(11);
ht.set("류은규", "라크로스");
ht.set("장정민", "럭비");
ht.set("이준이", "럭비");
ht.set("이대훈", "태권도");
ht.set("임남규", "루지");
ht.set("허민호", "철인3종");
ht.set("김준현", "스켈레톤");
ht.set("조원우", "요트");

test("get", () => expect(ht.get("류은규")).toBe("라크로스"));
test("get", () => expect(ht.get("장정민")).toBe("럭비"));

test("values", () =>
  expect(ht.values()).toEqual([
    "태권도",
    "스켈레톤",
    "럭비",
    "루지",
    "철인3종",
    "라크로스",
    "요트",
  ]));

test("keys", () =>
  expect(ht.keys()).toEqual([
    "이대훈",
    "김준현",
    "이준이",
    "임남규",
    "허민호",
    "류은규",
    "장정민",
    "조원우",
  ]));
