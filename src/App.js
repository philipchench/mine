import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import Row from "./Row";
import { boardBuilder, flipCell } from "./BoardBuilder";

function App() {
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(15);
  const [mines, setMines] = useState(35);
  const [board, setBoard] = useState(boardBuilder(rows, cols, mines));
  const [stop, setStop] = useState(false);
  const [minesLeft, setMinesLeft] = useState(mines);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time < 1000) {
        setTime(time + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const flip = (x, y) => (e) => {
    if (stop) {
      return;
    }
    console.log("prev flip ", board[x][y][3]);
    e.preventDefault();
    console.log(x, y);
    if (board[x][y][2]) {
      const bombboard = [...board];
      bombboard[x][y][3] = 0;
      setBoard(bombboard);
      setStop(true);
    } else if (board[x][y][3]) {
      setBoard(flipCell(x, y, board, true));
    }
    console.log("post flip ", board[x][y][3]);
  };

  const flag = (x, y) => (e) => {
    if (stop || !board[x][y][3]) {
      return;
    }
    e.preventDefault();
    console.log(x, y);
    const flagBoard = [...board];
    flagBoard[x][y][5] = !flagBoard[x][y][5];
    setBoard(flagBoard);
    if (flagBoard[x][y][5]) {
      setMinesLeft(minesLeft - 1);
    } else {
      setMinesLeft(minesLeft + 1);
    }
  };

  const restart = () => {
    setStop(false);
    setBoard(boardBuilder(rows, cols, mines));
    setMinesLeft(mines);
    setTime(0);
  };

  return (
    <div className="App">
      <div className="topBar">
        <div className="numbers">{minesLeft}</div>
        <button className="startButton" onClick={restart}>
          😝
        </button>
        <div className="numbers">{time}</div>
      </div>
      <div className="board">
        {board.map((row) => {
          return (
            <Row
              key={row.toString()}
              rowData={row}
              onClick={flip}
              onContext={flag}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
