import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import "../components/mock_data/mockedJson";
import { REPLExport, CommandFunctionMap } from "./REPLFunction";

/**
 * This class' main purpose is to allow users to input commands, submit them, and display the output.
 * This component manages state for command input, history, mode, file loading, and output display.
 * It also handles the execution of commands through the provided command function map.
 */

export interface REPLInputProps {
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
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */

  function handleSubmit(commandString: string) {
    const [command, ...args] = commandString.split(/\s+/); // Split at each space
    const commandMap = REPLExport(props);
    const commandFunction = commandMap[command];
    const result: string | string[][] = commandFunction
      ? commandFunction(args)
      : "Command not recognized";
    const newDisplayOutput: [string, string | string[][]] = [command, result];
    props.setDisplayOutput((prevDisplayOutput) => [
      ...prevDisplayOutput,
      newDisplayOutput,
    ]);

    props.setHistory((history) => [...history, { command, result }]);
    setCount(count + 1);
    setCommandString("");
  }

  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button
        aria-label={"Submit"}
        onClick={() => {
          handleSubmit(commandString);
        }}
      >
        Submit {count} times!
      </button>
    </div>
  );
}
