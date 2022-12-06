import React from "react";

import { useScriptideContext } from "../contexts/ScriptideProvider";

export default function MicrophoneIcon() {
  const { isClicked, setIsClicked } = useScriptideContext();

  return <>{isClicked ? <Microphone muted /> : <Microphone />}</>;
}
