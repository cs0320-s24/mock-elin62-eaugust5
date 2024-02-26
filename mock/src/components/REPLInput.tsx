import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { stdout } from "process";

interface REPLInputProps {
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
  history: string[];
  loaded_file: string;
  mode: string;
  command: string;
  result: string;
  isLoaded: boolean;
  filePath: string;

  setCommand: Dispatch<SetStateAction<string>>;
  setResult: Dispatch<SetStateAction<string[]>>;
  setMode: Dispatch<SetStateAction<string>>;
  setHistory: Dispatch<SetStateAction<string[]>>;
  setCommandResults: Dispatch<SetStateAction<Map<string, string>>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  // TODO WITH TA : add a count state
  const [count, setCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [filePath, setFilePath] = useState<string>("");
  const [loadedFilePath, setLoadedFilePath] = useState<string>("");

  const [mode, setMode] = useState<string>("brief");
  const [command, setCommand] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [map, setMap] = useState(new Map());

  const updateMap = () => {
    setMap(
      (map) => new Map(map.set("load_file", load_file(commandString, filePath)))
    );
    setMap((map) => new Map(map.set("mode", changeMode)));
    // setMap((map) => new Map(map.set("view", view_file));
    //setMap((map) => new Map(map.set("search", search_file)));
    // For new additions:
    // setMap((map) => new Map(map.set(key, func)));
  };

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
  // function changeMode(props: REPLInputProps) {
  //   return (
  //     <h1>
  //       Mode, {props.mode} setMode={setMode}
  //     </h1>
  //   );
  // }

  function load_file(command: string, filePath: string) {
    // console.log("inside load_file");
    if (command === "load_file") {
      if (filePath != null) {
        setFilePath(filePath);
        setIsLoaded(true);
      }
    }
  }

  function changeMode(commandString: string) {
    if (mode === "brief") {
      //console.log("should be verbose");
      setMode("verbose");
    } else {
      //console.log("should be brief");
      setMode("brief");
    }
  }

  function handleSubmit(commandString: string) {
    const [command, arg] = commandString.split(/\s+(.+)/); // Split at the first space
    // const [command, arg] = commandString.split(" ");
    let result = "";
    switch (command) {
      case "mode":
        setMode(mode === "brief" ? "verbose" : "brief"); // Toggle mode
        result = `Switched to ${mode === "brief" ? "verbose" : "brief"} mode.`;
        break;
      case "load_file":
        setLoadedFilePath(arg || "");
        result = `Loaded file: ${arg}`;
        break;
      case "view":
        if (loadedFilePath) {
          // Assume CSV data retrieval logic here
          result = `Viewing contents of file: ${loadedFilePath}`;
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
      `${commandString} => ${result}`,
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
          console.log(mode);
          console.log(loadedFilePath);
          console.log(props.history);
          console.log(props.result);
          console.log(props.command);

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
