import "./GameHeader";
import { GameHeader } from "./GameHeader";
import { helpDialogTemplate } from "../dialogs/help-dialog/HelpDialog";

jest.mock("../game-dialog/openDialog", () => ({
  openDialog: jest.fn(),
}));

import { openDialog } from "../game-dialog/openDialog";

describe("GameHeader", () => {
  let $gameHeader: GameHeader;
  let openDialogMock: jest.Mock;

  beforeEach(() => {
    document.body.innerHTML = `<game-header></game-header>`;
    $gameHeader = document.body.querySelector("game-header") as GameHeader;
    openDialogMock = openDialog as jest.Mock;
  });

  it("show help dialog on help button click", () => {
    const $helpButton = $gameHeader.shadowRoot?.querySelector("#help-button");
    $helpButton?.dispatchEvent(new Event("click", {}));
    expect(openDialogMock).toHaveBeenCalledWith({
      $content: helpDialogTemplate.content.cloneNode(true),
    });
  });
});
