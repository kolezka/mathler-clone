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
    .board {
      overflow: hidden;
      border-radius: 3px;
      background-color: var(--game-board-background-color);
    }
    
    .row {
      display: flex;
      height: var(--game-board-col-size);
    }

    .col {
      text-align: center;
      width: var(--game-board-col-size);
      height: var(--game-board-col-size);
      background-color: var(--game-board-col-background-color);
    }

    .value {
      display: block;
      animation: appear .5s forwards;
      line-height: var(--game-board-col-size);
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
    console.log("connectedCallback");
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.createBoard();
    window.addEventListener(EGameEvents.UPDATE, (e: any) => {
      this.updateBoard(e.detail);
    });
  }

  updateBoard(data = []) {
    console.log("Update Board", data);

    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        const value = data[x]?.[y];
        const element = this.shadowRoot?.getElementById(`row-${x}-col-${y}`);
        const children = element?.children[0];

        // Value removed, remove node here
        if (children && !value) {
          children.remove();
        }

        // Add value
        if (!children && value) {
          const valueElement = document.createElement("span");
          valueElement.innerText = value;
          valueElement.classList.add("value");
          element?.appendChild(valueElement);
        }

        // Check value to be sure
        if (children && (children as HTMLSpanElement)?.innerText !== value) {
          (children as HTMLSpanElement).innerText = value;
        }
      }
    }
  }

  createBoard(data = []) {
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
