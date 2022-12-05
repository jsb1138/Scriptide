
import { useScriptideContext } from "../contexts/ScriptideProvider";
import { FC } from "react";
import { ThemeDropdown } from "./ThemeDropdown";
import { LanguageDropdown } from "./LanguageDropdown";
import SendToNotion from "../components/SendToNotion/SendToNotion"


const MenuBar: FC = () => {
  const {
    setExcalActive,
    excalActive,
    menuState,
    setMenuState,
    transitionState,
    setTransitionState,
    setOpacity,
    setShowTheme,
    showTheme,
    setShowLanguage,
    showLanguage,
  } = useScriptideContext();

  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  const handleExcali = () => {
    setTransitionState(!transitionState);
    if (excalActive) {
      setExcalActive(false);
      setOpacity(true);
    } else {
      setTimeout(() => setExcalActive(!excalActive), 180);
      setTimeout(() => setOpacity(false), 180);
    }
  };
  const handleTheme = () => {
    setShowTheme(!showTheme);
  };
  const handleLanguage = () => {
    setShowLanguage(!showLanguage);
  };

  return (
    <>
      <div id="menu" className={menuState ? "menu-open" : "menu-closed"}>
        <div className="menu-item" onClick={handleExcali}>
          <img src="src/assets/excalidraw.png" className="excali-logo" title="open excalidraw" />
        </div>
        <div className='menu-item'>
          <SendToNotion/>
        </div>
        <div className="menu-item" onClick={handleTheme}>
          <p>T</p>
        </div>
        <div className="menu-item" onClick={handleLanguage}>
          <p>L</p>
        </div>
      </div>
      <div
        className={menuState ? "menu-btn-mod" : "menu-btn"}
        onClick={toggleMenu}
      >
        {menuState ? "◄" : "►"}
      </div>
    </>
  );
};

export default MenuBar;
