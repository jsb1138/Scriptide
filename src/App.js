import "./App.css";
import { Amplify } from "aws-amplify";
// import awsExports from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import { useScriptideContext } from "./contexts/ScriptideProvider";

import "@aws-amplify/ui-react/styles.css";
// Amplify.configure(awsExports);

const startMeeting = () => {};

function App({ signOut, user }) {

  const { clicked, setClicked, camActive, setCamActive, ideActive, setIdeActive, gridActive, setGridActive  } = useScriptideContext();
  
  const handleCamClick = () => {
    if (ideActive) {
      setIdeActive(!ideActive);
      setCamActive(!camActive);
    }
    if (gridActive) {
      setGridActive(!gridActive);
      setCamActive(!camActive);
    } else {
      setCamActive(!camActive);
    }
  };

  const handleIdeClick = () => {
    if (camActive) {
      setIdeActive(!ideActive);
      setCamActive(!camActive);
    }
    if (gridActive) {
      setGridActive(!gridActive);
      setIdeActive(!ideActive);
    } else {
      setIdeActive(!ideActive);
    }
  };

  const handleGridClick = () => {
    if (camActive) {
      setGridActive(!gridActive);
      setCamActive(!camActive);
    }
    if (ideActive) {
      setGridActive(!gridActive);
      setIdeActive(!ideActive);
    } else {
      setGridActive(!gridActive);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={signOut}>Sign Out</button>
        <button onClick={startMeeting}>Start Meeting</button>
      </header>
      <div id="App-main">
        <div id="menu-container">
          <div id="menu">TEST</div>
          <button id="menu-btn">▸</button>
        </div>
        <div
          onClick={handleCamClick}
          id={camActive ? "cam-view-open" : "cam-view-closed"}
        >
          <h1>CAM</h1>
        </div>
        <div
          onClick={handleIdeClick}
          id={ideActive ? "ide-view-open" : "ide-view-closed"}
        >
          <h1>IDE</h1>
        </div>
        <div
          onClick={handleGridClick}
          id={gridActive ? "grid-view-open" : "grid-view-closed"}
        >
          <h1>GRID</h1>
        </div>
      </div>
    </div>
  );
}

export default withAuthenticator(App);
