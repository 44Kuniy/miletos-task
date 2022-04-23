const { valueWithType, isBoolean, isNumber } = require("./types");

test("string value will return value with type", () => {
  // common string example
  expect(valueWithType("localhost:3000")).toBe("localhost:3000");

  // Boolean
  expect(valueWithType("true")).toBe(true);
  expect(valueWithType("false")).toBe(false);
  // Number
  expect(valueWithType("51")).toBe(51);
  expect(valueWithType("0.12")).toBe(0.12);
  expect(valueWithType("5.0.1")).toBe("5.0.1");
});

test("values would be evaluated as a Boolean", () => {
  expect(isBoolean("true")).toBe(true);
  expect(isBoolean("false")).toBe(true);

  expect(isBoolean("True")).toBe(false);
  expect(isBoolean("False")).toBe(false);
  expect(isBoolean("string value")).toBe(false);
});

test("values would be evaluated as a number", () => {
  expect(isNumber("7")).toBe(true);
  expect(isNumber("3.51")).toBe(true);
  expect(isNumber("000")).toBe(true);

  expect(isNumber("string value")).toBe(false);
});
