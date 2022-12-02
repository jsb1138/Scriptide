import React, { useState, useRef, useEffect, SetStateAction } from "react";
import { invoke } from "@tauri-apps/api";
import Editor from "@monaco-editor/react";
import { useScriptideContext } from "../contexts/ScriptideProvider";
import { toast } from "react-toastify";
import axios from "axios";

import "../App.css";
import { OutputWindow } from "./OutputWindow";
import useKeyPress from "../hooks/useKeyPress";
import { defineTheme } from "../lib/defineTheme.js";
import { showSuccessToast, showErrorToast } from "../utils/apiServices.js";

///////////////////////////////////////////////////////////liveblocks
import { useStorage, useMutation } from "../liveblocks.config.js";

export function IDE() {
  const submissions = import.meta.env.VITE_RAPIDAPI_SUBMISSIONS;
  const host = import.meta.env.VITE_RAPIDAPI_HOST;
  const key = import.meta.env.VITE_RAPIDAPI_KEY;

  const {
    processing,
    setProcessing,
    language,
    setLanguage,
    code,
    setCode,
    theme,
    setTheme,
    outputDetails,
    setOutputDetails,
  } = useScriptideContext();

  const [value, setValue] = useState(code || "");
  const editorRef = useRef<typeof Editor | null>(null);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = monaco;
  }

  function onSelectChange(select: SetStateAction<any>) {
    console.log("selected: ", select);
    setLanguage(select);
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

  function handleThemeChange(th: any) {
    const theme = th;
    console.log("theme: ", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_: any) => setTheme(theme.value));
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

  // invoke('greet', { name: 'World'}).then((response) => {console.log(response)})

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enter: ", enterPress);
      console.log("control: ", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  function handleChange(value: any) {
    updateIDE("content", value);
    setValue(value);
    // onChange("code", value);
  }

  ////////////////////////////////////////////////////////////////////////////////////////liveblocks
  const ide = useStorage((root) => root.ide);

  // Define mutation
  const updateIDE = useMutation(({ storage }, property, newData) => {
    const mutableIDE = storage.get("ide");
    mutableIDE.set(property, newData);
  }, []);

  console.log("ide storage", ide);
  // const handleIdeInput = () => {}

  return (
    <>
      <Editor
        height="65vh"
        width="74vw"
        onMount={handleEditorDidMount}
        onChange={handleChange}
        language={language?.value}
        value={ide.content}
        theme="vs-dark"
      />
      <div className="ide-output">
        <button className="ide-run-btn" onClick={handleCompile}>
          Run
        </button>
        <OutputWindow outputDetails={outputDetails} />
      </div>
    </>
  );
}
