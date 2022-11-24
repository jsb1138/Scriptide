import { createContext, useContext, useState, useEffect } from "react";

const ScriptideContext = createContext(null);

export default function ScriptideProvider({children}){

  const [clicked, setClicked] = useState(false);
  const [camActive, setCamActive] = useState(true);
  const [ideActive, setIdeActive] = useState(false);
  const [gridActive, setGridActive] = useState(false);

  async function getAndSet (){
  }

  useEffect(() => {

  getAndSet();

  }, [] )

  return (
    <ScriptideContext.Provider value={{clicked, setClicked, camActive, setCamActive, ideActive, setIdeActive, gridActive, setGridActive }}>
      {children}
    </ScriptideContext.Provider>

  )


}

export const useScriptideContext = ()=> useContext(ScriptideContext);