import { Dispatch, SetStateAction } from "react";
import { mockedJson } from "./mock_data/mockedJson";

/**
 * This class' main purpose is to register commands that are to be
 * executed in handleSubmit in REPLInput. A Developer is able to add their own
 * functions into the REPLExport function and register them in the
 * updateCommandFunctionMap() function inside of REPLExport.
 */

export interface REPLFunctionProps {
  mode: string;
  isLoaded: boolean;
  filePath: string;
  fileContents: string[][];
  mockedJson: string[][];
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
): CommandFunctionMap {
  const changeMode = (): string => {
    const newMode = props.mode === "brief" ? "verbose" : "brief";
    props.setMode(newMode); // Update mode
    console.log(props.mode);
    return `mode switched to ${newMode}`;
  };

  // loads a file and sets fileContents with the CSV data for that file
  const loadFile = (args: string[]): string => {
    const filePath = args[0];
    props.setFilePath(filePath);
    const newFileContents = mockedJson.get(filePath);
    if (newFileContents) {
      props.setFileContents(newFileContents);
    }
    if (filePath) {
      console.log(props.fileContents);
      return `Loaded file: ${filePath}`;
    }
    return `Error loading file.`;
  };

  // views a loaded file
  const view = (): string | string[][] => {
    if (props.filePath != null) {
      const newFileContents = mockedJson.get(props.filePath);
      if (newFileContents) {
        return newFileContents;
      }
    } else {
      return `Data unable to be viewed.`;
    }
    return `Error viewing file.`;
  };

  // searches for matching rows depending on whether or not
  const search = (args: string[]): string | string[][] => {
    const column = args[0];
    const value = args[1];
    let matchingRows = [["The", "song", "remains", "the", "same."]];
    if (column != "The" && value != "song") {
      return `No matching rows were found for ${value} in ${column}.`;
    } else {
      return matchingRows;
    }
  };

  /* Register a function executable here */
  /* const exampleFunction = (parameters): type => {} */

  // A function that updates the commandFunctionMap
  const updateCommandFunctionMap = (): CommandFunctionMap => ({
    ...props.commandFunctionMap,
    load_file: loadFile,
    view: view,
    search: search,
    mode: changeMode,
    /* register a created function here */
    /* command: executeCommand */
  });

  const updatedCommandFunctionMap = updateCommandFunctionMap();

  return updatedCommandFunctionMap; // Return the updated commandFunctionMap
}
