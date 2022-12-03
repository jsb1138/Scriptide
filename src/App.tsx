import { useState } from "react";
import { useScriptideContext } from "./contexts/ScriptideProvider";

// context
import ScriptideProvider from "./contexts/ScriptideProvider";

//components
import { IDE } from "./components/IDE";
import { OutputWindow } from "./components/OutputWindow";
import { OutputDetails } from "./components/OutputDetails";
import Porthole from "./components/Porthole";
import { ThemeDropdown } from "./components/ThemeDropdown";
import { LanguageDropdown } from "./components/LanguageDropdown";
import { SideBar } from "./components/SideBar";

//dependencies
import React, { useEffect, SetStateAction } from "react";
import axios from "axios";
import { invoke } from "@tauri-apps/api";
import { ToastContainer, toast } from "react-toastify";
import { window as tauriWindow } from "@tauri-apps/api";

////////////////////////////////////////////////////////chimeintegration -> TODO
import { ThemeProvider } from "styled-components";
import {
  MeetingProvider,
  lightTheme,
  NotificationProvider,
  useNotificationDispatch,
  ActionType,
  Severity,
  // useLocalVideo
} from "amazon-chime-sdk-component-library-react";
import MeetingContainer from "./components/MeetingContainer";
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
import { languageOptions } from "./constants/languageOptions";
import { defineTheme } from "./lib/defineTheme.js";
import useKeyPress from "./hooks/useKeyPress";
import NavBar from "./components/navBarComponents/NavBar";
import { handleCompile } from "./utils/apiServices.js";

//constants
const submissions = import.meta.env.VITE_RAPIDAPI_SUBMISSIONS;
const host = import.meta.env.VITE_RAPIDAPI_HOST;
const key = import.meta.env.VITE_RAPIDAPI_KEY;

export default function App() {
  const {
    // processing,
    setProcessing,
    language,
    setLanguage,
    code,
    setCode,
    theme,
    setTheme,
    meetingActive,
    menuState,
    setMenuState,
  } = useScriptideContext();

  const updateMyPresence = useUpdateMyPresence();

  // const { tileId, isVideoEnabled, hasReachedVideoLimit, toggleVideo } = useLocalVideo();

  // const enterPress = useKeyPress("Enter");
  // const ctrlPress = useKeyPress("Control");

  const noDragSelector = "input, a, button, #ide-view-open, .excalibox";
  document.addEventListener("mousedown", async (mouseDown: any) => {
    if (mouseDown.target.closest(noDragSelector)) {
      return;
    }
    await tauriWindow.appWindow.startDragging();
  });

  function handleThemeChange(th: any) {
    const theme = th;
    console.log("theme: ", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_: any) => setTheme(theme.value));
    }
  }

  const getLocalPreview = async () => {
    try {
      console.log("NAV", navigator);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      console.log("STREAM", stream);
      return stream;
    } catch (error) {
      //this is when user don't allow media devices
      console.log(error);
    }
  };

  const holes = ["cam", "ide", "grid"];

  // useEffect(() => {
  //   if (enterPress && ctrlPress) {
  //     console.log("enter: ", enterPress);
  //     console.log("control: ", ctrlPress);
  //     handleCompile();
  //   }
  // }, [ctrlPress, enterPress]);

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
        src="src/assets/cursor.png"
      />
    );
  }

  const others = useOthers();

  return (
    // <div data-tauri-drag-region>
    <div
      className="App"
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
