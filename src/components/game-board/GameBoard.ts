import { GuessResultType } from "../../const";
import { EGameEvents } from "../../game";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    @keyframes appear {
      0% {
        opacity: 0;
        transform: scale(.5)
      }
      50% {
        opacity: .5;
        transform: scale(1.5)
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    @keyframes disappear {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(0);
      }
    }
    .board {
      overflow: hidden;
      border-radius: 3px;
      background-color: var(--game-board-background-color);
    }
    
    .row {
      display: flex;
      height: var(--game-board-col-size);
      margin: 2px 0;
    }

    .col {
      margin: 0 2px;
      text-align: center;
      width: var(--game-board-col-size);
      height: var(--game-board-col-size);
      background-color: var(--game-board-col-background-color);
    }

    .value {
      display: block;
      animation: appear .5s forwards;
      line-height: var(--game-board-col-size);
      font-size: 1.25rem;
      font-weight: 700;
    }

    .value--correct {
      background-color: var(--game-board-result-correct);
    }

    .value--different-place {
      background-color: var(--game-board-result-different-place);
    }

    .value--not-in-solution {
      background-color: var(--game-board-result-not-in-solution);
    }

    .value.remove {
      animation: disappear .2s forwards;
    }

  </style>
  <div class="board" id="board"></div>
`;

export enum EGameBoardEvents {
  UPDATE = "UPDATE",
}

export class GameBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.createBoard();
    this.addEventListener(EGameBoardEvents.UPDATE, (e: any) =>
      this.updateBoard(e.detail)
    );
  }

  updateBoard({
    guesses,
    guessesResults,
  }: {
    guesses: string[][];
    guessesResults: GuessResultType[][];
  }) {
    console.log("updateBoard", guesses, guessesResults);

    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        const value = guesses[x]?.[y];
        const result = guessesResults[x]?.[y];

        const element = this.shadowRoot?.getElementById(`row-${x}-col-${y}`);

        let valueElement = element?.children[0];

        // Value removed, remove node here
        if (valueElement && !value) {
          // remove node animation
          valueElement.classList.add("remove");
          setTimeout(() => {
            valueElement?.remove();
          }, 200);
        }

        // Add value
        if (!valueElement && value) {
          const valueElement = document.createElement("span");
          valueElement.innerText = String(value);
          valueElement.classList.add("value");
          element?.appendChild(valueElement);
        }

        // Apply result
        if (valueElement && result) {
          if (result === GuessResultType.CORRECT) {
            valueElement?.classList.add("value--correct");
          }
          if (result === GuessResultType.DIFFERENT_PLACE) {
            valueElement?.classList.add("value--different-place");
          }
          if (result === GuessResultType.NOT_IN_SOLUTION) {
            valueElement?.classList.add("value--not-in-solution");
          }
        }
      }
    }
  }

  createBoard() {
    const boardElement = this.shadowRoot?.getElementById("board");
    for (let x = 0; x < 6; x++) {
      const row = document.createElement("div");
      row.classList.add("row");
      row.id = `row-${x}`;
      boardElement?.appendChild(row);
      for (let y = 0; y < 6; y++) {
        const col = document.createElement("div");
        col.classList.add("col");
        col.id = `row-${x}-col-${y}`;
        row?.appendChild(col);
      }
    }
  }

  drawRowCheckResult(row: number, result: GuessResultType[]) {}
}

customElements.define("game-board", GameBoard);
