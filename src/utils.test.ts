import { isMathExpression, unsafe_getMathExpressionResult } from "./utils";

describe("isMathExpression", () => {
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
