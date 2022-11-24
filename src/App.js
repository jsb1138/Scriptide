import "./App.css";
// import { Amplify } from "aws-amplify";
// import awsExports from "./aws-exports";
// import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from "react";
import { useScriptideContext } from "./contexts/ScriptideProvider";
// import { languageOptions } from "./constants/languageOptions";
import "@aws-amplify/ui-react/styles.css";
import { loader } from '@monaco-editor/react'
// Amplify.configure(awsExports);

const startMeeting = () => {};

function App({ signOut, user }) {

  const { clicked, setClicked, camActive, setCamActive, ideActive, setIdeActive, gridActive, setGridActive, processing, setProcessing, language, setLanguage, code, setCode, theme, setTheme, outputDetails, setOutputDetails  } = useScriptideContext();



  const useKeyPress = function (targetKey) {
    const [keyPressed, setKeyPressed] = useState(false);

    function downHandler({ key }) {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    React.useEffect(() => {
      document.addEventListener("keydown", downHandler);
      document.addEventListener("keyup", upHandler);

      return () => {
        document.removeEventListener("keydown", downHandler);
        document.removeEventListener("keyup", upHandler);
      };
    });

    return keyPressed;
  };

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");
  
  const monacoThemes = {
    active4d: "Active4D",
    "all-hallows-eve": "All Hallows Eve",
    amy: "Amy",
    "birds-of-paradise": "Birds of Paradise",
    blackboard: "Blackboard",
    "brilliance-black": "Brilliance Black",
    "brilliance-dull": "Brilliance Dull",
    "chrome-devtools": "Chrome DevTools",
    "clouds-midnight": "Clouds Midnight",
    clouds: "Clouds",
    cobalt: "Cobalt",
    dawn: "Dawn",
    dreamweaver: "Dreamweaver",
    eiffel: "Eiffel",
    "espresso-libre": "Espresso Libre",
    github: "GitHub",
    idle: "IDLE",
    katzenmilch: "Katzenmilch",
    "kuroir-theme": "Kuroir Theme",
    lazy: "LAZY",
    "magicwb--amiga-": "MagicWB (Amiga)",
    "merbivore-soft": "Merbivore Soft",
    merbivore: "Merbivore",
    "monokai-bright": "Monokai Bright",
    monokai: "Monokai",
    "night-owl": "Night Owl",
    "oceanic-next": "Oceanic Next",
    "pastels-on-dark": "Pastels on Dark",
    "slush-and-poppies": "Slush and Poppies",
    "solarized-dark": "Solarized-dark",
    "solarized-light": "Solarized-light",
    spacecadet: "SpaceCadet",
    sunburst: "Sunburst",
    "textmate--mac-classic-": "Textmate (Mac Classic)",
    "tomorrow-night-blue": "Tomorrow-Night-Blue",
    "tomorrow-night-bright": "Tomorrow-Night-Bright",
    "tomorrow-night-eighties": "Tomorrow-Night-Eighties",
    "tomorrow-night": "Tomorrow-Night",
    tomorrow: "Tomorrow",
    twilight: "Twilight",
    "upstream-sunburst": "Upstream Sunburst",
    "vibrant-ink": "Vibrant Ink",
    "xcode-default": "Xcode_default",
    zenburnesque: "Zenburnesque",
    iplastic: "iPlastic",
    idlefingers: "idleFingers",
    krtheme: "krTheme",
    monoindustrial: "monoindustrial",
  }

  async function defineTheme (theme) {
    let themeImport = monacoThemes
    return new Promise((res) => {
      Promise.all([
        loader.init(),
        themeImport
      ]).then(([monaco, themeData]) => {
        monaco.editor.defineTheme(theme, themeData);
        res();
      });
    });
  };


  // function handleCompile() {
  //   //@ts-ignore
  //   setProcessing(true);
  //   const formData = {
  //     language_id: language.id,
  //     source_code: btoa(code),
  //     stdin: btoa(''),
  //   };
  //   console.log(formData);
  //   const options = {
  //     method: "POST",
  //     url: submissions,
  //     params: { base64_encoded: true, fields: "*" },
  //     headers: {
  //       "content-type": "application/json",
  //       "Content-Type": "application/json",
  //       "X-RapidAPI-Host": host,
  //       "X-RapidAPI-KEY": key,
  //     },
  //     data: formData,
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       console.log("res.data: ", response.data);
  //       const token = response.data.token;
  //       console.log("token: ", token);
  //       checkStatus(token);
  //     })
  //     .catch((err) => {
  //       console.log(options);
  //       let error = err.response ? err.response.data : err;
  //       //@ts-ignore
  //       setProcessing(false);
  //       console.log({ error });
  //     });
  // }

  // async function checkStatus(token) {
  //   const options = {
  //     method: "GET",
  //     url: submissions + "/" + token,
  //     params: { base64_encoded: "true", fields: "*" },
  //     headers: {
  //       "X-RapidAPI-Host": host,
  //       "X-RapidAPI-Key": key,
  //     },
  //   };
  //   try {
  //     let response = await axios.request(options);
  //     let statusId = response.data.status?.id;

  //     // Processed - we have a result
  //     if (statusId === 1 || statusId === 2) {
  //       // still processing
  //       setTimeout(() => {
  //         checkStatus(token);
  //       }, 2000);
  //       return;
  //     } else {
  //       //@ts-ignore
  //       setProcessing(false);
  //       setOutputDetails(response.data);
  //       showSuccessToast(`Compiled Successfully!`);
  //       console.log("response.data", response.data);
  //       return;
  //     }
  //   } catch (err) {
  //     console.log("err", err);
  //     //@ts-ignore
  //     setProcessing(false);
  //     showErrorToast(err);
  //   }
  // }

  // function showSuccessToast(message) {
  //   toast.success(message || "Compiled Successfuly", {
  //     position: "top-left",
  //     autoClose: 5000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //   });
  // }

  // function showErrorToast(message) {
  //   toast.error(message || "Compile Failed", {
  //     position: "top-left",
  //     autoClose: 5000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //   });
  // }

  function onSelectChange(select) {
    console.log("selected: ", select);
    setLanguage(select);
  }

  function onChange(action, data) {
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

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme: ", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme.value));
    }
  }

  // useEffect(() => {
  //   if (enterPress && ctrlPress) {
  //     console.log("enter: ", enterPress);
  //     console.log("control: ", ctrlPress);
  //     handleCompile();
  //   }
  // }, [ctrlPress, enterPress]);

  // useEffect(() => {
  //   defineTheme("oceanic-next")
  //     //@ts-ignore
  //     .then((_) =>
  //       setTheme({ value: "oceanic-next", label: "Oceanic-Next" })
  //     );
  // }, []);

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
    <div className="App">
      <header className="App-header">
        <button onClick={signOut}>Sign Out</button>
        <button onClick={startMeeting}>Start Meeting</button>
      </header>
      <div id="App-main">
        <div id="menu-container">
          <div id="menu">TEST</div>
          <button id="menu-btn">▸</button>
        </div>
        <div
          onClick={handleCamClick}
          id={camActive ? "cam-view-open" : "cam-view-closed"}
        >
          <h1>CAM</h1>
        </div>
        <div
          onClick={handleIdeClick}
          id={ideActive ? "ide-view-open" : "ide-view-closed"}
        >
          <h1>IDE</h1>
        </div>
        <div
          onClick={handleGridClick}
          id={gridActive ? "grid-view-open" : "grid-view-closed"}
        >
          <h1>GRID</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
