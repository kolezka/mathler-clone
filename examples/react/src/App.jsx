import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import "math-wordle";

function App() {
  return (
    <div className="App">
      <game-board></game-board>
      <game-keyboard></game-keyboard>
      <game-notifications></game-notifications>
    </div>
  );
}

export default App;
