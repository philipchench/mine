//builds a 2d array that contains board data
export function BoardBuilder(rows, cols, mines) {
  const board = [];
  //cell data: [row, col, minestatus, hiddenstatus, number]
  for (let x = 0; x < rows; x++) {
    //create board of no mines
    let row = [];
    for (let y = 0; y < cols; y++) {
      let cell = [x, y, 0, 1, 0];
      row.push(cell);
    }
    board.push(row);
  }
  setMines(rows, cols, mines, board);
  return board;
}
//sets mines on the board, mutates board
function setMines(rows, cols, mines, board) {
  let count = 0;
  while (count < mines) {
    let x = Math.floor(Math.random() * rows);
    let y = Math.floor(Math.random() * cols);
    if (!board[x][y][2]) {
      //if no bomb, place bomb
      board[x][y][2] = 1;
    }
  }
}

export function flipCell(x, y, board) {
  if (!board[x][y][3]) {
    return;
  }
  setNum(x, y, board);
  board[x][y][3] = 1;
}

function setNum(x, y, board) {
  let bombCount = 0;
  for (let xNbr = -1; xNbr <= 1; xNbr++) {
    for (let yNbr = -1; yNbr <= 1; yNbr++) {
      if (!board[x][y][2]) {
        let bomb = board[xNbr]?.[yNbr][2];
        if (bomb) {
          bombCount++;
        }
      }
    }
  }
  board[x][y][4] = bombCount;
}
