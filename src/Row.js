import React, { useEffect, useState } from "react";
import Cell from "./Cell";

function Row({ rowData, clickFunc }) {
  return (
    <div className="row">
      {rowData.map((cell) => {
        return (
          <Cell key={cell.toString()} cellData={cell} clickFunc={clickFunc} />
        );
      })}
    </div>
  );
}

export default Row;
