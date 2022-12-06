import { useScriptideContext } from "./contexts/ScriptideProvider";

import { window as tauriWindow } from "@tauri-apps/api";

////////////////////////////////////////////////////////chimeintegration -> TODO
import { ThemeProvider } from "styled-components";
import {
  MeetingProvider,
  lightTheme,
} from "amazon-chime-sdk-component-library-react";
import Meeting from "./components/Meeting/Meeting";
import MeetingForm from "./components/MeetingForm/MeetingForm";

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

  const noDragSelector = "input, a, button, #ide-view-open, .excalibox, .menu-item, #cam-view-close, #ide-view-closed, #grid-view-closed, #cam-view-open, #grid-view-open";

  document.addEventListener("mousedown", async (mouseDown: any) => {
    if (mouseDown.target.closest(noDragSelector)) {
      return;
    }
    await tauriWindow.appWindow.startDragging();
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////liveblocks

  const others = useOthers();

  return (
    <div data-tauri-drag-region>
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
