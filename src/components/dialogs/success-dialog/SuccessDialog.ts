import { Mathler } from "../../../game";
import { GameDialog } from "../../game-dialog/GameDialog";

export const successDialogTemplate = document.createElement("template");

successDialogTemplate.innerHTML = `
  <style>
  #dialog-body {
    min-width: 320px;
  }
  button {
    cursor: pointer;
    border: none;
    display: block;
    margin: 16px auto 0;
    border-radius: var(--game-dialog-button-radius);
    font-size: var(--game-dialog-button-text-size);
    background-color: var(--game-dialog-button-background-color);
  }
  button:hover {
    background-color: var(--game-dialog-button-hover-background-color);
  }
  </style>
  <span slot="dialog-title">Success!</span>
  <div id="dialog-body" slot="dialog-body">
  <p>You managed to find the result</p>
  <button id="restart-button">Restart</button>
  </div>
`;

export class SuccessDialog extends GameDialog {
  $restartButton: HTMLButtonElement;

  constructor() {
    super();
    this.appendChild(successDialogTemplate.content.cloneNode(true));
    this.$restartButton = this.querySelector(
      "#restart-button"
    ) as HTMLButtonElement;
    this.onRestartClick = this.onRestartClick.bind(this);
    this.$restartButton.addEventListener("click", this.onRestartClick);
  }

  onRestartClick() {
    const $mathler = document.querySelector("mathler-game") as Mathler;
    $mathler.reset();
    this.close();
  }
}

customElements.define("success-dialog", SuccessDialog);
