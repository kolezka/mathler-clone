import { GameBoard } from "./components/game-board/GameBoard";
import {
  GameKeyboard,
  GameKeyboardEvents,
} from "./components/game-keyboard/GameKeyboard";
import { GameNotifications } from "./components/game-notifications/GameNotifications";
import { LocalStorageKeys } from "./const";
import { isMathExpression, unsafe_getMathExpressionResult } from "./utils";

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

// function onEnter() {
//   const expression = guesses[currentRow].join("");

//   const isValidExpression = isMathExpression(expression);

//   if (expression.length < 6) {
//     notify("Expression should fill all columns");
//     return;
//   }

//   if (!isValidExpression) {
//     notify("Invalid expression");
//     return;
//   }

//   const expressionValue = unsafe_getMathExpressionResult(expression);

//   if (expressionValue !== null && expressionValue !== expectedResultValue) {
//     notify(`The result should be ${expectedResultValue}`);
//     return;
//   }

//   if (currentRow < 6) {
//     // Apply current row results
//     applyCurrentGuessesResults();

//     // const currentRowGuessValid = guessesResults[currentRow].every(
//     //   (guess) => guess === GuessResultType.CORRECT
//     // );

//     // if (currentRowGuessValid) {
//     // }

//     // Go to next row
//     currentRow += 1;
//     currentCol = 0;
//   }

//   update();
// }

export class Mathler {
  $board: GameBoard;
  $keyboard: GameKeyboard;
  $notifications: GameNotifications;

  currentCol = 0;
  currentRow = 0;

  guesses: (string | null)[][] = [[], [], [], [], [], []];

  expectedResult = "8/4+11";
  expectedResultValue = 13;

  constructor() {
    this.$board = document.querySelector("game-board") as GameBoard;
    this.$keyboard = document.querySelector("game-keyboard") as GameKeyboard;
    this.$notifications = document.querySelector(
      "game-notifications"
    ) as GameNotifications;

    // Bind event functions
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEnter = this.onEnter.bind(this);

    // Attach events
    this.attachEvents();

    // redraw board
    this.update();

    window.mathler = this;
  }

  onAdd(e: Event) {
    const { detail } = e as CustomEvent;
    if (this.currentCol >= 6) return;

    this.guesses[this.currentRow][this.currentCol] = detail;
    this.currentCol += 1;

    this.update();
  }

  onDelete(e: Event) {
    if (!this.currentCol) return;

    this.guesses[this.currentRow][this.currentCol - 1] = null;
    this.currentCol -= 1;

    this.update();
  }

  onEnter(e: Event) {
    // TODO
    console.log("enter");
  }

  attachEvents() {
    this.$keyboard.addEventListener(GameKeyboardEvents.ADD, this.onAdd);
    this.$keyboard.addEventListener(GameKeyboardEvents.DELETE, this.onDelete);
    this.$keyboard.addEventListener(GameKeyboardEvents.ENTER, this.onDelete);
  }

  readLocalStorageState() {
    try {
    } catch {}
  }

  saveStateToLocalStorage() {}

  update() {
    this.$board.updateBoard({ guesses: this.guesses, guessesResults: [] });
  }

  notify(str: string) {
    this.$notifications.addNotification(str);
  }
}

declare global {
  interface Window {
    mathler: Mathler;
  }
}
