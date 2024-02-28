import "../styles/main.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import "../components/mock_data/mockedJson";
import { mockedJson } from "./mock_data/mockedJson"; // Import example CSV data
import { stdout } from "process";
import { REPLHistory } from "./REPLHistory";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  history: string[];
  mode: string;
  command: string;
  result: string;
  isLoaded: boolean;
  filePath: string;

  setIsLoaded: Dispatch<SetStateAction<boolean>>;
  setCommand: Dispatch<SetStateAction<string>>;
  setResult: Dispatch<SetStateAction<string[]>>;
  setMode: Dispatch<SetStateAction<string>>;
  setHistory: Dispatch<SetStateAction<string[]>>;
  setCommandResults: Dispatch<SetStateAction<Map<string, string>>>;
  setSearchResults: Dispatch<SetStateAction<string[]>>;
  setMockedJson: Dispatch<SetStateAction<Map<string, string[][]>>>;
  // create a search command that holds the results from a given search term
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // const [mockedJson, setMockedJson] = useState<Map<string, string[][]>>(
  //   new Map(Object.entries(exampleCSVs))
  // );

  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [filePath, setFilePath] = useState<string>("");
  // const [filePath, setFilePath] = useEffect("");

  const [mode, setMode] = useState<string>("brief");
  const [command, setCommand] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [map, setMap] = useState(new Map());

  // Set mockedJson state when component mounts

  // const updateMap = () => {
  //   setMap(
  //     (map) => new Map(map.set("load_file", load_file(commandString, filePath)))
  //   );
  //   setMap((map) => new Map(map.set("mode", changeMode)));
  //   // setMap((map) => new Map(map.set("view", view_file));
  //   //setMap((map) => new Map(map.set("search", search_file)));
  //   // For new additions:
  //   // setMap((map) => new Map(map.set(key, func)));
  // };

  // function setMapEntries(commandString:string, result:string){
  //   props.setCommand(commandString);

  // }

  // TODO WITH TA: build a handleSubmit function called in button onClick
  // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
  // add to it with new commands.
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */

  function handleSubmit(commandString: string) {
    const [command, ...args] = commandString.split(/\s+/); // split at each space
    let result = "";
    let dataTable: string[][];
    switch (command) {
      case "mode":
        const newMode = mode === "brief" ? "verbose" : "brief";
        console.log(newMode);
        setMode(newMode); // Update mode immediately
        result = `Switched to ${newMode} mode.`;
        break;
      case "load_file":
        setFilePath(args[0] || "");
        // setFilePath(args[0] || "");
        console.log(filePath);
        if (filePath) {
          setIsLoaded(true);
          result = `Loaded file: ${filePath}`;
        } else {
          setIsLoaded(false);
          result = "No file loaded";
        }
        break;
      case "view":
        if (isLoaded) {
          console.log(filePath);
          const fileContents = mockedJson.get(filePath) || null;
          console.log(fileContents);
          if (fileContents) {
            result = `Viewing contents of file: ${filePath}`;
            dataTable = fileContents.map((x) => x.map((x) => x));
            console.log(dataTable);
          }
        } else {
          result = `File ${filePath} not found.`;
        }
        break;
      case "search":
        if (isLoaded) {
          result = `The following rows contain the searchterm (${args[1]}): `;
        } else {
          result = "No file loaded.";
        }
        break;
      default:
        result = `Command not recognized: ${command}`;
        break;
    }
    props.setHistory((history) => [
      ...history,
      `${command} => ${result} => ${dataTable}`,
    ]);
    setCount(count + 1);
    setCommandString("");
  }

  function splitCommandString(commandString: string) {
    var newArray = commandString.split(" ");
    return newArray;
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
          // updateMap();
          // let command = splitCommandString(commandString)[0];
          // let filePath = splitCommandString(commandString)[1];
          // let func = map.get(command);
          // if (map.has(command)) {
          //   func(command);
          // }
          // func(
          //   splitCommandString(commandString)[0],
          //   splitCommandString(commandString)[1]
          // );

          handleSubmit(commandString);

          // if brief:
          // print just the output for that given command

          // if verbose:
          // print the name of the command
          // print the result of the command
        }}
      >
        Submit {count} times!
      </button>
    </div>
  );
}
