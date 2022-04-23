const _set = require("lodash/set");

const { isValidLine } = require("./handleLine");

const readFileContents = (fileContents) => {
  return fileContents
    .split(/\n/)
    .filter((line) => isValidLine(line))
    .map((line) => line.replace(/^\s+|\s+$/g, "")); // triming new line characters
};

const parseFileContents = (fileContents) => {
  const lines = readFileContents(fileContents);
  return lines.reduce((oldObj, line) => {
    const [key, value] = line.split("=").map((e) => e.trim());
    return _set(oldObj, key, value);
  }, {});
};

module.exports = { parseFileContents };
