import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./LoginButton";
import REPL from "./REPL";

/**
 * This is the highest level component!
 */

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("brief");

  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </p>
      {/* <div>Current Mode: {mode}</div> */}
      {isLoggedIn && <REPL />}
    </div>
  );
}

export default App;
