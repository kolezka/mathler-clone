import {
  isMathExpression,
  isTheSameDay,
  unsafe_getMathExpressionResult,
} from "./utils";

describe("unsafe_getMathExpressionResult", () => {
  it("returns math expression value", () => {
    const expression = "2+2";
    const expectedValue = 4;
    expect(unsafe_getMathExpressionResult(expression)).toBe(expectedValue);
  });
  it("returns null for invalid expression", () => {
    expect(
      unsafe_getMathExpressionResult("some random strings + hello world")
    ).toBe(null);
  });
});

describe("isMathExpression", () => {
  it.each(["2+2", "2/2", "2*2", "2-2", "2+2/2*2-2"])(
    "%s validates correctly",
    (expression) => {
      expect(isMathExpression(expression)).toBe(true);
    }
  );

  // We do not allow expression which starts with plus/minus, or numbers without math signals
  it.each(["-2+2", "+2+2", "100000"])(
    "%s validates correctly",
    (expression) => {
      expect(isMathExpression(expression)).toBe(false);
    }
  );
});

describe("isTheSameDay", () => {
  it("2022-11-06T20:02:27.220Z and 2022-11-06T20:02:27.220Z", () => {
    const x = new Date("2022-11-06T20:02:27.220Z");
    const y = new Date("2022-11-06T20:02:27.220Z");
    expect(isTheSameDay(x, y)).toBe(true);
  });

  it("2022-11-06T20:02:27.220Z and 2001-11-06T20:02:27.220Z", () => {
    const x = new Date("2022-11-06T20:02:27.220Z");
    const y = new Date("2001-11-06T20:02:27.220Z");
    expect(isTheSameDay(x, y)).toBe(false);
  });
});
