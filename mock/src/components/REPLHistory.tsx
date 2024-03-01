import { Dispatch, SetStateAction } from "react";
import "../styles/main.css";
import { CommandFunctionMap } from "./REPLFunction";

interface REPLHistoryProps {
  history: { command: string; result: string | string[][] }[];
  mode: string;
  mockedJson: string[][];
  isLoaded: boolean;
  filePath: string;
  fileContents: string[][];
  commandFunctionMap: CommandFunctionMap;
  displayOutput: Array<[string, string | string[][]]>;
  setHistory: Dispatch<
    SetStateAction<{ command: string; result: string | string[][] }[]>
  >;
  setMode: Dispatch<SetStateAction<string>>;
  setMockedJson: Dispatch<SetStateAction<string[][]>>;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
  setFilePath: Dispatch<SetStateAction<string>>;
  setFileContents: Dispatch<SetStateAction<string[][]>>;
  setCommandFunctionMap: Dispatch<SetStateAction<CommandFunctionMap>>;
  setDisplayOutput: Dispatch<
    SetStateAction<Array<[string, string | string[][]]>>
  >;
}

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history">
      {props.history.map(({ command, result }, index) => (
        <div key={index}>
          {/* Checks if mode is equal to verbose, and prints command only if that is true */}
          {props.mode === "verbose" && <p>Command: {command}</p>}
          {/* Check if result is an array */}

          {Array.isArray(result) ? (
            <table>
              <tbody>
                {/* Map over each row in the result */}
                {result.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {/* Map over each cell in the row */}
                    {row.map((cell, cellIndex) => (
                      <td aria-label="Row" key={cellIndex}>
                        {" "}
                        <span
                          style={{ display: "none" }}
                        >{`Row ${cellIndex}`}</span>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p aria-label="Result">Result: {result}</p> // Display result as a string if it's not an array
          )}
        </div>
      ))}
    </div>
  );
}
