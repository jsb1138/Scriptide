import { createContext, useContext, useState, useEffect, useRef } from "react";
// import  languageOptions  from '../constants/languageOptions'
import { io } from 'socket.io-client'

const ScriptideContext = createContext(null);

export default function ScriptideProvider({ children }) {
  const languageOptions = [
    {
      id: 63,
      name: "JavaScript (Node.js 12.14.0)",
      label: "JavaScript (Node.js 12.14.0)",
      value: "javascript",
    },
    {
      id: 45,
      name: "Assembly (NASM 2.14.02)",
      label: "Assembly (NASM 2.14.02)",
      value: "assembly",
    },
    {
      id: 84,
      name: "Visual Basic.Net (vbnc 0.0.0.5943)",
      label: "Visual Basic.Net (vbnc 0.0.0.5943)",
      value: "vbnet",
    },
  ];

  const javascriptDefault = "//happy coding";

  //socket

  const socket = io('http://127.0.0.1:3000')

  const [camActive, setCamActive] = useState(false);
  const [ideActive, setIdeActive] = useState(false);
  const [gridActive, setGridActive] = useState(false);
  const [code, setCode] = useState(javascriptDefault);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [initiator, setInitiator] = useState("");
  const [meetingActive, setMeetingActive] = useState(false);
  const [thisUser, setThisUser] = useState("");

  async function getAndSet() {}

  useEffect(() => {
    getAndSet();
  }, []);

  return (
    <ScriptideContext.Provider
      value={{
        camActive,
        setCamActive,
        ideActive,
        setIdeActive,
        gridActive,
        setGridActive,
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
        initiator,
        setInitiator,
        meetingActive,
        setMeetingActive,
        thisUser,
        setThisUser,
        socket
      }}
    >
      {children}
    </ScriptideContext.Provider>
  );
}

export const useScriptideContext = () => useContext(ScriptideContext);
