export interface REPLFunction {
  (args: Array<string>): String | String[][];
}

export function REPLExport(props: REPLFunction, commandString: string) {
  let load_file: REPLFunction;
  let view: REPLFunction;
  let search: REPLFunction;
  // each command is of type REPLFunction
  // lambda statement that lets it take in args as an array of strings
  // returns the various responses
  load_file = (args) => (args = []);
  // set the file Path args[1]
  // return a result message
}
