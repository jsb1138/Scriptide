import "./ExcalComponent.css";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useScriptideContext } from "../../contexts/ScriptideProvider";

function ExcalComponent() {
  const { excalActive, transitionState, opacity, excalState, setExcalState } =
    useScriptideContext();

  return excalActive ? (
        <>
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
    </>
  ) : (
    <>
    <div className="excal-closed">
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
  </>
)
}

export default ExcalComponent;
