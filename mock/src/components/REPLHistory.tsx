import { useState } from "react";
import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  history: string[];
  mode: string;
  dataTable: string[][];
  tableVisible: boolean;
}

export function REPLHistory(props: REPLHistoryProps) {
  const parsedHistory = props.history.map((item) => {
    const [command, result] = item.split(" => ");
    return { command, result };
  });
  let dataTableContent = null;
  if (props.tableVisible) {
    dataTableContent = (
      <table>
        <caption>DataTable:</caption>
        {props.dataTable.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((col, colIndex) => (
              <td key={colIndex}>{col}</td>
            ))}
          </tr>
        ))}
      </table>
    );
  }

  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {parsedHistory.map(({ command, result }, index) => (
        <div key={index}>
          <p>Command: {command} </p>
          <p>Result: {result} </p>
        </div>
      ))}
      {dataTableContent}
    </div>
  );
}
