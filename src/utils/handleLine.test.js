const {
  isComment,
  hasLineOnlySingleSeparator,
  isValidLine,
} = require("./handleLine");

test("line that starts with '#' or ';' is comment line", () => {
  // contains '#' (not leading character)
  expect(isComment("debug# = false")).toBe(false);
  // contains ';' (not leading character)
  expect(isComment("debug -> ;boolean")).toBe(false);

  // starts with '#'
  expect(isComment("# debug = true")).toBe(true);
  // starts with ';'
  expect(isComment("; debug -> boolean")).toBe(true);
});

test("line should have only single separator", () => {
  // common example
  expect(hasLineOnlySingleSeparator("endpoint = localhost:3000", "=")).toBe(
    true
  );
  expect(hasLineOnlySingleSeparator("key -> value", "->")).toBe(true);

  // contains 2 separator
  expect(hasLineOnlySingleSeparator("debug == true", "=")).toBe(false);
  expect(hasLineOnlySingleSeparator("debug ->-> string", "->")).toBe(false);
  // contains 0 separator
  expect(hasLineOnlySingleSeparator("lolem ipsum", "=")).toBe(false);
  expect(hasLineOnlySingleSeparator("lolem - ipsum>", "->")).toBe(false);
});

test("sample lines validation", () => {
  // common example
  expect(isValidLine("endpoint = localhost:3000", "=")).toBe(true);

  // includes white space
  expect(isValidLine(" test -> string ", "->")).toBe(true);
  // includs '.' or '/'
  expect(isValidLine("log.file = /var/log/console.log", "=")).toBe(true);

  // described as a comment
  expect(isValidLine("# test2 = test2_value", "=")).toBe(false);
  // described as a comment
  expect(isValidLine("; test3 = test3 value", "->")).toBe(false);
  // includes more than one separator
  expect(isValidLine("debug == true", "=")).toBe(false);
  expect(isValidLine("debug ->-> true", "->")).toBe(false);
  // not includes separator
  expect(isValidLine("dasdasbjdnw:", "=")).toBe(false);
  expect(isValidLine("lolem - ipsum>", "->")).toBe(false);
});
