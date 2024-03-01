import { Dispatch, SetStateAction, useState } from "react";
import { REPLInput } from "./REPLInput";
import { mockedJson } from "./mock_data/mockedJson";

export interface REPLFunctionProps {
  mode: string;
  isLoaded: boolean;
  filePath: string;
  fileContents: string[][];
  mockedJson: string[][];
  //   displayOutput: [];
  commandFunctionMap: CommandFunctionMap;
  setMode: Dispatch<SetStateAction<string>>;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
  setFilePath: Dispatch<SetStateAction<string>>;
  setFileContents: Dispatch<SetStateAction<string[][]>>;
  setMockedJson: Dispatch<SetStateAction<string[][]>>;
  setCommandFunctionMap: Dispatch<SetStateAction<CommandFunctionMap>>;
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
): CommandFunctionMap {
  //   let load_file: REPLFunction;
  //   let view: REPLFunction;
  //   let search: REPLFunction;
  //   // each command is of type REPLFunction
  //   // lambda statement that lets it take in args as an array of strings
  //   // returns the various responses
  //   load_file = (args) => ;
  //   // set the file Path args[1]
  //   // return a result message
  let fileContents = [];
  let fileLoaded: boolean;

  const loadFile = (args: string[]): string => {
    const filePath = args[0];
    props.setFilePath(filePath);
    const newFileContents = mockedJson.get(filePath);
    if (newFileContents) {
      console.log("is it reaching in here");
      props.setFileContents(newFileContents);
      console.log(props.fileContents);
    }
    console.log(props.fileContents);
    if (filePath) {
      // const newFileContents = mockedJson.get(filePath);
      fileLoaded = true;
      // const newFileContents = mockedJson.get(filePath) || [];
      //fileLoaded = true;
      //props.isLoaded = fileLoaded;

      console.log(props.fileContents);
      return `Loaded file: ${filePath}`;
    }
    return `Error loading file.`;
  };

  const view = (): string | string[][] => {
    console.log(props.fileContents);
    console.log(props.filePath);
    console.log(fileLoaded);
    if (props.filePath != null) {
      console.log("Is it getting into here?");
      return props.fileContents;
    } else {
      return `Data unable to be viewed.`;
    }
  };

  const search = (args: string[]): string | string[] => {
    const column = args[0];
    const value = args[1];
    let emptyRows = [];
    let matchingRows = ["The", "song", "remains", "the", "same."];
    if (column != "The" && value != "song") {
      return `No matching rows were found for ${value} in ${column}.`;
    } else {
      return matchingRows;
    }
  };

  //   props.setCommandFunctionMap((prevState) => {
  //     const newCommandFunctionMap = { ...prevState };
  //     newCommandFunctionMap.load_file = () => loadFile(args);
  //     newCommandFunctionMap.view = () => view();
  //     return newCommandFunctionMap;
  //   });

  const updateCommandFunctionMap = (): CommandFunctionMap => ({
    ...props.commandFunctionMap,
    load_file: loadFile,
    view: view,
    //search: search,
  });

  const updatedCommandFunctionMap = updateCommandFunctionMap();

  // Set the updated commandFunctionMap
  //   props.setCommandFunctionMap(updatedCommandFunctionMap);

  return updatedCommandFunctionMap; // Return the updated commandFunctionMap
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
