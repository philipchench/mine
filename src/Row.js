import React, { useEffect, useState } from "react";
import Cell from "./Cell";

function Row({ rowData }) {
  const drawRow = () => {
    rowData.map((row) => {
      return <Row cellData={row} />;
    });
  };
  return <div className="row">{drawRow}</div>;
}

export default Row;
