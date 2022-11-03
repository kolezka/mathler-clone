export enum EGameEvents {
  ADD = "ADD",
  DELETE = "DELETE",
  ENTER = "ENTER",
  UPDATE = "UPDATE",
}

let currentCol = 0;
let currentRow = 0;

const data: string[][] = [[], [], [], [], [], []];

function update() {

  currentCol += 1;

  window.dispatchEvent(new CustomEvent(EGameEvents.UPDATE, { detail: data }));
}

function onAdd(e: Event) {
  const { detail } = e as CustomEvent;
  data[currentRow][currentCol] = detail;
  update();
}

window.addEventListener(EGameEvents.ADD, onAdd);

function onDelete(e: any) {
  console.log("onDelete", e);
}

window.addEventListener(EGameEvents.DELETE, onDelete);

function onEnter(e: any) {
  console.log("onEnter", e);
}

window.addEventListener(EGameEvents.ENTER, onEnter);
