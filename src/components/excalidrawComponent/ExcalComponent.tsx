import './ExcalComponent.css';
import { Excalidraw } from "@excalidraw/excalidraw";
import {useScriptideContext} from "../../contexts/ScriptideProvider"

function ExcalComponent() {
  const {excalActive} = useScriptideContext();

  return (
    <div className={excalActive ? "center-flex excal-open" : "excal-closed"}>
      <Excalidraw />
    </div>
  );
}

export default ExcalComponent;
