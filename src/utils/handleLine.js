// line starts with '#' or ';' is treated as a comment line.
const isComment = (line) => {
  if (line.startsWith("#") || line.startsWith(";")) return true;
  return false;
};

// single line should have single separator.
const hasLineOnlySingleSeparator = (line, separator) => {
  const equalCharactersInLine = (line.match(new RegExp(separator, "g")) || [])
    .length;
  return equalCharactersInLine === 1;
};

const isValidLine = (line, separator) => {
  if (!line) return false;
  return hasLineOnlySingleSeparator(line, separator) && !isComment(line);
};

module.exports = {
  isComment,
  hasLineOnlySingleSeparator,
  isValidLine,
};
