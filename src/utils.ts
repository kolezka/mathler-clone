export function isNumeric(str: string) {
  return !isNaN(Number(str));
}

const mathRegex = new RegExp(
  /^((?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$)/
);

export function isMathExpression(str: string) {
  if (
    str.startsWith("-") ||
    str.startsWith("+") ||
    str.startsWith("*") ||
    str.startsWith("/")
  )
    return false;
  if (!/(\+|\-|\*|\/)/g.test(str)) return false;
  return mathRegex.test(str);
}

export function unsafe_getMathExpressionResult(str: string) {
  try {
    const result = new Function(`return (${str})`)();
    return result;
  } catch {
    return null;
  }
}

export function isTheSameDay(x: Date, y: Date) {
  return (
    x.getFullYear() === y.getFullYear() &&
    x.getMonth() === y.getMonth() &&
    x.getDate() === y.getDate()
  );
}
