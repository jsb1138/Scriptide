import ReactDOM from "react-dom/client";
import App from "./App";
import ScriptideProvider from "./contexts/ScriptideProvider";
import "./index.css";

///////////////////////////////////////////////////////////liveblocks
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveObject, LiveList } from "@liveblocks/client";
import { RoomProvider } from "./liveblocks.config.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <RoomProvider
    //Meeting ID will get clogged after a while
    //If this goes live this will have to be changed to play nice
      id="12678900345"
      initialPresence={{ cursor: null }}
      initialStorage={{
        ide: new LiveObject({
          content: "// happy coding",
        }),
        raisedHandsX: new LiveList([]),
      }}
    >
      <ClientSideSuspense
        fallback={
          <div id="center-flex">
            <h3>Loading Scriptide</h3>
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
