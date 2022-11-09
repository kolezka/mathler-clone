import "./GameNotifications";
import { GameNotifications } from "./GameNotifications";

jest.useFakeTimers();

describe("GameNotifications", () => {
  let $gameNotifications: GameNotifications;

  beforeEach(() => {
    document.body.innerHTML = "<game-notifications></game-notifications>";
    $gameNotifications = document.querySelector(
      "game-notifications"
    ) as GameNotifications;
  });

  it("adds notifications", () => {
    const notificationText = "hello-world";
    $gameNotifications.addNotification(notificationText);
    const $notification =
      $gameNotifications.shadowRoot?.querySelector(".notification");
    expect(($notification as HTMLDivElement).innerText).toBe(notificationText);
  });

  it("removes notification after some time", () => {
    $gameNotifications.addNotification("hello-world");
    jest.runAllTimers();
    expect($gameNotifications.querySelector(".notification")).toBe(null);
  });
});
