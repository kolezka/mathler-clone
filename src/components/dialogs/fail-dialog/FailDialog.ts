import { Mathler } from "../../../game";
import { GameDialog } from "../../game-dialog/GameDialog";

export const failDialogTemplate = document.createElement("template");

failDialogTemplate.innerHTML = `
  <style>
  #dialog-body {
    min-width: 320px;
  }
  p {
    font-size: .875rem;
    margin: 0 0 8px;
  }
  button {
    color: var(--game-dialog-button-text-color);
    border: none;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    padding: 4px 8px;
    border-radius: 4px;
    background-color: var(--game-dialog-button-background-color);
  }
  button:hover {
    background-color: var(--game-dialog-button-hover-background-color);
  }
  </style>
  <span slot="dialog-title">This time you failed</span>
  <div id="dialog-body" slot="dialog-body">
    <p>
      Unfortunately, you have not been able to find a solution. You can
      try again however, it will make your statistics worse.
    </p>
    <button id="try-again-button" type="button">Try again</button>
  </div>
`;

export class FailDialog extends GameDialog {
  constructor() {
    super();
    this.appendChild(failDialogTemplate.content.cloneNode(true));
    this.onTryAgainClick = this.onTryAgainClick.bind(this);
  }

  onTryAgainClick() {
    const $mathler = document.querySelector("mathler-game") as Mathler;
    if ($mathler) {
      $mathler.onTryAgain();
    }
  }

  addEventListeners() {
    super.addEventListeners();
    this.querySelector("#try-again-button")?.addEventListener(
      "click",
      this.onTryAgainClick
    );
  }

  removeEventListeners() {
    super.removeEventListeners();
    this.querySelector("#try-again-button")?.removeEventListener(
      "click",
      this.onTryAgainClick
    );
  }
}

customElements.define("fail-dialog", FailDialog);
