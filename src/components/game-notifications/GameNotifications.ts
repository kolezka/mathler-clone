const template = document.createElement("template");

template.innerHTML = `
  <style>
    @keyframes appear {
      0% {
        opacity: 0;
        transform: translateY(-64px)
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes disappear {
      0% {
        opacity: 1;
        transform: translateY(0)
      }
      100% {
        opacity: 0;
        transform: translateY(-64px);
      }
    }
    .notification {
      position: absolute;
      top: 64px;
      left: 0;
      right: 0;
      background-color: var(--game-notification-background-color);
      border-radius: 4px;
      padding: 4px;
      font-size: .875rem;
      line-height: 1rem;
      animation: appear .5s forwards;
    }
    .notification--out {
      animation: disappear .2s forwards;
    }
  </style>
  <div id="root"></div>
`;

export enum GameNotificationsEvents {
  NOTIFY = "NOTIFY",
}

const NOTIFICATION_TIMEOUT = 1500;
export class GameNotifications extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
    this.addEventListener(GameNotificationsEvents.NOTIFY, (e: Event) => {
      this.addNotification((e as CustomEvent).detail);
    });
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
