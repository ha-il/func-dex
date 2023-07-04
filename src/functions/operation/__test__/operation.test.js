import { add, subtract, multiply, divide } from "../operation.js";

test("2 + 2 = 4", () => expect(add(2, 2)).toBe(4));
test("2 - 2 = 0", () => expect(subtract(2, 2)).toBe(0));
test("2 * 2 = 4", () => expect(multiply(2, 2)).toBe(4));
test("2 / 2 = 4", () => expect(divide(2, 2)).toBe(1));
