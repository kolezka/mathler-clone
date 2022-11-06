import { DialogEvents, GameDialog } from "./GameDialog";

export function openDialog<T extends GameDialog>(
  $content: Node,
  $container = document.body,
  initialize: () => T = () => new GameDialog() as T
) {
  const $dialog = initialize();

  if ($content !== null) {
    $dialog.appendChild($content);
  }

  const closePromise = new Promise((resolve) => {
    $dialog.addEventListener(DialogEvents.closed, (e) => {
      $dialog.remove();
      resolve(e);
    });
  });

  $container.appendChild($dialog);
  $dialog.show();

  return { $dialog, closePromise };
}
