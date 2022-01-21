function Cell({ cellData, onClick, onContext, onmousedown }) {
  const setText = () => {
    if (cellData[3]) {
      //if covered
      if (cellData[5]) {
        //if flagged
        return "🚩";
      }
      return "";
    } else if (cellData[2]) {
      //if mine
      return "💣";
    } else {
      if (cellData[4] == 0) {
        //if uncovered but number is 0
        return "";
      }
      return cellData[4]; //if uncovered and has positive number
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
