import { HashTable, hash } from "../HashTable";

test("hash 1", () => expect(hash("red", 10)).toBe(7));
test("hash 2", () => expect(hash("blue", 10)).toBe(0));
test("hash 3", () => expect(hash("green", 10)).toBe(9));

const ht = new HashTable(10);
ht.set("류은규", "라크로스");
ht.set("장정민", "럭비");
ht.set("이대훈", "태권도");
ht.set("임남규", "루지");
ht.set("허민호", "철인3종");
ht.set("김준현", "스켈레톤");
ht.set("조원우", "요트");

test("get", () => expect(ht.get("류은규")).toBe("라크로스"));
test("get", () => expect(ht.get("장정민")).toBe("럭비"));
