import { EGameBoardEvents } from "./components/game-board/GameBoard";
import { GameNotificationsEvents } from "./components/game-notifications/GameNotifications";
import { GuessResultType } from "./const";
import { isMathExpression } from "./utils";

export enum EGameEvents {
  ADD = "ADD",
  DELETE = "DELETE",
  ENTER = "ENTER",
}

let currentCol = 0;
let currentRow = 0;

const expectedResult = "8/4+11";

const guesses: (string | null)[][] = [[], [], [], [], [], []];
const guessesResults: GuessResultType[][] = [[], [], [], [], [], []];

/*
 *   render data
 */
function update() {
  const gameBoard = document.getElementsByTagName("game-board")[0];
  if (gameBoard) {
    gameBoard.dispatchEvent(
      new CustomEvent(EGameBoardEvents.UPDATE, {
        detail: { guesses, guessesResults },
      })
    );
  }
  // Safe data to localStorage
  localStorage.setItem("guesses", JSON.stringify(guesses));
  localStorage.setItem("guessesResults", JSON.stringify(guessesResults));
}

/*
 *   render notifications
 */
function notify(str: string) {
  const notifications = document.getElementsByTagName("game-notifications")[0];
  if (notifications) {
    notifications.dispatchEvent(
      new CustomEvent(GameNotificationsEvents.NOTIFY, { detail: str })
    );
  }
}

/*
 *   Validates guesses[currentRow] by mapping each cell value to GuessResultType in guessesResults[currentRow]
 */
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

/*
 *   Adds selected value to gusses[currentRow][currentCol]
 */
function onAdd(e: Event) {
  const { detail } = e as CustomEvent;

  if (currentCol >= 6) return;

  guesses[currentRow][currentCol] = detail;

  currentCol += 1;

  update();
}

window.addEventListener(EGameEvents.ADD, onAdd);

/*
 *   Step back action
 */
function onDelete() {
  if (!currentCol) return;

  guesses[currentRow][currentCol - 1] = null;

  currentCol -= 1;

  update();
}

window.addEventListener(EGameEvents.DELETE, onDelete);

/*
 *   Validate currentRow user guess
 */
function onEnter() {
  const expression = guesses[currentRow].join("");

  const isValidExpression = isMathExpression(expression);

  if (expression.length < 6) {
    notify("Expression should fill all columns");
    return;
  }

  if (!isValidExpression) {
    notify("Invalid expression");
    return;
  }

  if (currentRow < 6) {
    // Apply current row results
    applyCurrentGuessesResults();

    // const currentRowGuessValid = guessesResults[currentRow].every(
    //   (guess) => guess === GuessResultType.CORRECT
    // );

    // Go to next row
    currentRow += 1;
    currentCol = 0;
  }

  update();
}

window.addEventListener(EGameEvents.ENTER, onEnter);
