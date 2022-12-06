import "./ExcalComponent.css";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useScriptideContext } from "../../contexts/ScriptideProvider";
import { Flex } from "amazon-chime-sdk-component-library-react";
import { centerScrollOn } from "@excalidraw/excalidraw/types/scene/scroll";
import { useEffect, useRef, useState } from "react";

//liveblocks

import { useMutation, useStorage } from "../../liveblocks.config.js";

function ExcalComponent() {
  const { excalActive, transitionState, opacity, setOpacity } =
    useScriptideContext();
  const [elements, setElements] = useState([] as any);
  const [changer, setChanger] = useState([] as any);
  //liveblocks
  const [initialData, setInitialData] = useState() as any;
  const canvas = useStorage((root: any) => root.excalidrawCanvas);
  // console.log("the CANVAS -->>>>>>>>", canvas);
  console.log("the CANVAS state -->>>>>>>>", canvas.state);

  // // Define mutation

  // const handleUpdate = (newState) => {
  //   console.log("new state -->>>>>>>>", newState);
  //   updateExcal("state", newState);
  //   return true;
  // };

  // const updateCanvas = useMutation(
  //   ({ storage }: any, property: any, newCanvasState: any) => {
  //     const mutableCanvas = storage.get("excalidrawCanvas");
  //     mutableCanvas.set(property, newCanvasState);
  //   },
  //   []
  // );

  // const updateExcal = useMutation(
  //   ({ storage }: any, prop: string, newExcalState: any) => {
  //     const mutableCanvasData = storage.get("excalidrawCanvas");
  //     console.log("NEW CANVAS FROM LIVEBLOCKS", mutableCanvasData);
  //     mutableCanvasData.set(prop, newExcalState);
  //   },
  //   []
  // );

  // useEffect(() => {
  //   console.log("re rendered");
  //   setInitialData({ elements: canvas.state });
  // }, [canvas.state.length]);

  // const excaliRef = useRef();

  // setInterval(() => {
  //   console.log("XXXXXXXXX");
  //   setInitialData({ elements: canvas.state });
  //   updateScene(canvas.state);
  // }, 1000);
  // const updateScene = (sceneData) => {
  //   excaliRef.current.updateScene(sceneData);
  // };

  return (
    <>
      <div className="hider-container">
        <div
          className={`hider ${transitionState ? "open" : "closed"} ${
            opacity ? "opaque" : "transparent"
          }`}
        ></div>
      </div>
      <div className={excalActive ? "excal-open" : "excal-closed"}>
        <div className="excalibox">
          <Excalidraw
            initialData={initialData}
            onChange={(data) => {
              console.log("data in update: ", data);
              // setTimeout(() => {
              // if (data !== elements) {
              //   console.log("trigger");
              //   handleUpdate(data);
              //   setElements(data);
              //   updateScene(data);
              // }
              // }, 20000);
              // updateScene(canvas.state);
              // console.log("Canvas State------->", canvas.state);
              // console.log("data ------->", data);
              // console.log("canvas ------->", canvas);
            }}
            // ref={excaliRef}
            // updateScene={(scene) => {
            //   console.log("THE SCENE-->", scene);
            //   scene = canvas.state;
            // }}
          />
        </div>
      </div>
    </>
  );
}

export default ExcalComponent;
