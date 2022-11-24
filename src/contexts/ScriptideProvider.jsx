import { createContext, useContext, useState, useEffect } from "react";

const ScriptideContext = createContext(null);

export default function ScriptideProvider({children}){
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

  const [clicked, setClicked] = useState(false);
  const [camActive, setCamActive] = useState(true);
  const [ideActive, setIdeActive] = useState(false);
  const [gridActive, setGridActive] = useState(false);
  const [code, setCode] = useState('//happy coding');
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState(languageOptions[0]);




  async function getAndSet (){
  }

  useEffect(() => {

  getAndSet();

  }, [] )

  return (
    <ScriptideContext.Provider value={{ clicked, setClicked, camActive, setCamActive, ideActive, setIdeActive, gridActive, setGridActive, processing, setProcessing, language, setLanguage, code, setCode, theme, setTheme, outputDetails, setOutputDetails }}>
      {children}
    </ScriptideContext.Provider>

  )


}

export const useScriptideContext = ()=> useContext(ScriptideContext);