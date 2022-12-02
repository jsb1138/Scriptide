import { useScriptideContext } from "../contexts/ScriptideProvider";
import React, { FC, useState, useEffect } from "react";

const MenuBar: FC = () => {
  const { setExcalActive, excalActive, menuState, setMenuState } = useScriptideContext();

  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  return (
    <div id={!menuState ? "menu-container-open" : "menu-container-closed"}>
      <div id="menu">
        <div className="menu-item" onClick={()=>setExcalActive(!excalActive)} >
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
