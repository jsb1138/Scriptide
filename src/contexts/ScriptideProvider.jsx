import { createContext, useContext, useState } from "react";

const ScriptideContext = createContext(null);

export default function ScriptideProvider({ children }) {
  const [camActive, setCamActive] = useState(false);
  const [ideActive, setIdeActive] = useState(false);
  const [gridActive, setGridActive] = useState(false);
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("vs-dark");
  const [initiator, setInitiator] = useState("");
  const [meetingActive, setMeetingActive] = useState(false);
  const [thisUser, setThisUser] = useState("");
  const [menuState, setMenuState] = useState(false);
  const [meetingIdentifier, setMeetingIdentifier] = useState("");
  const [localRaisedHand, setLocalRaisedHand] = useState(false);
  const [excalActive, setExcalActive] = useState(false);
  const [transitionState, setTransitionState] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [attendeeName, setName] = useState("");
  const [keyPressed, setKeyPressed] = useState(false);
  const [userIsMuted, setUserIsMuted] = useState(true);
  const [userIsLocked, setUserIsLocked] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [notionModalIsOpen, setNotionModalIsOpen] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [showLanguage, setShowLanguage] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [userNotionId, setUserNotionId] = useState(null);
  const [excalState, setExcalState] = useState([])

  return (
    <ScriptideContext.Provider
      value={{
        language,
        setLanguage,
        camActive,
        setCamActive,
        ideActive,
        setIdeActive,
        gridActive,
        setGridActive,
        processing,
        setProcessing,
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
        menuState,
        setMenuState,
        meetingIdentifier,
        setMeetingIdentifier,
        localRaisedHand,
        setLocalRaisedHand,
        excalActive,
        setExcalActive,
        transitionState,
        setTransitionState,
        meetingTitle,
        setMeetingTitle,
        attendeeName,
        setName,
        keyPressed,
        setKeyPressed,
        userIsMuted,
        setUserIsMuted,
        userIsLocked,
        setUserIsLocked,
        isClicked,
        setIsClicked,
        notionModalIsOpen,
        setNotionModalIsOpen,
        code,
        setCode,
        showLanguage,
        setShowLanguage,
        showTheme,
        setShowTheme,
        userNotionId,
        setUserNotionId,
        excalState,
        setExcalState



      }}
    >
      {children}
    </ScriptideContext.Provider>
  );
}

export const useScriptideContext = () => useContext(ScriptideContext);
