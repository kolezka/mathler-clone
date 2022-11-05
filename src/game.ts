import { EGameBoardEvents } from "./components/game-board/GameBoard";
import { GuessResultType } from "./const";

export enum EGameEvents {
  ADD = "ADD",
  DELETE = "DELETE",
  ENTER = "ENTER",
}

const mathRegex = new RegExp(
  /^((?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$)/
);

let currentCol = 0;
let currentRow = 0;

const expectedResult = "8/4+11";

const guesses: (string | null)[][] = [
  // ["1", "1", "+", "8", "/", "4"],
  [],
  [],
  [],
  [],
  [],
  [],
];
const guessesResults: GuessResultType[][] = [[], [], [], [], [], []];

function update() {
  const gameBoard = document.getElementsByTagName("game-board")[0];
  gameBoard.dispatchEvent(
    new CustomEvent(EGameBoardEvents.UPDATE, {
      detail: { guesses, guessesResults },
    })
  );
}

function onAdd(e: Event) {
  const { detail } = e as CustomEvent;

  console.log(detail);

  if (currentCol >= 6) return;

  guesses[currentRow][currentCol] = detail;

  currentCol += 1;

  update();
}

window.addEventListener(EGameEvents.ADD, onAdd);

function onDelete() {
  if (!currentCol) return;

  guesses[currentRow][currentCol - 1] = null;

  currentCol -= 1;

  update();
}

window.addEventListener(EGameEvents.DELETE, onDelete);

function onEnter(e: any) {
  const expression = guesses[currentRow].join("");
  const isMathExpression = mathRegex.test(expression);

  if (expression.length < 6) {
    alert("Expression should fill all columns");
    return;
  }

  if (!isMathExpression) {
    alert("Invalid expression");
    return;
  }

  if (currentRow < 6) {
    // Apply current row results
    applyCurrentGuessesResults();

    const currentRowGuessValid = guessesResults[currentRow].every(
      (guess) => guess === GuessResultType.CORRECT
    );
    console.log(currentRowGuessValid);

    // Go to next row
    currentRow += 1;
    currentCol = 0;

    update();
  }
}

window.addEventListener(EGameEvents.ENTER, onEnter);

function applyCurrentGuessesResults() {
  const expression = guesses[currentRow];
  guessesResults[currentRow] = (expression as string[]).map((char, index) => {
    if (char === expectedResult[index]) {
      return GuessResultType.CORRECT;
    }
    if (expectedResult.includes(char)) {
      return GuessResultType.DIFFERENT_PLACE;
    }
    return GuessResultType.NOT_IN_SOLUTION;
  });
}
