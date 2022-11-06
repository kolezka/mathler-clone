const template = document.createElement("template");

template.innerHTML = `
  <style>
    @keyframes appear {
      0% {
        transform: scale(.875);
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    }
    :host(:not([open])), :host(:not(:defined)) {
      display: none;
    }
    button {
      cursor: pointer;
      background: none;
      border: none;
      width: 28px;
    }
    .dialog {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      max-height: 100vh;
      overflow: auto;
      margin: 0 auto;
      max-width: 320px;
      border-radius: 4px;
      padding: 8px 16px 16px;
      background-color: var(--game-board-background-color);
      z-index: 101;
    }
    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 -8px 8px;
    }
    .dialog-title {
      font-size: 1rem;
      color: #000;
      margin: 0;
    }
    .dialog-body {
      font-size: 1rem;
      color: #000;
    }
    #backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 100;
      background-color: rgba(0, 0, 0, .25);
    }
    .wrapper {
      position: relative;
      z-index: 101;
      animation: appear .1s linear forwards;
    }
  </style>
  <div id="backdrop"></div>    
  <div class="wrapper">
  <div class="dialog">
    <div class="dialog-header">
      <h3 class="dialog-title">
        <slot name="dialog-title"></slot>
      </h3>
      <button id="close-button">
        <svg
          enable-background="new 0 0 489.8 489.8"
          version="1.1"
          viewBox="0 0 489.8 489.8"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M438.2,0H51.6C23.1,0,0,23.2,0,51.6v386.6c0,28.5,23.2,51.6,51.6,51.6h386.6c28.5,0,51.6-23.2,51.6-51.6V51.6    C489.8,23.2,466.6,0,438.2,0z M465.3,438.2c0,14.9-12.2,27.1-27.1,27.1H51.6c-14.9,0-27.1-12.2-27.1-27.1V51.6    c0-14.9,12.2-27.1,27.1-27.1h386.6c14.9,0,27.1,12.2,27.1,27.1V438.2z"
          />
          <path
            d="m319 170.8c-4.8-4.8-12.5-4.8-17.3 0l-56.8 56.8-56.8-56.8c-4.8-4.8-12.5-4.8-17.3 0s-4.8 12.5 0 17.3l56.8 56.8-56.8 56.8c-4.8 4.8-4.8 12.5 0 17.3 2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6l56.8-56.8 56.8 56.8c2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6c4.8-4.8 4.8-12.5 0-17.3l-57-56.8 56.8-56.8c4.8-4.8 4.8-12.5 0-17.3z"
          />
        </svg>
      </button>
    </div>
    <slot class="dialog-body" name="dialog-body"></slot>
    </div>
  </div>
`;

export enum DialogEvents {
  opened = "opened",
  closed = "closed",
}

export class GameDialog extends HTMLElement {
  $backdrop: HTMLDivElement;
  $closeButton: HTMLButtonElement;

  get open() {
    return this.hasAttribute("open");
  }

  set open(value: boolean) {
    value ? this.setAttribute("open", "") : this.removeAttribute("open");
  }

  static get observedAttributes() {
    return ["open"];
  }

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(template.content.cloneNode(true));

    this.$backdrop = this.shadowRoot?.getElementById(
      "backdrop"
    ) as HTMLDivElement;

    this.$closeButton = this.shadowRoot?.getElementById(
      "close-button"
    ) as HTMLButtonElement;

    this.close = this.close.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  addEventListeners() {
    window.addEventListener("keydown", this.onKeyDown);
    this.$backdrop.addEventListener("click", this.close);
    this.$closeButton.addEventListener("click", this.close);
  }

  removeEventListeners() {
    window.removeEventListener("keydown", this.onKeyDown);
    this.$backdrop.removeEventListener("click", this.close);
    this.$closeButton.removeEventListener("click", this.close);
  }

  connectedCallback() {
    this.addEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  didOpen() {
    this.dispatchEvent(new CustomEvent(DialogEvents.opened));
  }

  didClose() {
    this.dispatchEvent(new CustomEvent(DialogEvents.closed));
  }

  attributeChangedCallback(name: string) {
    switch (name) {
      case "open":
        this.open ? this.didOpen() : this.didClose();
    }
  }
}

customElements.define("game-dialog", GameDialog);
