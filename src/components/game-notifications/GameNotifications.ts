const template = document.createElement("template");

template.innerHTML = `
  <style>
    @keyframes appear {
      0% {
        opacity: 0;
        transform: translateY(-64px) translateX(-50%);
      }
      100% {
        opacity: 1;
        transform: translateY(0) translateX(-50%);
      }
    }
    @keyframes disappear {
      0% {
        opacity: 1;
        transform: translateY(0) translateX(-50%);
      }
      100% {
        opacity: 0;
        transform: translateY(-64px) translateX(-50%);
      }
    }
    .notification {
      position: absolute;
      top: 64px;
      left: 50%;
      transform: translateX(-50%);
      right: 0;
      background-color: var(--game-notification-background-color);
      border-radius: var(--game-notification-border-radius);
      padding: var(--game-notification-padding);
      font-size: var(--game-notification-text-size);
      min-width: 320px;
      line-height: 1rem;
      animation: appear .5s forwards;
    }
    .notification--out {
      animation: disappear .2s forwards;
    }
  </style>
  <div id="root"></div>
`;

const NOTIFICATION_TIMEOUT = 1500;
export class GameNotifications extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  removeNotification(element: HTMLDivElement) {
    element.classList.add("notification--out");
    setTimeout(() => {
      element?.remove();
    }, 200);
  }

  addNotification(str: string) {
    const notification = document.createElement("div");
    notification.innerText = str;
    notification.classList.add("notification");
    this.shadowRoot?.appendChild(notification);
    setTimeout(() => {
      this.removeNotification(notification);
    }, NOTIFICATION_TIMEOUT);
  }
}

customElements.define("game-notifications", GameNotifications);
