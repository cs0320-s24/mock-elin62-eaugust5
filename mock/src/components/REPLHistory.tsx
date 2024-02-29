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
  //const [dataTableVisible, setDataTableVisible] = useState(false);

  console.log(props.dataTable);
  console.log(props.tableVisible);
  const parsedHistory = props.history.map((item) => {
    const [command, result] = item.split(" => ");
    return { command, result };
  });
  return (
    <table className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {parsedHistory.map(({ command, result }, index) => (
        <table key={index}>
          {/* {props.mode === "verbose" &&  */}
          <table>
            <table>
              <tr>
                <table>
                  <strong>Command: </strong> {command}
                </table>
              </tr>
              <table>
                <td>
                  <strong>Result: </strong> {result}
                </td>
              </table>

              {props.tableVisible && (
                <table>
                  <td>
                    <table>
                      <strong>DataTable: </strong>
                    </table>
                    {props.dataTable.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((col, colIndex) => (
                          <td key={colIndex}>{col}</td>
                        ))}
                      </tr>
                    ))}
                  </td>
                </table>
              )}
            </table>
          </table>
        </table>
      ))}
    </table>
  );
}
