import "./ExcalComponent.css";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useScriptideContext } from "../../contexts/ScriptideProvider";

function ExcalComponent() {
  const { excalActive, transitionState, setExcalState, excalState } =
    useScriptideContext();
  return (
    <>
      {excalActive && (
        <div className="excal-open">
          <div className="excalibox ">
            <Excalidraw
              initialData={{
                elements: excalState,
              }}
              onChange={(elements, appState, files) => {
                setExcalState(elements);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ExcalComponent;
