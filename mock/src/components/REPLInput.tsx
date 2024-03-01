import "../styles/main.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import "../components/mock_data/mockedJson";
import { mockedJson } from "./mock_data/mockedJson"; // Import example CSV data
import { stdout } from "process";
import { REPLHistory } from "./REPLHistory";
import { REPLExport, REPLFunction } from "./REPLFunction";

interface REPLInputProps {
  // map string to REPLfunction
  // use state for mode
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  setMode: Dispatch<SetStateAction<string>>;
  displayOutput: []; // holds command and output, index at [1] if brief
  mode: string;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // const [filePath, setFilePath] = useState<string>("");
  // const [filePath, setFilePath] = useEffect("");

  // const [mode, setMode] = useState<string>("brief");

  // const [command, setCommand] = useState<string>("");
  // const [result, setResult] = useState<string>("");
  // const [map, setMap] = useState(new Map());
  // const [dataTable, setDataTable] = useState<string[][]>([]);
  // const [fileContents, setFileContents] = useState<string[][]>([]);

  // const [tableVisible, setTableVisible] = useState<boolean>(false); // Initialize boolean state

  // }

  // TODO WITH TA: build a handleSubmit function called in button onClick
  // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
  // add to it with new commands.
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */

  function handleSubmit(commandString: string) {
    if (commandString == "mode") {
      if (props.mode == "brief") {
        props.setMode("verbose");
      }
      else {
        props.setMode("brief");
      }
    }

    REPLExport()
    const [command, ...args] = commandString.split(/\s+/); // split at each space
    const result = "";

    props.setHistory((history) => [...history, `${command} => ${result}`]);
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
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button
        aria-label={"Submit"}
        onClick={() => {
          handleSubmit(commandString);
          // console.log(dataTable);
        }}
      >
        Submit {count} times!
      </button>
    </div>
  );
}
