const fs = require("fs").promises;
const {
  parseFileContents,
  parseSysctlFileContentsWithScheme,
} = require("./files");

const dummyDataPath = "./data/example.txt";
const dummySchemePath = "./data/scheme.txt";

test("dummy data will be parsed collectly", async () => {
  const dummyData = await fs.readFile(dummyDataPath, "utf8");
  expect(parseFileContents(dummyData)).toEqual({
    endpoint: "localhost:3000",
    test: "testVal",
    debug: true,
    product: false,
    log: { file: "/var/log/console.log", conf: { file: "/var/log/config" } },
    count: 452,
    port: 80,
  });
});

test("dummy data line should follow scheme", async () => {
  // follows scheme(string)
  expect(
    parseSysctlFileContentsWithScheme(
      "endpoint = localhost:3000",
      "endpoint -> string"
    )
  ).toEqual({ endpoint: "localhost:3000" });
  // follows scheme(boolean)
  expect(
    parseSysctlFileContentsWithScheme("debug = false", "debug -> boolean")
  ).toEqual({ debug: false });
  // follows scheme(number)
  expect(
    parseSysctlFileContentsWithScheme("count = 452", "count -> number")
  ).toEqual({ count: 452 });

  // not following scheme(string)
  expect(
    parseSysctlFileContentsWithScheme(
      "endpoint = localhost:3000",
      "endpoint -> number"
    )
  ).toEqual({});
  // not following scheme(boolean)
  expect(
    parseSysctlFileContentsWithScheme("debug = false", "debug -> string")
  ).toEqual({});
  // not following scheme(number)
  expect(
    parseSysctlFileContentsWithScheme("count = 452", "count -> boolean")
  ).toEqual({});
});
test("dummy data will be parsed collectly with scheme", async () => {
  const dummyData = await fs.readFile(dummyDataPath, "utf8");
  const dummyScheme = await fs.readFile(dummySchemePath, "utf8");

  expect(parseFileContents(dummyData, dummyScheme)).toEqual({
    endpoint: "localhost:3000",
    debug: true,
    log: { conf: { file: "/var/log/config" } },
    count: 452,
  });
});
