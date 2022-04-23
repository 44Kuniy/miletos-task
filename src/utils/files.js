const _set = require("lodash/set");

const { isValidLine } = require("./handleLine");
const { valueWithType } = require("./types");

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
    const typeDefinedValue = valueWithType(value);
    return _set(oldObj, key, typeDefinedValue);
  }, {});
};

module.exports = { parseFileContents };
