import { GameGuesses } from "../../const";
import { getAllIndexes } from "../../utils";

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
      min-width: var(--game-board-col-size);
      min-height: var(--game-board-col-size);
      background-color: var(--game-board-col-background-color);
    }

    .value {
      display: block;
      animation: appear .5s forwards;
      line-height: var(--game-board-col-size);
      font-size: var(--game-board-col-text-size);
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

export class GameBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.createBoard();
  }

  updateBoard({
    guesses,
    expectedResult,
    currentRow,
  }: {
    guesses: GameGuesses;
    expectedResult: string;
    currentRow: number;
  }) {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 6; col++) {
        const value = guesses[row]?.[col];

        const element = this.shadowRoot?.getElementById(
          `row-${row}-col-${col}`
        );

        let valueElement = element?.children[0] as HTMLSpanElement;

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
          valueElement = document.createElement("span");
          valueElement.innerText = String(value);
          valueElement.classList.add("value");
          element?.appendChild(valueElement);
        }

        // Mark results
        if (valueElement && row < currentRow) {
          // Get current number indexes in solution
          const indexesInSolution = getAllIndexes(expectedResult, value);
          // If number is not found in solution
          if (!indexesInSolution.length) {
            valueElement?.classList.add("value--not-in-solution");
          } else {
            // Number found in proper place
            if (indexesInSolution.includes(col)) {
              valueElement?.classList.add("value--correct");
            } else {
              // Number found but in another place
              valueElement?.classList.add("value--different-place");
            }
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
}

customElements.define("game-board", GameBoard);
