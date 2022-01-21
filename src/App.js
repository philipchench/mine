import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import Row from "./Row";
import {
  boardBuilder,
  plantMines,
  flipCell,
  revealMines,
} from "./BoardBuilder";

function App() {
  const [rows, setRows] = useState(15); //row count
  const [cols, setCols] = useState(15); //col count
  const [mines, setMines] = useState(35); //mine count
  const [board, setBoard] = useState(boardBuilder(rows, cols, mines)); //board 2d array of data
  const [stop, setStop] = useState(false); //is game over or not
  const [fresh, setFresh] = useState(true); //started or not
  const [minesLeft, setMinesLeft] = useState(mines); //mines left for display
  const [time, setTime] = useState(0); //timer
  const [emoji, setEmoji] = useState("😝"); //emoji on restart button

  useEffect(() => {
    const interval = setInterval(() => {
      if (time < 1000 && !stop) {
        setTime(time + 1); //increment time every second
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  //what to do if flipped
  const flip = (x, y) => (e) => {
    if (stop || board[x][y][5]) {
      //game over, no more clicking
      return;
    }
    e.preventDefault();
    if (fresh) {
      //if fresh, make cell and surrounding have no mines
      setBoard(plantMines(rows, cols, x, y, mines, board));
      setFresh(false); //not fresh anymore
    }
    if (board[x][y][2]) {
      //if landed on mine procedure
      setBoard(revealMines(x, y, rows, cols, board));
      setStop(true);
      setEmoji("😱");
      return; //return so we don't set smiley emoji (last line of func)
    } else if (board[x][y][3]) {
      //no mine and still hidden procedure
      setBoard(flipCell(x, y, board, true));
      setEmoji("😝");
    }
    setEmoji("😝"); //default smile to cancel wow face
  };
  //what to do if flagged
  const flag = (x, y) => (e) => {
    if (stop || !board[x][y][3]) {
      //game over or if flipped already
      return;
    }
    e.preventDefault();
    const flagBoard = [...board];
    flagBoard[x][y][5] = !flagBoard[x][y][5];
    setBoard(flagBoard);
    if (flagBoard[x][y][5]) {
      setMinesLeft(minesLeft - 1); //decrement if not yet flagged
    } else {
      setMinesLeft(minesLeft + 1); //increment if unflag
    }
  };

  //do when restart
  const restart = () => {
    setStop(false);
    setFresh(true);
    setBoard(boardBuilder(rows, cols, mines));
    setMinesLeft(mines);
    setTime(0);
    setEmoji("😝");
  };
  //self explanatory
  const emojiWow = (cell) => {
    if (!stop) {
      setEmoji("😮");
    }
  };

  return (
    <div className="App">
      <div className="topBar">
        <div className="number">{minesLeft}</div>
        <button className="startButton" onClick={restart}>
          {emoji}
        </button>
        <div className="number">{time}</div>
      </div>
      <div className="board">
        {board.map((row) => {
          return (
            <Row
              key={row.toString()}
              rowData={row}
              onClick={flip}
              onContext={flag}
              onmousedown={emojiWow}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
