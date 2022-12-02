import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ScriptideProvider from "./contexts/ScriptideProvider";
import "./index.css";

///////////////////////////////////////////////////////////liveblocks
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "./liveblocks.config.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <RoomProvider id="meetingName!" initialPresence={{ cursor: null }}>
      <ClientSideSuspense
        fallback={
          <div id="center-flex">
            <h3>
              Joining<code> SOME-MEETING </code>meeting
            </h3>
            <h3 className="ellipsis"></h3>
          </div>
        }
      >
        {() => (
          <ScriptideProvider>
            <App />
          </ScriptideProvider>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  </>
);
