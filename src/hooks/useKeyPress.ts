import { useEffect } from "react";
import { useScriptideContext } from "../contexts/ScriptideProvider";

const useKeyPress = function (targetKey:any) {
  const { keyPressed, setKeyPressed } = useScriptideContext();

  function downHandler({ key }:any) {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ key }:any) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", downHandler);
    document.addEventListener("keyup", upHandler);

    return () => {
      document.removeEventListener("keydown", downHandler);
      document.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
};

export default useKeyPress;