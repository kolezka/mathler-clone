import { EGameEvents } from "../../game";

const template = document.createElement('template');

template.innerHTML = `
  <style>
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
      width: var(--game-board-col-size);
      height: var(--game-board-col-size);
      background-color: var(--game-board-col-background-color);
    }
  </style>
  <div class="board" id="board"></div>
`;

export class GameBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('connectedCallback');
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.createBoard();
    window.addEventListener(EGameEvents.UPDATE, (e: any) => {
      this.updateBoard(e.detail);
    })
  }

  updateBoard(data = []) {
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 6; y++) {
        const value = data[x]?.[y];
        if (value) {
          const element = this.shadowRoot?.getElementById(`row-${x}-col-${y}`);
          if (!element?.children.length) {
            const valueElement = document.createElement('span');
            valueElement.innerHTML = value;
            element?.appendChild(valueElement);
          }
        }
      }
    }
  }

  createBoard(data = []) {
    const boardElement = this.shadowRoot?.getElementById('board')
    for (let x = 0; x < 6; x++) {
      const row = document.createElement('div');
      row.classList.add('row');
      row.id = `row-${x}`
      boardElement?.appendChild(row);
      for (let y = 0; y < 6; y++) {
        const col = document.createElement('div');
        col.classList.add('col');
        col.id = `row-${x}-col-${y}`
        row?.appendChild(col);
      }
    }
  }

}

customElements.define('game-board', GameBoard);