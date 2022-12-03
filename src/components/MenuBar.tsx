import { useScriptideContext } from "../contexts/ScriptideProvider";
import React, { FC, useState, useEffect } from "react";

const MenuBar: FC = () => {
  const {
    setExcalActive,
    excalActive,
    menuState,
    setMenuState,
    transitionState,
    setTransitionState,
    opacity,
    setOpacity
  } = useScriptideContext();

  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  const handleExcali = () =>{
    setTransitionState(!transitionState);
    if(excalActive){
      setExcalActive(false);
      setOpacity(true);
    } else {
      setTimeout(()=>setExcalActive(!excalActive), 180);
      setTimeout(() => setOpacity(false), 180)
    }
  }

  return (
    <div id={!menuState ? "menu-container-open" : "menu-container-closed"}>
      <div id="menu">
        <div
          className="menu-item"
          onClick={handleExcali}
        >
          <p>E</p>
        </div>
      </div>
      <div id="menu-btn-container" onClick={toggleMenu}>
        <div className={menuState ? "menu-btn" : "menu-btn-mod"}>
          {menuState ? "►" : "◄"}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
