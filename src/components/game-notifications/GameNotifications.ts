const template = document.createElement("template");

template.innerHTML = `
  <div>

  </div>
`;

export class GameNotifications extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("game-notifications", GameNotifications);
