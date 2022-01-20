//builds a 2d array that contains board data
export function boardBuilder(rows, cols) {
  console.log("boardbuilder");
  const board = [];
  //cell data: [row, col, minestatus, hiddenstatus, number, flag]
  for (let x = 0; x < rows; x++) {
    //create board of no mines
    let row = [];
    for (let y = 0; y < cols; y++) {
      let cell = [x, y, 0, 1, 0, false];
      row.push(cell);
    }
    board.push(row);
  }
  return board;
}
//sets mines on the board, mutates board
export function plantMines(rows, cols, x, y, mines, board) {
  const newboard = [...board];
  let count = 0;
  while (count < mines) {
    let mineX = Math.floor(Math.random() * rows);
    let mineY = Math.floor(Math.random() * cols);
    if (
      !newboard[mineX][mineY][2] &&
      !(Math.abs(mineX - x) <= 1 && Math.abs(mineY - y) <= 1)
    ) {
      //if no bomb, place bomb
      console.log(mineX, mineY);
      newboard[mineX][mineY][2] = 1;
      count++;
    }
  }
  return newboard;
}

export function flipCell(x, y, board, isState) {
  let newboard = board;
  if (isState) {
    //only first call will make deep copy (can't directly alter React hook state)
    //the rest of the calls can directly mutate newboard
    newboard = [...board];
  }
  setNum(x, y, newboard);
  newboard[x][y][3] = 0;
  if (newboard[x][y][4] == 0) {
    for (let xNbr = -1; xNbr <= 1; xNbr++) {
      for (let yNbr = -1; yNbr <= 1; yNbr++) {
        if (newboard[x + xNbr]?.[y + yNbr] && newboard[x + xNbr][y + yNbr][3]) {
          flipCell(x + xNbr, y + yNbr, newboard, false);
        }
      }
    }
  }
  return newboard;
}

function setNum(x, y, board) {
  let bombCount = 0;
  for (let xNbr = -1; xNbr <= 1; xNbr++) {
    for (let yNbr = -1; yNbr <= 1; yNbr++) {
      if (board[x + xNbr]?.[y + yNbr]) {
        if (board[x + xNbr][y + yNbr][2]) {
          bombCount++;
        } else if (board[x + xNbr][y + yNbr][3]) {
        }
      }
    }
  }
  board[x][y][4] = bombCount;
}

export function safeStart(x, y, board) {
  const newboard = [...board];
  for (let xNbr = -1; xNbr <= 1; xNbr++) {
    for (let yNbr = -1; yNbr <= 1; yNbr++) {
      if (newboard[x + xNbr]?.[y + yNbr]) {
        if (newboard[x + xNbr][y + yNbr][2]) {
          newboard[x + xNbr][y + yNbr][2] = 0;
        }
      }
    }
  }
  return newboard;
}

export function revealMines(rows, cols, board) {
  const newboard = [...board];
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (newboard[x][y][2]) {
        newboard[x][y][3] = 0;
      }
    }
  }
  return newboard;
}
