import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { CommandFunctionMap } from "./REPLFunction";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export default function REPL() {
  // TODO: Add some kind of shared state that holds all the commands submitted.
  const [history, setHistory] = useState<
    { command: string; result: string | string[][] }[]
  >([]);
  const [mode, setMode] = useState<string>("brief");
  const [filePath, setFilePath] = useState<string>("");
  const [mockedJson, setMockedJson] = useState<string[][]>([]);
  const [commandFunctionMap, setCommandFunctionMap] =
    useState<CommandFunctionMap>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [fileContents, setFileContents] = useState<string[][]>([]);
  const [displayOutput, setDisplayOutput] = useState<
    Array<[string, string | string[][]]>
  >([]);

  return (
    <div className="repl">
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* TODO: Update your REPLHistory and REPLInput to take in new shared state as props */}
      <REPLHistory
        history={history}
        fileContents={fileContents}
        setHistory={setHistory}
        setMode={setMode}
        setIsLoaded={setIsLoaded}
        setFileContents={setFileContents}
        setCommandFunctionMap={setCommandFunctionMap}
        setDisplayOutput={setDisplayOutput}
        setMockedJson={setMockedJson}
        mode={mode}
        displayOutput={displayOutput}
        filePath={filePath}
        isLoaded={isLoaded}
        commandFunctionMap={commandFunctionMap}
        mockedJson={mockedJson}
        setFilePath={setFilePath}
      />
      <hr></hr>
      <REPLInput
        history={history}
        fileContents={fileContents}
        setHistory={setHistory}
        setMode={setMode}
        setIsLoaded={setIsLoaded}
        setFileContents={setFileContents}
        setCommandFunctionMap={setCommandFunctionMap}
        setDisplayOutput={setDisplayOutput}
        setMockedJson={setMockedJson}
        mode={mode}
        displayOutput={displayOutput}
        filePath={filePath}
        isLoaded={isLoaded}
        commandFunctionMap={commandFunctionMap}
        mockedJson={mockedJson}
        setFilePath={setFilePath}
      />
    </div>
  );
}
