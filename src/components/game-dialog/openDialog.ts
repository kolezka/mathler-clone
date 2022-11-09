import { DialogEvents, GameDialog } from "./GameDialog";

interface IOpenDialogConfig<T extends GameDialog> {
  $content?: Node; // | (($dialog: T) => void);
  $container?: HTMLElement;
  initialize?: () => T;
}

export function openDialog<T extends GameDialog>({
  $content,
  $container = document.body,
  initialize = () => new GameDialog() as T,
}: IOpenDialogConfig<T>) {
  const $dialog = initialize();

  if ($content) {
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
