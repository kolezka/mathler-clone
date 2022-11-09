import { FailDialog } from "./components/dialogs/fail-dialog/FailDialog";
import { SuccessDialog } from "./components/dialogs/success-dialog/SuccessDialog";
import { GameBoard } from "./components/game-board/GameBoard";
import { openDialog } from "./components/game-dialog/openDialog";
import { GameHeader } from "./components/game-header/GameHeader";
import {
  GameKeyboard,
  GameKeyboardEvents,
} from "./components/game-keyboard/GameKeyboard";
import { GameNotifications } from "./components/game-notifications/GameNotifications";
import { GameGuesses, LocalStorageKeys } from "./const";
import { isMathExpression, unsafe_getMathExpressionResult } from "./utils";

const template = document.createElement("template");

template.innerHTML = `
  <game-header></game-header>
  <game-board></game-board>
  <game-keyboard></game-keyboard>
  <game-notifications></game-notifications>
`;

export class Mathler extends HTMLElement {
  $header: GameHeader;
  $board: GameBoard;
  $keyboard: GameKeyboard;
  $notifications: GameNotifications;

  currentCol = 0;
  currentRow = 0;

  guesses: GameGuesses = [[], [], [], [], [], []];

  expectedResult: string;
  expectedResultValue: number;

  finishGame = false;

  constructor() {
    super();

    /// --- TO DO ----
    this.expectedResult = "8/4+11";
    this.expectedResultValue = 13;
    ///

    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.$header = this.shadowRoot?.querySelector("game-header") as GameHeader;
    this.$board = this.shadowRoot?.querySelector("game-board") as GameBoard;
    this.$keyboard = this.shadowRoot?.querySelector(
      "game-keyboard"
    ) as GameKeyboard;
    this.$notifications = this.shadowRoot?.querySelector(
      "game-notifications"
    ) as GameNotifications;

    // Bind events
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEnter = this.onEnter.bind(this);

    // Attach events
    this.attachEvents();

    // Read local storage state
    this.readLocalStorageState();

    // redraw board
    this.update();

    this.$header.setExpressionValue(String(this.expectedResultValue));

    window.mathler = this;
  }

  onAdd(e: Event) {
    if (this.finishGame) return;
    const { detail } = e as CustomEvent;

    if (this.currentCol >= 6) return;

    this.guesses[this.currentRow][this.currentCol] = detail;

    this.currentCol += 1;
    this.update();
  }

  onDelete() {
    if (this.finishGame) return;
    if (!this.currentCol) return;
    delete this.guesses[this.currentRow][this.currentCol - 1];
    this.currentCol -= 1;
    this.update();
  }

  validateCurrentRowResult() {
    const currentRowExpression = this.guesses[this.currentRow].join("");
    return currentRowExpression === this.expectedResult;
  }

  onEnter() {
    if (this.finishGame) return;

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
      // Finish game
      this.currentRow += 1;
      this.showFinishGameDialog();
      this.finishGame = true;
    } else {
      if (this.currentRow < 5) {
        // Go to next row
        this.currentCol = 0;
        this.currentRow += 1;
      } else {
        // Game fail
        this.currentRow += 1;
        this.showFailGameDialog();
        this.finishGame = true;
      }
    }

    this.saveStateToLocalStorage();
    this.update();
  }

  reset() {
    this.finishGame = false;

    this.guesses = [[], [], [], [], [], []];
    this.currentCol = 0;
    this.currentRow = 0;

    this.update();
    this.saveStateToLocalStorage();
  }

  onTryAgain() {
    this.reset();
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

        // Check if the game is finished
        if (this.currentRow) {
          const lastGuess = this.guesses[this.currentRow - 1].join("");
          if (lastGuess === this.expectedResult) {
            this.finishGame = true;
            this.showFinishGameDialog();
          }
        }
      }
    } catch {}
  }

  saveStateToLocalStorage() {
    localStorage.setItem(
      LocalStorageKeys.GUESSES,
      JSON.stringify(this.guesses)
    );
  }

  saveStatsToLocalStorage() {
    // TODO
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

  showFailGameDialog() {
    openDialog({
      initialize: () => new FailDialog(),
    });
  }

  showFinishGameDialog() {
    openDialog({
      initialize: () => new SuccessDialog(),
    });
  }
}

customElements.define("mathler-game", Mathler);

declare global {
  interface Window {
    mathler: Mathler;
  }
}
