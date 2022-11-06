import { GameBoard } from "./components/game-board/GameBoard";
import { GameNotifications } from "./components/game-notifications/GameNotifications";
import { LocalStorageKeys } from "./const";
import { isMathExpression, unsafe_getMathExpressionResult } from "./utils";

export enum EGameEvents {
  ADD = "ADD",
  DELETE = "DELETE",
  ENTER = "ENTER",
}

export interface IGameStats {}

// let ready = false;

let currentCol = 0;
let currentRow = 0;

// let expectedResult = "8/4+11"; // TODO: Fetch data
let expectedResultValue = 13; // TODO: Fetch data

const guesses: (string | null)[][] = [[], [], [], [], [], []];
// const guessesResults: GuessResultType[][] = [[], [], [], [], [], []];
export interface GameStats {
  correctGuesses: number[];
  totalGames: number;
  gamesWon: number;
}

// async function readExpectedResult() {}

/*
 *   Maps local storage data to varaibles
 */
function readLocalStorageState() {
  try {
    const storedGuesses = JSON.parse(
      localStorage.getItem(LocalStorageKeys.GUESSES) || ""
    );
    // const storedGuessesResults = JSON.parse(
    //   localStorage.getItem(LocalStorageKeys.GUESSES_RESULTS) || ""
    // );
    Object.assign(guesses, storedGuesses);
    // Object.assign(guessesResults, storedGuessesResults);

    const storedCurrentCol = Number(
      localStorage.getItem(LocalStorageKeys.CURRENT_COL)
    );

    if (!isNaN(storedCurrentCol)) {
      currentCol = storedCurrentCol;
    }

    const storedCurrentRow = Number(
      localStorage.getItem(LocalStorageKeys.CURRENT_ROW)
    );
    if (!isNaN(storedCurrentRow)) {
      currentRow = storedCurrentRow;
    }
  } catch {}
}

/*
 *   Saves state to local storage
 */
function saveStateToLocalStorage() {
  localStorage.setItem(LocalStorageKeys.GUESSES, JSON.stringify(guesses));
  // localStorage.setItem(
  //   LocalStorageKeys.GUESSES_RESULTS,
  //   JSON.stringify(guessesResults)
  // );
  localStorage.setItem(LocalStorageKeys.CURRENT_COL, String(currentCol));
  localStorage.setItem(LocalStorageKeys.CURRENT_ROW, String(currentRow));
}

/*
 *   Render data
 */
function update() {
  // console.log("Update board", guesses, guessesResults);

  // for each state update, we save data to localStorage
  saveStateToLocalStorage();

  const $gameBoard = document.getElementsByTagName(
    "game-board"
  )[0] as GameBoard;
  if ($gameBoard) {
    $gameBoard.updateBoard({ guesses, guessesResults: [] });
  }
}

/*
 *   Render notifications
 */
function notify(str: string) {
  const $notifications = document.getElementsByTagName(
    "game-notifications"
  )[0] as GameNotifications;
  if ($notifications) {
    $notifications.addNotification(str);
  }
}

/*
 *   Validates guesses[currentRow] by mapping each cell value to GuessResultType in guessesResults[currentRow]
 */
function applyCurrentGuessesResults() {
  // const expression = guesses[currentRow];
  // guessesResults[currentRow] = (expression as string[]).map((char, index) => {
  //   if (char === expectedResult[index]) {
  //     return GuessResultType.CORRECT;
  //   }
  //   if (expectedResult.includes(char)) {
  //     return GuessResultType.DIFFERENT_PLACE;
  //   }
  //   return GuessResultType.NOT_IN_SOLUTION;
  // });
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

/*
 *   Step back action
 */
function onDelete() {
  if (!currentCol) return;
  guesses[currentRow][currentCol - 1] = null;
  currentCol -= 1;
  update();
}

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

  const expressionValue = unsafe_getMathExpressionResult(expression);

  if (expressionValue !== null && expressionValue !== expectedResultValue) {
    notify(`The result should be ${expectedResultValue}`);
    return;
  }

  if (currentRow < 6) {
    // Apply current row results
    applyCurrentGuessesResults();

    // const currentRowGuessValid = guessesResults[currentRow].every(
    //   (guess) => guess === GuessResultType.CORRECT
    // );

    // if (currentRowGuessValid) {
    // }

    // Go to next row
    currentRow += 1;
    currentCol = 0;
  }

  update();
}

export function init() {
  // Read stored data
  readLocalStorageState();

  // Update board & stats with stored data
  update();

  // Attach events
  window.addEventListener(EGameEvents.ADD, onAdd);
  window.addEventListener(EGameEvents.DELETE, onDelete);
  window.addEventListener(EGameEvents.ENTER, onEnter);
}
