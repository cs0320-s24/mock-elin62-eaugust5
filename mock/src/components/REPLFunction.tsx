import { Dispatch, SetStateAction } from "react";
import { REPLInput } from "./REPLInput";
import { mockedJson } from "./mock_data/mockedJson";

export interface REPLFunctionProps {
  mode: string;
  isLoaded: boolean;
  filePath: string;
  fileContents: string[][];
  mockedJson: string[][];
  displayOutput: [];
  setMode: Dispatch<SetStateAction<string>>;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
  setFilePath: Dispatch<SetStateAction<string>>;
  setFileContents: Dispatch<SetStateAction<string[][]>>;
  setMockedJson: Dispatch<SetStateAction<string[][]>>;
}

export type CommandFunctionMap = {
  [key: string]: (args: string[]) => string | string[][];
};

export interface REPLFunction {
  (args: Array<string>): String | String[][];
}

export function REPLExport(
  props: REPLFunctionProps,
  commandString: string,
  args: string[]
) {
  //   let load_file: REPLFunction;
  //   let view: REPLFunction;
  //   let search: REPLFunction;
  //   // each command is of type REPLFunction
  //   // lambda statement that lets it take in args as an array of strings
  //   // returns the various responses
  //   load_file = (args) => ;
  //   // set the file Path args[1]
  //   // return a result message
  let fileLoaded = false;

  const loadFile = (args: string[]) => {
    console.log(args[0]);
    const filePath = args[0];
    if (filePath) {
      // const newFileContents = mockedJson.get(filePath) || [];
      fileLoaded = true;
      return `Loaded file: ${filePath}`;
    } else {
      return `Error loading file`;
    }
  };

  const view = (): string | string[][] => {
    if (fileLoaded) {
      return props.fileContents;
    } else {
      return `Data unable to be viewed.`;
    }
  };

  const search = (args: string[]) => {
    const column = args[0];
    const value = args[1];
    let emptyRows = [];
    let matchingRows = ["The", "song", "remains", "the", "same."];
    if ((emptyRows = [])) {
      return `No matching rows were found for ${value} in ${column}.`;
    } else {
      return matchingRows;
    }
  };

  const commandFunctionMap: CommandFunctionMap = {
    load_file: () => loadFile(args),
    view: () => view(),
  };
}



// switch (commandString) {
//   case "mode":
//     const newMode = props.mode === "brief" ? "verbose" : "brief";
//     console.log(newMode);
//     props.setMode(newMode); // Update mode immediately
//     return `Switched to ${newMode} mode.`;
//   case "load_file":
//     return loadFile(args);
//   case "view":
//     return view();
//   case "search":
//     return search(args);
//   // Add more commands here as needed
//   default:
//     return "Command not recognized";
// }

// export function search(args: string[]) {
//   const column = args[0];
//   const value = args[1];
//   const matchingRows = [];
//   // Logic to search for value in column
//   return `Searching for ${value} in column ${column}`;
// }
