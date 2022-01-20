import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import Row from "./Row";
import { BoardBuilder, flipCell } from "./BoardBuilder";

function App() {
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(15);
  const [mines, setMines] = useState(35);
  const [board, setBoard] = useState(BoardBuilder(rows, cols, mines));

  const drawBoard = () => {
    board.map((row) => {
      return <Row rowData={row} />;
    });
  };

  return (
    <div className="App">
      <div>topbar</div>
      {drawBoard}
    </div>
  );
}

export default App;
