const _set = require("lodash/set");

const { isValidLine } = require("./handleLine");
const { valueWithType } = require("./types");

const readFileContents = (fileContents, separator = "=") => {
  return fileContents
    .split(/\n/)
    .filter((line) => isValidLine(line, separator))
    .map((line) => line.replace(/^\s+|\s+$/g, "")); // triming new line characters
};

const parseSchemeFileContents = (schemeFileContents) => {
  const schemeFileLines = readFileContents(schemeFileContents, "->");
  return schemeFileLines.reduce((oldObj, line) => {
    const [key, value] = line.split("->").map((e) => e.trim());
    const typeDefinedValue = valueWithType(value);
    return Object.assign(oldObj, { [key]: value });
  }, {});
};

const parseSysctlFileContentsWithScheme = (
  confFileContents,
  schemeFileContents
) => {
  const schemeFileObj = parseSchemeFileContents(schemeFileContents);
  const confFileLines = readFileContents(confFileContents, "=");

  return confFileLines.reduce((oldObj, line) => {
    const [key, value] = line.split("=").map((e) => e.trim());
    const typeDefinedValue = valueWithType(value);
    const schemeDefinedType = schemeFileObj[key];
    return typeof typeDefinedValue === schemeDefinedType
      ? _set(oldObj, key, typeDefinedValue)
      : oldObj;
  }, {});
};

const parseSysctlFileContentsWithoutScheme = (confFileContents) => {
  const confFileLines = readFileContents(confFileContents, "=");
  return confFileLines.reduce((oldObj, line) => {
    const [key, value] = line.split("=").map((e) => e.trim());
    const typeDefinedValue = valueWithType(value);
    return _set(oldObj, key, typeDefinedValue);
  }, {});
};

const parseFileContents = (confFileContents, schemeFileContents) => {
  return schemeFileContents
    ? parseSysctlFileContentsWithScheme(confFileContents, schemeFileContents)
    : parseSysctlFileContentsWithoutScheme(confFileContents);
};

module.exports = {
  readFileContents,
  parseFileContents,
  parseSchemeFileContents,
  parseSysctlFileContentsWithScheme,
};
