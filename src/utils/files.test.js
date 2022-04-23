const fs = require("fs").promises;
const { parseFileContents } = require("./files");

const dummyDataPath = "./data/example.txt";

test("dummy data will be parsed collectly", async () => {
  const dummyData = await fs.readFile(dummyDataPath, "utf8");
  expect(parseFileContents(dummyData)).toEqual({
    endpoint: "localhost:3000",
    test: "testVal",
    debug: true,
    log: { file: "/var/log/console.log" },
    count: 452,
  });
});
