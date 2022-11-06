// Load web components
import "./components";

import { GameBoard } from "./components/game-board/GameBoard";
import {
  GameKeyboard,
  GameKeyboardEvents,
} from "./components/game-keyboard/GameKeyboard";
import { GameNotifications } from "./components/game-notifications/GameNotifications";
import { GameGuesses, LocalStorageKeys } from "./const";
import { isMathExpression, unsafe_getMathExpressionResult } from "./utils";

export class Mathler {
  $board: GameBoard;
  $keyboard: GameKeyboard;
  $notifications: GameNotifications;

  currentCol = 0;
  currentRow = 0;

  guesses: GameGuesses = [[], [], [], [], [], []]; // The guesses previously picked by player

  expectedResult: string;
  expectedResultValue: number;

  constructor({
    expectedResult,
    expectedResultValue,
  }: {
    expectedResult: string;
    expectedResultValue: number;
  }) {
    this.expectedResult = expectedResult;
    this.expectedResultValue = expectedResultValue;

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

    // Read local storage state
    this.readLocalStorageState();

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

  onDelete() {
    if (!this.currentCol) return;
    delete this.guesses[this.currentRow][this.currentCol - 1];
    this.currentCol -= 1;
    this.update();
  }

  onEnter() {
    const currentRowExpression = this.guesses[this.currentRow].join("");

    if (currentRowExpression.length < 6) {
      return this.notify(
        "The specified expression is too short. It should fill all the columns."
      );
    }

    const isValidExpression = isMathExpression(currentRowExpression);
    const currentRowExpressionValue =
      unsafe_getMathExpressionResult(currentRowExpression);

    if (!isValidExpression || !currentRowExpressionValue) {
      return this.notify(
        "The given expression is an incorrect mathematical expression or is the number itself."
      );
    }

    if (currentRowExpressionValue !== this.expectedResultValue) {
      return this.notify(
        `The result of the expression should be ${this.expectedResultValue}`
      );
    }

    // Check if current row guess is correct one
    if (currentRowExpression === this.expectedResult) {
      // Finish todays game
      // Show stats dialog
    } else {
      if (this.currentRow < 6) {
        this.currentCol = 0;
        this.currentRow += 1;
      } else {
        // Game failed
      }
    }

    this.saveStateToLocalStorage();
    this.update();
  }

  attachEvents() {
    this.$keyboard.addEventListener(GameKeyboardEvents.ADD, this.onAdd);
    this.$keyboard.addEventListener(GameKeyboardEvents.DELETE, this.onDelete);
    this.$keyboard.addEventListener(GameKeyboardEvents.ENTER, this.onEnter);
  }

  readLocalStorageState() {
    try {
      const dirtyStoredGuesses = localStorage.getItem(LocalStorageKeys.GUESSES);
      if (dirtyStoredGuesses) {
        const storedGuesses = JSON.parse(dirtyStoredGuesses) as GameGuesses;
        this.guesses = storedGuesses;

        this.currentRow = storedGuesses.reduce((val, guess) => {
          if (guess.length) {
            return val + 1;
          }
          return val;
        }, 0);
      }
    } catch {}
  }

  saveStateToLocalStorage() {
    localStorage.setItem(
      LocalStorageKeys.GUESSES,
      JSON.stringify(this.guesses)
    );
  }

  update() {
    this.$board.updateBoard({
      guesses: this.guesses,
      expectedResult: this.expectedResult,
      currentRow: this.currentRow,
    });
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
