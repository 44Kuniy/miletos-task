const valueWithType = (value) => {
  if (isBoolean(value)) {
    if (value === "true") return true;
    if (value === "false") return false;
    else throw new Error(`value :${value}: is not boolean`);
  }
  if (isNumber(value)) {
    return Number(value);
  }
  return value;
};

const isBoolean = (value) => value === "true" || value === "false";
const isNumber = (value) => !isNaN(Number(value));

module.exports = { valueWithType, isBoolean, isNumber };
