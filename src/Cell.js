function Cell({ cellData }) {
  const setText = () => {
    if (cellData[3]) {
      return "";
    } else if (cellData[2]) {
      return "💣";
    } else {
      return cellData[4];
    }
  };
  return <div className="cell">{setText}</div>;
}

export default Cell;
