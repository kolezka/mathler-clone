import "./components";
import "./game";

import { Mathler } from "./game";

describe("Mathler", () => {
  jest.spyOn(Storage.prototype, "getItem");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("reads local storage state", () => {
    const dirtyGuesses =
      '[["1","0","0","-","8","7"],["1","0","0","-","8","7"],[],[],[],[]]';
    const expectedStoredGuesses = [
      ["1", "0", "0", "-", "8", "7"],
      ["1", "0", "0", "-", "8", "7"],
      [],
      [],
      [],
      [],
    ];
    Storage.prototype.getItem = jest
      .fn()
      .mockImplementation(() => dirtyGuesses);
    document.body.innerHTML = `<mathler-game></mathler-game/>`;
    const $mathler = document.querySelector("mathler-game") as Mathler;
    expect($mathler.guesses).toEqual(expectedStoredGuesses);
    expect($mathler.currentRow).toBe(2);
  });
});
