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

  const flip = (x, y) => (e) => {
    console.log("prev flip ", board[x][y][3]);
    e.preventDefault();
    console.log(x, y);
    if (board[x][y][2]) {
      const bombboard = [...board];
      bombboard[x][y][3] = 0;
      setBoard(bombboard);
    } else if (board[x][y][3]) {
      setBoard(flipCell(x, y, board, true));
    }
    console.log("post flip ", board[x][y][3]);
  };

  return (
    <div className="App">
      <div className="topBar">topbar</div>
      <div className="board">
        {board.map((row) => {
          return <Row key={row.toString()} rowData={row} clickFunc={flip} />;
        })}
      </div>
    </div>
  );
}

export default App;
