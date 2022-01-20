import React, { useEffect, useState } from "react";
import Cell from "./Cell";

function Row({ rowData, onClick, onContext }) {
  return (
    <div className="row">
      {rowData.map((cell) => {
        return (
          <Cell
            key={cell.toString()}
            cellData={cell}
            onClick={onClick}
            onContext={onContext}
          />
        );
      })}
    </div>
  );
}

export default Row;
