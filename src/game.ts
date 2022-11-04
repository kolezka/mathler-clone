export enum EGameEvents {
  ADD = "ADD",
  DELETE = "DELETE",
  ENTER = "ENTER",
  UPDATE = "UPDATE",
}

let currentCol = 0;
let currentRow = 0;

const data: (string | null)[][] = [[], [], [], [], [], []];

function update() {
  // // TODO
  // currentCol += 1;

  console.log("Dispatch event", data);

  window.dispatchEvent(new CustomEvent(EGameEvents.UPDATE, { detail: data }));
}

function onAdd(e: Event) {
  const { detail } = e as CustomEvent;

  console.log(currentCol);

  if (currentCol >= 6) return;

  data[currentRow][currentCol] = detail;

  currentCol += 1;

  update();
}

window.addEventListener(EGameEvents.ADD, onAdd);

function onDelete(e: any) {
  data[currentRow][currentCol - 1] = null;

  currentCol -= 1;

  update();
}

window.addEventListener(EGameEvents.DELETE, onDelete);

function onEnter(e: any) {
  console.log("onEnter", e);
}

window.addEventListener(EGameEvents.ENTER, onEnter);
