const dialogTemplate = document.createElement("template");

dialogTemplate.innerHTML = `
  <style>
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1000;
      padding: 32px 0;
      background-color: rgba(0, 0, 0, .25);
    }
    button {
      cursor: pointer;
      background: none;
      border: none;
      width: 28px;
    }
    .dialog {
      margin: 0 auto;
      max-width: 320px;
      border-radius: 4px;
      padding: 8px 16px 16px;
      background-color: var(--game-board-background-color);
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
  </style>
  <div class="dialog-overlay">
    <div class="dialog">
      <div class="dialog-header">
        <h3 class="dialog-title"></h3>
        <button>
          <svg enable-background="new 0 0 489.8 489.8" version="1.1" viewBox="0 0 489.8 489.8" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
            <path d="M438.2,0H51.6C23.1,0,0,23.2,0,51.6v386.6c0,28.5,23.2,51.6,51.6,51.6h386.6c28.5,0,51.6-23.2,51.6-51.6V51.6    C489.8,23.2,466.6,0,438.2,0z M465.3,438.2c0,14.9-12.2,27.1-27.1,27.1H51.6c-14.9,0-27.1-12.2-27.1-27.1V51.6    c0-14.9,12.2-27.1,27.1-27.1h386.6c14.9,0,27.1,12.2,27.1,27.1V438.2z"/>
            <path d="m319 170.8c-4.8-4.8-12.5-4.8-17.3 0l-56.8 56.8-56.8-56.8c-4.8-4.8-12.5-4.8-17.3 0s-4.8 12.5 0 17.3l56.8 56.8-56.8 56.8c-4.8 4.8-4.8 12.5 0 17.3 2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6l56.8-56.8 56.8 56.8c2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6c4.8-4.8 4.8-12.5 0-17.3l-57-56.8 56.8-56.8c4.8-4.8 4.8-12.5 0-17.3z"/>
          </svg>
        </button>
      </div>
      <div class="dialog-body" slot="dialog-body">

      </div>
    </div>
  </div>
`;

export class GameDialogs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // closeDialog() {
  //   if (this.shadowRoot) {
  //     this.shadowRoot.innerHTML = ``;
  //   }
  // }

  showDialog(template: HTMLTemplateElement, dialogTitle?: string) {
    this.shadowRoot?.appendChild(dialogTemplate.content.cloneNode(true));

    // Apply close event
    // this.shadowRoot?.querySelector("button")?.addEventListener("click", () => {
    //   this.closeDialog();
    // });

    // Apply template
    this.shadowRoot
      ?.querySelector(".dialog-body")
      ?.appendChild(template.content.cloneNode(true));

    // Apply title
    const dialogTitleElement = this.shadowRoot?.querySelector(".dialog-title");
    if (dialogTitleElement && dialogTitle) {
      dialogTitleElement.innerHTML = dialogTitle;
    }
  }
}

customElements.define("game-dialogs", GameDialogs);
