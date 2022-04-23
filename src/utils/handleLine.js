// line starts with '#' or ';' is treated as a comment line.
const isComment = (line) => {
  if (line.startsWith("#") || line.startsWith(";")) return true;
  return false;
};

// single line should have single equeal.
const hasLineOnlySingleEqual = (line) => {
  const equalCharactersInLine = (line.match(new RegExp("=", "g")) || []).length;
  return equalCharactersInLine === 1;
};

const isValidLine = (line) => {
  if (!line) return false;
  return hasLineOnlySingleEqual(line) && !isComment(line);
};

module.exports = { isComment, hasLineOnlySingleEqual, isValidLine };
