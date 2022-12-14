import { helpDialogTemplate } from "../dialogs/help-dialog/HelpDialog";
import { openDialog } from "../game-dialog/openDialog";

const template = document.createElement("template");

template.innerHTML = `
  <style>
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 0 8px;
    }
    p {
      font-size: .875rem;
      margin: 0 0 16px;
    }
    h3 {
      margin: 0;
    }
    button {
      cursor: pointer;
      margin: 0;
      padding: 0;
      width: 24px;
      height: 24px;
      background: none;
      border: none;
    }
    button svg path {
      transition: fill .1s ease-in;
      fill: var(--game-header-button-color);
    }
    button:hover svg path {
      fill: var(--game-header-hover-button-color);
    }
  </style>
  <header>
    <h3>Mathematica</h3>
    <button id="help-button" type="button">
      <svg enable-background="new 0 0 50 50" version="1.1" viewBox="0 0 50 50" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
          <path d="m45 0h-40c-2.75 0-5 2.25-5 5v40c0 2.75 2.25 5 5 5h40c2.75 0 5-2.25 5-5v-40c0-2.75-2.25-5-5-5zm1 45c0 0.542-0.458 1-1 1h-40c-0.542 0-1-0.458-1-1v-40c0-0.542 0.458-1 1-1h40c0.542 0 1 0.458 1 1v40z"/>
          <path d="m24.733 34.318c-0.936 0-1.73 0.322-2.375 0.947-0.645 0.627-0.968 1.414-0.968 2.338 0 1.035 0.334 1.85 1 2.429 0.667 0.581 1.449 0.862 2.342 0.862 0.868 0 1.631-0.297 2.295-0.881 0.656-0.582 0.988-1.395 0.988-2.41 0-0.924-0.32-1.711-0.953-2.338-0.623-0.624-1.405-0.947-2.329-0.947z"/>
          <path d="m30.896 8.772c-1.631-0.791-3.51-1.18-5.629-1.18-2.295 0-4.294 0.473-6.005 1.401-1.718 0.943-3.026 2.126-3.919 3.562-0.893 1.423-1.343 2.839-1.343 4.232 0 0.67 0.281 1.295 0.848 1.889 0.561 0.565 1.258 0.861 2.076 0.861 1.395 0 2.342-0.832 2.844-2.488 0.527-1.574 1.172-2.777 1.935-3.59 0.762-0.817 1.946-1.225 3.564-1.225 1.377 0 2.502 0.406 3.375 1.205 0.871 0.813 1.31 1.802 1.31 2.98 0 0.602-0.147 1.16-0.429 1.66-0.289 0.515-0.643 0.984-1.055 1.397-0.419 0.425-1.103 1.047-2.039 1.866-1.072 0.941-1.922 1.743-2.548 2.428-0.632 0.686-1.138 1.464-1.522 2.382-0.378 0.9-0.57 1.959-0.57 3.199 0 0.975 0.259 1.721 0.783 2.217 0.519 0.496 1.162 0.75 1.923 0.75 1.464 0 2.334-0.768 2.62-2.293 0.161-0.713 0.28-1.211 0.358-1.506 0.084-0.281 0.192-0.562 0.342-0.857 0.149-0.281 0.375-0.602 0.675-0.945 0.294-0.345 0.698-0.736 1.194-1.203 1.805-1.61 3.051-2.753 3.75-3.438 0.697-0.672 1.299-1.486 1.803-2.43 0.507-0.941 0.763-2.037 0.763-3.284 0-1.574-0.441-3.05-1.333-4.388-0.89-1.353-2.146-2.424-3.771-3.202z"/>
      </svg>
    </button>
  </header>
  <p>
    Find the hidden calculation that equals <span id="expressionValue"></span>
  </p>
`;

export class GameHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setExpressionValue(str: string) {
    const $expressionValue = this.shadowRoot?.getElementById("expressionValue");
    if ($expressionValue) {
      $expressionValue.innerText = str;
    }
  }

  onInfoIconClick() {
    openDialog({
      $content: helpDialogTemplate.content.cloneNode(true),
    });
  }

  connectedCallback() {
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.shadowRoot
      ?.getElementById("help-button")
      ?.addEventListener("click", () => {
        this.onInfoIconClick();
      });
  }
}

customElements.define("game-header", GameHeader);
