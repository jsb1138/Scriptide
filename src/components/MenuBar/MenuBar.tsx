import { useScriptideContext } from "../../contexts/ScriptideProvider";
import { FC } from "react";
import { ThemeDropdown } from "./ThemeDropdown";
import { LanguageDropdown } from "./LanguageDropdown";
import SendToNotion from "../SendToNotion/SendToNotion";
import Tooltip from "../Tooltip/Tooltip";
import "./MenuBar.css";

const MenuBar: FC = () => {
  const {
    setExcalActive,
    excalActive,
    menuState,
    setMenuState,
    transitionState,
    setTransitionState,
    setShowTheme,
    showTheme,
    setShowLanguage,
    showLanguage,
    ideActive,
    setCamActive,
    setIdeActive,
    setGridActive,
  } = useScriptideContext();

  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  const handleExcali = () => {
    setTransitionState(!transitionState);
    if (excalActive) {
      setExcalActive(false);
    } else {
      setExcalActive(!excalActive);
      setCamActive(false);
      setIdeActive(false);
      setGridActive(false);
    }
  };
  const handleTheme = () => {
    setShowTheme(!showTheme);
  };
  const handleLanguage = () => {
    setShowLanguage(!showLanguage);
  };

  return !ideActive ? (
    <>
      <div
        id="menu-without-ide-options"
        className={menuState ? "menu-open" : "menu-closed"}
      >
        <Tooltip content="Sketch diagrams with Excalidraw">
          <div className="menu-item" onClick={handleExcali}>
            <img
              src="src/assets/excalidraw4.png"
              className="excali-logo"
              title="open excalidraw"
            />
          </div>
        </Tooltip>
        <Tooltip content="Post to Notion">
          <div className="menu-item">
            <SendToNotion />
          </div>
        </Tooltip>
        <div className="dont-show">
          <div className="menu-item-without-cursor">
            <p>T</p>
          </div>
          <div className="menu-item-without-cursor">
            <p>L</p>
          </div>
        </div>
      </div>
      <div
        className={menuState ? "menu-btn-mod" : "menu-btn"}
        onClick={toggleMenu}
      >
        {menuState ? "◄" : "►"}
      </div>
    </>
  ) : (
    <>
      <div
        id="menu-with-ide-options"
        className={menuState ? "menu-open" : "menu-closed"}
      >
        <Tooltip content="Sketch diagrams with Excalidraw">
          <div className="menu-item" onClick={handleExcali}>
            <img src="src/assets/excalidraw4.png" className="excali-logo" />
          </div>
        </Tooltip>
        <Tooltip content="Post notes with Notion">
          <div className="menu-item">
            <SendToNotion />
          </div>
        </Tooltip>
        <div className="show-me">
          <Tooltip content="Choose an IDE theme">
            <div className="menu-item" onClick={handleTheme}>
              <p>T</p>
            </div>
          </Tooltip>
          <Tooltip content="Choose a programming language">
            <div className="menu-item" onClick={handleLanguage}>
              <p>L</p>
            </div>
          </Tooltip>
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
