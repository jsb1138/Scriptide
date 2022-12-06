import { useScriptideContext } from "./contexts/ScriptideProvider";

import { window as tauriWindow } from "@tauri-apps/api";

////////////////////////////////////////////////////////chimeintegration -> TODO
import { ThemeProvider } from "styled-components";
import {
  MeetingProvider,
  lightTheme,
} from "amazon-chime-sdk-component-library-react";
import Meeting from "./components/Meeting";
import MeetingForm from "./components/MeetingForm";

import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
// @ts-ignore
Amplify.configure(awsconfig);

//////////////////////////////////////////////////////////////////////liveblocks
import { useOthers, useUpdateMyPresence } from "./liveblocks.config.js";

//css
import "./App.css";

//utility
import { defineTheme } from "./lib/defineTheme.js";

export default function App() {
  const { meetingActive } = useScriptideContext();

  const updateMyPresence = useUpdateMyPresence();

  const noDragSelector = "input, a, button, #ide-view-open, .excalibox";

  document.addEventListener("mousedown", async (mouseDown: any) => {
    if (mouseDown.target.closest(noDragSelector)) {
      return;
    }
    await tauriWindow.appWindow.startDragging();
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////liveblocks
  // @ts-ignore
  function Cursor({ x, y }) {
    return (
      <img
        style={{
          position: "absolute",
          transform: `translate(${x}px, ${y}px)`,
          height: "15px",
          width: "15px",
        }}
        src="src/assets/fly.png"
      />
    );
  }

  const others = useOthers();

  return (
    // <div data-tauri-drag-region>
    <div
      className="App"
      style={{ width: "100vw", height: "100vh" }}
      onPointerMove={(e) =>
        updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
      }
      onPointerLeave={() => updateMyPresence({ cursor: null })}
    >
      {/* @ts-ignore */}
      {others.map(({ connectionId, presence }) =>
        presence.cursor ? (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        ) : null
      )}
      <ThemeProvider theme={lightTheme}>
        {/* @ts-ignore */}
        <MeetingProvider>
          {!meetingActive ? (
            <div id="center-flex">
              <MeetingForm />
            </div>
          ) : (
            <Meeting />
          )}
        </MeetingProvider>
      </ThemeProvider>
    </div>
  );
}
