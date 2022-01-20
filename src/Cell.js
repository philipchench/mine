function Cell({ cellData, clickFunc }) {
  const setText = () => {
    if (cellData[3]) {
      return "";
    } else if (cellData[2]) {
      return "💣";
    } else {
      return cellData[4];
    }
  };

  return (
    <div
      className="cell"
      onClick={clickFunc(cellData[0], cellData[1])}
      style={{
        cursor: cellData[3] ? "pointer" : "default",
      }}
    >
      {setText()}
    </div>
  );
}

export default Cell;
