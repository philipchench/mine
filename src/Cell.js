function Cell({ cellData, onClick, onContext }) {
  const setText = () => {
    if (cellData[3]) {
      if (cellData[5]) {
        return "🚩";
      }
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
      onClick={onClick(cellData[0], cellData[1])}
      onContextMenu={onContext(cellData[0], cellData[1])}
      style={{
        cursor: cellData[3] ? "pointer" : "default",
      }}
    >
      {setText()}
    </div>
  );
}

export default Cell;
