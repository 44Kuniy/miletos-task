const fs = require("fs").promises;
const { parseFileContents, parseSchemeFileContents } = require("./utils/files");

const example = async () => {
  // sample data
  console.log("\nload dummy data from ./data/example.txt");

  const fileName = "./data/example.txt";
  const fileContents = await fs.readFile(fileName, "utf8");

  const schemeFileName = "./data/scheme.txt";
  const schemeFileContents = await fs.readFile(schemeFileName, "utf8");

  const resultWithoutScheme = parseFileContents(fileContents);
  console.log("-----------------------");
  console.log("resultWithoutScheme : ", resultWithoutScheme);
  const resultWithScheme = parseFileContents(fileContents, schemeFileContents);
  console.log("-----------------------");
  console.log(" resultWithScheme: ", resultWithScheme);
};

example();
