import "./ExcalComponent.css";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useScriptideContext } from "../../contexts/ScriptideProvider";
import { Flex } from "amazon-chime-sdk-component-library-react";
import { centerScrollOn } from "@excalidraw/excalidraw/types/scene/scroll";

function ExcalComponent() {
  const { excalActive, transitionState, opacity, setOpacity } = useScriptideContext();

  return (
    <>
      <div className="hider-container">
        <div className={`hider ${transitionState ? "open" : "closed"} ${opacity ? "opaque" : "transparent"}`}>
         
        </div>
      </div>

      <div className={excalActive ? "excal-open" : "excal-closed"}>
        <div className="excalibox">
          <Excalidraw />
        </div>
      </div>
    </>
  );
}

export default ExcalComponent;
