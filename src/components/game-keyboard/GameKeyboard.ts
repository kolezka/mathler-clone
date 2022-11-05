import { EGameEvents } from "../../game";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    #keyboard {
      display: flex;
      flex-direction: column;
    }
    div {
      display: flex;
    }
    button {
      cursor: pointer;
      border: none;
      border-radius: var(--game-keyboard-button-radius);
      font-size: var(--game-keyboard-button-text-size);
      margin: var(--game-keyboard-button-margin);
      line-height: 1;
      color: var(--game-keyboard-button-text-color);
      padding: var(--game-keyboard-button-padding);
      background-color: var(--game-keyboard-button-background-color);
      transition: background-color .1s ease-in;
    }

    button:hover {
      background-color: var(--game-keyboard-button-hover-background-color);
    }

    button:active {
      transform: scale(.9);
    }

  </style>
  <div id="keyboard">
    <div>
      <button data-value="0">0</button>
      <button data-value="1">1</button>
      <button data-value="2">2</button>
      <button data-value="3">3</button>
      <button data-value="4">4</button>
      <button data-value="5">5</button>
      <button data-value="6">6</button>
      <button data-value="7">7</button>
      <button data-value="8">8</button>
      <button data-value="9">9</button>
    </div>
    <div>
      <button data-value="+">+</button>
      <button data-value="-">-</button>
      <button data-value="*">*</button>
      <button data-value="/">/</button>
      <button style="margin-left: auto;" data-action="Enter">Enter</button>
      <button data-action="Delete">Delete</button>
    </div>
  </div>
`;

export class GameKeyboard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  onButtonClick() {}

  bindButtonsEvents() {
    const buttons = this.shadowRoot?.querySelectorAll("button");
    if (buttons) {
      for (const button of Array.from(buttons)) {
        const value = button.getAttribute("data-value");
        const action = button.getAttribute("data-action");
        button.addEventListener("click", () => {
          const isActionButton = !!action;
          if (isActionButton) {
            if (action === "Enter") {
              window.dispatchEvent(new CustomEvent(EGameEvents.ENTER));
            }
            if (action === "Delete") {
              window.dispatchEvent(new CustomEvent(EGameEvents.DELETE));
            }
          } else {
            window.dispatchEvent(
              new CustomEvent(EGameEvents.ADD, { detail: value })
            );
          }
        });
      }
    }
  }

  bindKeyboardEvents() {
    window.addEventListener("keydown", (e) => {
      if (!isNaN(Number(e.key)) || ["*", "/", "+", "-"].includes(e.key)) {
        window.dispatchEvent(
          new CustomEvent(EGameEvents.ADD, { detail: String(e.key) })
        );
      } else if (e.key === "Enter") {
        window.dispatchEvent(new CustomEvent(EGameEvents.ENTER));
      } else if (e.key === "Backspace") {
        window.dispatchEvent(new CustomEvent(EGameEvents.DELETE));
      }
    });
  }

  connectedCallback() {
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.bindButtonsEvents();
    this.bindKeyboardEvents();
  }
}

customElements.define("game-keyboard", GameKeyboard);
