const {
  isComment,
  hasLineOnlySingleEqual,
  isValidLine,
} = require("./handleLine");

test("line that starts with '#' or ';' is comment line", () => {
  // contains '#' (not leading character)
  expect(isComment("debug# = false")).toBe(false);
  // contains ';' (not leading character)
  expect(isComment("debug = ;true")).toBe(false);

  // starts with '#'
  expect(isComment("# debug = true")).toBe(true);
  // starts with ';'
  expect(isComment("; debug = false")).toBe(true);
});

test("line should have only single equal", () => {
  // common example
  expect(hasLineOnlySingleEqual("endpoint = localhost:3000")).toBe(true);

  // contains 2 equals
  expect(isComment("debug == true")).toBe(false);
  // contains 0 equals
  expect(isComment("debug false value")).toBe(false);
});

test("sample lines validation", () => {
  // common example
  expect(isValidLine("endpoint = localhost:3000")).toBe(true);
  // includes white space
  expect(isValidLine(" test = testVal ")).toBe(true);
  // includs '.' or '/'
  expect(isValidLine("log.file = /var/log/console.log")).toBe(true);

  // described as a comment
  expect(isValidLine("# test2 = test2_value")).toBe(false);
  // described as a comment
  expect(isValidLine("; test3 = test3 value")).toBe(false);
  // includes more than one '='
  expect(isValidLine("debug == true")).toBe(false);
  // not includes '='
  expect(isValidLine("dasdasbjdnw:")).toBe(false);
});
