export function isNumeric(str: string) {
  return !isNaN(Number(str));
}

const mathRegex = new RegExp(
  /^((?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$)/
);

export function isMathExpression(str: string) {
  // In our game math expression cannot start with + or -
  if (str.startsWith("-") || str.startsWith("+")) return false;
  return mathRegex.test(str);
}
