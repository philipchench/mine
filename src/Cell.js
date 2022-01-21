function Cell({ cellData, onClick, onContext, onmousedown }) {
  const setText = () => {
    if (cellData[3]) {
      if (cellData[5]) {
        return "🚩";
      }
      return "";
    } else if (cellData[2]) {
      return "💣";
    } else {
      if (cellData[4] == 0) {
        return "";
      }
      return cellData[4];
    }
  };

  return (
    <div
      className={`cell ${!cellData[3] ? "unveiled" : ""} number-${
        cellData[4]
      } ${cellData[6] ? "red" : ""}`}
      onClick={onClick(cellData[0], cellData[1])}
      onContextMenu={onContext(cellData[0], cellData[1])}
      onMouseDown={() => onmousedown(cellData)}
    >
      {setText()}
    </div>
  );
}

export default Cell;

//const [cellState, setCellState] = useState(0);
//-3 is covered, -2 is flagged, -1 is current bomb,
// 0~7 is number of cell if any
// useEffect(() => {
//   //set state for styles
//   if (cellData[3]) {
//     setCellState(-3);
//     if (cellData[5]) {
//       setCellState(-2);
//     }
//   } else if (cellData[2]) {
//     setCellState(-1);
//   } else if (!cellState) {
//     setCellState(cellData[4]);
//   }
// });
// const setText = () => {
//   //set inner html text
//   if (cellState == -3 || cellState == 0) {
//     return "";
//   } else if (cellState == -2) {
//     return "🚩";
//   } else if (cellState == -1) {
//     return "💣";
//   } else {
//     return cellState;
//   }
// };
