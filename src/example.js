const fs = require("fs").promises;
const { parseFileContents } = require("./utils/files");

const example = async () => {
  // sample data
  console.log("\nload dummy data from ./data/example.txt");

  const fileName = "./data/example.txt";
  const fileContents = await fs.readFile(fileName, "utf8");

  console.log("============");
  console.log(fileContents);
  console.log("============");

  const result = parseFileContents(fileContents);
  console.log("result : ", result);
};

example();
