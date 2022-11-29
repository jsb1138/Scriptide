import React from "react";
import { useScriptideContext } from "../contexts/ScriptideProvider";
import { IDE } from "./IDE";

interface Props {
  hole: string;
}

export default function Porthole(props: Props) {
  const {
    camActive,
    setCamActive,
    ideActive,
    setIdeActive,
    gridActive,
    setGridActive,
  } = useScriptideContext();
  const { hole } = props;

  const active =
    hole === "cam" ? camActive : hole === "grid" ? gridActive : ideActive;

  function handClick() {
    switch (hole) {
      case "cam":
        handleCamClick();
        break;
      case "ide":
        handleIdeClick();
        break;
      case "grid":
        handleGridClick();
        break;
      default:
        return false;
    }
  }
  const handleCamClick = () => {
    if (ideActive) {
      setIdeActive(!ideActive);
      setCamActive(!camActive);
    }
    if (gridActive) {
      setGridActive(!gridActive);
      setCamActive(!camActive);
    } else {
      setCamActive(!camActive);
    }
  };

  const handleIdeClick = () => {
    if (camActive) {
      setIdeActive(!ideActive);
      setCamActive(!camActive);
    }
    if (gridActive) {
      setGridActive(!gridActive);
      setIdeActive(!ideActive);
    } else {
      setIdeActive(!ideActive);
    }
  };

  const handleGridClick = () => {
    if (camActive) {
      setGridActive(!gridActive);
      setCamActive(!camActive);
    }
    if (ideActive) {
      setGridActive(!gridActive);
      setIdeActive(!ideActive);
    } else {
      setGridActive(!gridActive);
    }
  };

  return (
    <div
      onClick={handClick}
      id={active ? `${hole}-view-open` : `${hole}-view-closed`}
    >
      {hole === "ide" ? <IDE /> : <h1>{hole.toUpperCase()}</h1>}
    </div>
  );
}
