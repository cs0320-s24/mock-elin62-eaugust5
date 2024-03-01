export interface REPLFunctionProps {
  mode: string;
}

export interface REPLFunction {
  (args: Array<string>, mode: string): String | String[][];
}

export function REPLExport(commandString: string, args: string[]) {
  //   let load_file: REPLFunction;
  //   let view: REPLFunction;
  //   let search: REPLFunction;
  //   // each command is of type REPLFunction
  //   // lambda statement that lets it take in args as an array of strings
  //   // returns the various responses
  //   load_file = (args) => ;
  //   // set the file Path args[1]
  //   // return a result message

  switch (commandString) {
    case "mode":
      return;
    case "load_file":
      return loadFile(args);
    case "view":
      return view();
    case "search":
      return search(args);
    // Add more commands here as needed
    default:
      return "Command not recognized";
  }
  // Add more commands here as needed
}

export function loadFile(args: string[]) {
  const filePath = args[0];
  // Logic to load CSV file at filePath
  return `Loaded file: ${filePath}`;
}

export function view(): string | string[][] {
  // Logic to display full CSV data
  return "Displaying full CSV data";
}

export function search(args: string[]) {
  const column = args[0];
  const value = args[1];
  // Logic to search for value in column
  return `Searching for ${value} in column ${column}`;
}
