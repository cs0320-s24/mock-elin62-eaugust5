import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  history: string[]; // Array of tuples containing command and result
  mode: string;
}
export function REPLHistory(props: REPLHistoryProps) {
  const parsedHistory = props.history.map((item) => {
    const [command, result] = item.split(" => ");
    return { command, result };
  });
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {parsedHistory.map(({ command, result }, index) => (
        <div key={index}>
          {/* {props.mode === "verbose" &&  */}
          {<p>Command: {command}</p>}
          <p>Result: {result}</p>
        </div>
      ))}
    </div>
  );
}
