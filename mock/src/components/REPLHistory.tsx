import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  history: string[];
  mode: string;
}

export function REPLHistory(props: REPLHistoryProps) {
  const parsedHistory = props.history.map((item) => {
    const [command, result, dataTable] = item.split(" => ");
    return { command, result, dataTable };
  });
  return (
    <table className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {parsedHistory.map(({ command, result, dataTable }, index) => (
        <table key={index}>
          {/* {props.mode === "verbose" &&  */}
          <table>
            <table>
              <tr>
                <table>Command: {command}</table>
              </tr>
              <table>
                <td>Result: {result}</td>
              </table>
              {dataTable &&
                dataTable.split(",").map((row, rowIndex) => (
                  <table key={rowIndex} className="data-row">
                    <td>{row}</td>
                  </table>
                ))}
            </table>
          </table>
        </table>
      ))}
    </table>
  );
}
