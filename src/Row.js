import Cell from "./Cell";

function Row({ rowData, onClick, onContext, onmousedown }) {
  return (
    <div className="row">
      {rowData.map((cell) => {
        return (
          <Cell
            key={cell.toString()}
            cellData={cell}
            onClick={onClick}
            onContext={onContext}
            onmousedown={onmousedown}
          />
        );
      })}
    </div>
  );
}

export default Row;
