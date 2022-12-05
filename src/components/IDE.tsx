import Editor from "@monaco-editor/react";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useScriptideContext } from "../contexts/ScriptideProvider";

import "../App.css";
import useKeyPress from "../hooks/useKeyPress";
import { showErrorToast, showSuccessToast } from "../utils/apiServices.js";
import { LanguageDropdown } from "./LanguageDropdown";
import { OutputWindow } from "./OutputWindow";
import { ThemeDropdown } from "./ThemeDropdown";

//liveblocks

import { useMutation, useStorage } from "../liveblocks.config.js";

export function IDE({ currentUserId }) {
  const submissions = import.meta.env.VITE_RAPIDAPI_SUBMISSIONS;
  const host = import.meta.env.VITE_RAPIDAPI_HOST;
  const key = import.meta.env.VITE_RAPIDAPI_KEY;

  const {
    setProcessing,
    language,
    code,
    setCode,
    theme,
    outputDetails,
    setOutputDetails,
    userIsLocked,
    thisUser,
    initiator,
  } = useScriptideContext();

  const editorRef = useRef<typeof Editor | null>(null);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = monaco;
  }

  function onChange(action: any, data: any) {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled: ", action, data);
      }
    }
  }

  function handleCompile() {
    //@ts-ignore
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(""),
    };
    console.log(formData);
    const options = {
      method: "POST",
      url: submissions,
      params: { base64_encoded: true, fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": host,
        "X-RapidAPI-KEY": key,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response: { data: { token: any } }) {
        console.log("res.data: ", response.data);
        const token = response.data.token;
        console.log("token: ", token);
        checkStatus(token);
      })
      .catch((err: { response: { data: any } }) => {
        console.log(options);
        let error = err.response ? err.response.data : err;
        //@ts-ignore
        setProcessing(false);
        console.log({ error });
      });
  }

  async function checkStatus(token: string) {
    const options = {
      method: "GET",
      url: submissions + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": host,
        "X-RapidAPI-Key": key,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        //@ts-ignore
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      //@ts-ignore
      setProcessing(false);
      showErrorToast(err);
    }
  }

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enter: ", enterPress);
      console.log("control: ", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  function handleChange(value: any) {
    updateIDE("content", value);
  }

  //liveblocks

  const ide = useStorage((root: any) => root.ide);

  // Define mutation

  const updateIDE = useMutation(
    ({ storage }: any, property: string, newData: string) => {
      const mutableIDE = storage.get("ide");
      mutableIDE.set(property, newData);
    },
    []
  );

  return (
    <>
      <Editor
        height="65vh"
        width="74vw"
        onMount={handleEditorDidMount}
        onChange={handleChange}
        language={language?.value}
        value={ide.content}
        theme={theme.value}
      />

      <div className="ide-output">
        <button className="ide-run-btn" onClick={handleCompile}>
          Run
        </button>
        <OutputWindow outputDetails={outputDetails} />
      </div>
      <div className="theme-bar">
        <ThemeDropdown />
        <LanguageDropdown />
      </div>
      {thisUser === initiator ? (
        <></>
      ) : (
        <>
          {userIsLocked ? (
            <div id="lock" className="shield-up">
              {/* <div className="unlocked"></div> */}
              <img
                style={{ height: "80px", width: "80px", position: "relative" }}
                src="src/assets/lock.png"
              />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
