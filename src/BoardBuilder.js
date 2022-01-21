//builds a 2d array that contains board data
export function boardBuilder(rows, cols) {
  const board = [];
  //cellData:[0row, 1col, 2isMine, 3isHidden, 4number, 5flag, 6red]
  for (let x = 0; x < rows; x++) {
    //create board of no mines
    let row = [];
    for (let y = 0; y < cols; y++) {
      let cell = [x, y, 0, 1, 0, false, false];
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
      //if no bomb and not neighbor, place bomb
      newboard[mineX][mineY][2] = 1;
      count++;
    }
  }
  return newboard;
}

//flip cell procedure, recursive
export function flipCell(x, y, board, isState) {
  let newboard = board;
  let flipped = 1;
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
          const result = flipCell(x + xNbr, y + yNbr, newboard, false); //recursively run flip
          flipped += result[1]; //increment flip by recursive run
        }
      }
    }
  }
  return [newboard, flipped]; //return board, and number of flips on this run
}

//set the number of current cell, counts neighboring mines
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
  board[x][y][4] = bombCount; //lastly, update
}

//reveal mines when click on mine (game over)
export function revealMines(currX, currY, rows, cols, board) {
  const newboard = [...board];
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (newboard[x][y][2]) {
        newboard[x][y][3] = 0; //uncover every mine
      }
    }
  }
  newboard[currX][currY][6] = true; //set only current cell to red
  return newboard;
}
