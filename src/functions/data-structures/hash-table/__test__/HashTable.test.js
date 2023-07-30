import { hash } from "../HashTable";

test("hash 1", () => expect(hash("red", 10)).toBe(7));
test("hash 2", () => expect(hash("blue", 10)).toBe(0));
test("hash 3", () => expect(hash("green", 10)).toBe(9));
