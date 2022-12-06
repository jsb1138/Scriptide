import "./ExcalComponent.css";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useScriptideContext } from "../../contexts/ScriptideProvider";

function ExcalComponent() {
  const { excalActive, transitionState, opacity, excalState, setExcalState } =
    useScriptideContext();

  return (
    <>
      <div className="hider-container">
        <div
          className={`hider ${transitionState ? "open" : "closed"} 
          ${
            opacity ? "opaque" : "transparent"
          }`}
        ></div>
      </div>
      {excalActive && (
        <div className="excal-open">
          <div className="excalibox ">
            <Excalidraw
              initialData={{
                elements: excalState,
              }}
              onChange={(elements, appState, files) => {
                setExcalState(elements);
                console.log(excalState);
                // console.log('elements', JSON.stringify(elements));
                // console.log('appState', JSON.stringify(appState));
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ExcalComponent;
