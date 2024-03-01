import { useState } from "react";
import "../styles/App.css";
import { LoginButton } from "./LoginButton";
import { Mode } from "./Mode";
import REPL from "./REPL";

/**
 * This is the highest level component!
 */

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="App">
      <p className="App-header">
        <h1>Mock</h1>
        <LoginButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </p>
      {/* <*Mode mode={mode} setMode={setMode}/> */}
      {isLoggedIn && <REPL />}
    </div>
  );
}

export default App;
