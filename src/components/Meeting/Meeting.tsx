import { FC, useEffect, useState, useRef } from "react";
import { useScriptideContext } from "../../contexts/ScriptideProvider";
import { IDE } from "../../components/IDE/IDE.tsx";
import NotionModal from "../../components/NotionModal/NotionModal";
import "./Meeting.css";

import {
  AudioInputControl,
  AudioOutputControl,
  ControlBar,
  ControlBarButton,
  Phone,
  useMeetingManager,
  MeetingStatus,
  useMeetingStatus,
  VideoInputControl,
  RemoteVideos,
  LocalVideo,
  useRosterState,
  useLocalVideo,
  useVideoInputs,
  HandRaise,
  NotificationProvider,
  useNotificationDispatch,
  ActionType,
  Severity,
  useToggleLocalMute,
  Clear,
  Lock,
  Microphone,
} from "amazon-chime-sdk-component-library-react";
import { endMeeting } from "../../utils/api";
import Notifications from "../../containers/Notifications";
import ExcalComponent from "../excalidrawComponent/ExcalComponent";
import HandRaiseManager from "../HandRaiseManager";
import HandRaiser from "../HandRaiser";

import { useOthers, useStorage, useMutation } from "../../liveblocks.config.js";
import MenuBar from "../MenuBar/MenuBar";
import { LanguageDropdown } from "../LanguageDropdown/LanguageDropdown";
import { ThemeDropdown } from "../ThemeDropdown/ThemeDropdown";

const Meeting: FC = () => {
  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();
  const { toggleVideo } = useLocalVideo();
  const { muted, toggleMute } = useToggleLocalMute();

  const {
    initiator,
    camActive,
    setCamActive,
    ideActive,
    setIdeActive,
    gridActive,
    setGridActive,
    menuState,
    setMenuState,
    meetingIdentifier,
    userIsMuted,
    setUserIsMuted,
    userIsLocked,
    setUserIsLocked,
    setThisUser,
    localRaisedHand,
    setLocalRaisedHand,
    showLanguage,
    showTheme,
    setExcalActive,
    setOpacity,
    excalActive,
    setTransitionState,
    transitionState,
  } = useScriptideContext();

  const clickedEndMeeting = async () => {
    const meetingId = meetingManager.meetingId;
    if (meetingId) {
      await endMeeting(meetingId);
      await meetingManager.leave();
      location.reload();
    }
  };


  const { roster } = useRosterState();
  const attendees = Object.values(roster);
  let currentUserId: string = "";
  let currentUserName: string | undefined = "";

  //redundant variable
  const attendeeItems = attendees.splice(0, 1).map((attendee) => {
    const { chimeAttendeeId, name } = attendee;
    currentUserId = chimeAttendeeId;
    // @ts-ignore
    currentUserName = name;
    setThisUser(currentUserId);
  });

  ///////// COULD IMPORT THESE FUNCTIONS FROM ELSEWHERE... AS HELPERS??

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
      if (excalActive) {
        setTransitionState(!transitionState);
        setExcalActive(false);
        setOpacity(true);
      }
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
      if (excalActive) {
        setTransitionState(!transitionState);
        setExcalActive(false);
        setOpacity(true);
      }
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
      if (excalActive) {
        setTransitionState(!transitionState);
        setExcalActive(false);
        setOpacity(true);
      }
    }
  };
  const { devices, selectedDevice } = useVideoInputs();
  function activateVid() {
    toggleVideo();
  }

  const getLocalPreview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      return stream;
    } catch (error) {
      //this is when user don't allow media devices
      console.log(error);
    }
  };

  // DON'T DELETE --> ATTEMPTING TO GET VIDEO TO ENABLE AUTOMATICALLY
  meetingStatus === MeetingStatus.Succeeded
    ? () => {
        useEffect(() => {
          toggleVideo();
        }, []);

      }
    : console.log("TOO SOON");

  interface Action {
    type: ActionType;
    payload?: any;
  }

  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  //////////////////////////////////////////////////////////////////////////////////////////liveblocks
  const removeRaisedHand = (index: number) => {
    deleteHand(index);
  };

  const raiseHand = (student: {}) => {
    updateHands(student);
  };

  const others = useOthers();

  const hands = useStorage((root: any) => root.raisedHandsX);

  // Define mutation
  const updateHands = useMutation(({ storage }: any, student: any) => {
    // @ts-ignore
    const mutableHandsList = storage.get("raisedHandsX");
    mutableHandsList.push(student);
  }, []);

  const deleteHand = useMutation(({ storage }: any, handIndex: any) => {
    const mutableHandsList = storage.get("raisedHandsX");
    mutableHandsList.delete(handIndex);
  }, []);

  // const HandRaiser = () => {
  //   const dispatch = useNotificationDispatch();

  //   const payload: any = {
  //     severity: Severity.INFO,
  //     message: "Your hand is raised and the instructor has been notified.",
  //   };

  //   const addNotification = (e: any) => {
  //     updateHands({ name: currentUserName, id: currentUserId });
  //     setLocalRaisedHand(!localRaisedHand);
  //     dispatch({
  //       type: ActionType.ADD,
  //       payload: payload,
  //     });
  //   };

  //   return (
  //     <>
  //       {localRaisedHand ? (
  //         <button
  //           id="hand-raise-btn"
  //           className="hr-btn-raised cf"
  //           onClick={addNotification}
  //         >
  //           <div>
  //             <h2>
  //               <HandRaise width="6rem" height="6rem" color="green" />
  //             </h2>
  //           </div>
  //         </button>
  //       ) : (
  //         <button
  //           id="hand-raise-btn"
  //           className="hr-btn-not-raised cf"
  //           onClick={addNotification}
  //         >
  //           <div>
  //             <h2>
  //               <HandRaise width="3rem" height="3rem" color="white" />
  //             </h2>
  //           </div>
  //         </button>
  //       )}
  //     </>
  //   );
  // };

  // const HandRaiseManager = () => {
  //   return (
  //     <div id="hands">
  //       <ul>
  //         {hands.map((student: any, i: number) => (
  //           <li>
  //             {student.name}
  //             <div id="hand-ctrls">
  //               <button
  //                 onClick={() => updateUnmutedList(student.id)}
  //                 className="cf"
  //               >
  //                 {unmutedUsers.includes(student.id) ? (
  //                   <Microphone muted />
  //                 ) : (
  //                   <Microphone />
  //                 )}
  //               </button>
  //               <button
  //                 onClick={() => updateUnlockedList(student.id)}
  //                 className="cf"
  //               >
  //                 {unlockedUsers.includes(student.id) ? <Lock /> : <Lock />}
  //               </button>
  //               <button onClick={() => removeRaisedHand(i)} className="cf">
  //                 <Clear />
  //               </button>
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // };

  const unmutedUsers = useStorage((root: any) => root.unmutedAttendees);
  const unlockedUsers = useStorage((root: any) => root.unlockedAttendees);

  // Define mutation

  /////HANDLING USER MUTING --> CONTROLS
  const updateUnmutedList = useMutation(
    ({ storage }: any, userToUnmuteOrMute: string) => {
      const mutableUnmutedList = storage.get("unmutedAttendees");
      const arrayCopy = [...mutableUnmutedList];
      if (arrayCopy.includes(userToUnmuteOrMute)) {
        ///// if they ARE in the unmuted array
        mutableUnmutedList.delete(
          ////// delete them from UNMUTED
          mutableUnmutedList.findIndex(
            (user: string) => user == userToUnmuteOrMute
          )
        );
        if (userToUnmuteOrMute == currentUserId) setUserIsMuted(true); /////// and set them as MUTED
      } else if (!arrayCopy.includes(userToUnmuteOrMute)) {
        ///// if they ARE NOT in the unmuted array
        mutableUnmutedList.push(userToUnmuteOrMute);
        ////// push them into UNMUTED
        if (userToUnmuteOrMute == currentUserId) setUserIsMuted(false); /////// and set them as UNmuted
      }
    },
    []
  );

  //////HANDLING USER MUTING --> FUNCTIONALITY
  useEffect(() => {
    if (currentUserId !== initiator) {
      //////
      //////
      //////
      //////
      //////
      if (unmutedUsers.includes(currentUserId) && !userIsMuted) {
        // toggleMute();
      } else if (!unmutedUsers.includes(currentUserId) && !userIsMuted) {
        toggleMute();
        setUserIsMuted(true);
      } else if (unmutedUsers.includes(currentUserId) && userIsMuted) {
        toggleMute();
        setUserIsMuted(false);
      } else if (!unmutedUsers.includes(currentUserId) && userIsMuted) {
        // toggleMute();
        // setUserIsMuted(false);
      }
      //////
      //////
      //////
      //////
      //////
      //////
    }
  }, [unmutedUsers]);

  /////HANDLING USER UNLOCKING --> CONTROLS
  const updateUnlockedList = useMutation(
    ({ storage }: any, userToLockOrUnlock: string) => {
      const mutableUnlockedList = storage.get("unlockedAttendees");
      const arrayCopy = [...mutableUnlockedList];
      if (arrayCopy.includes(userToLockOrUnlock)) {
        ///// if they ARE in the unmuted array
        mutableUnlockedList.delete(
          ////// delete them from UNLOCKED
          mutableUnlockedList.findIndex(
            (user: string) => user == userToLockOrUnlock
          )
        );
        if (userToLockOrUnlock == currentUserId) setUserIsLocked(true); /////// and set them as LOCKED
      } else if (!arrayCopy.includes(userToLockOrUnlock)) {
        ///// if they ARE NOT in the unmuted array
        mutableUnlockedList.push(userToLockOrUnlock);
        ////// push them into UNLOCKED
        if (userToLockOrUnlock == currentUserId) setUserIsLocked(false); /////// and set them as UNlocked
      }
    },
    []
  );

  //////HANDLING USER UNLOCKING --> FUNCTIONALITY
  useEffect(() => {
    if (currentUserId !== initiator) {
      //////
      //////
      //////
      //////
      //////
      if (unlockedUsers.includes(currentUserId) && !userIsLocked) {
        // toggleMute();
      } else if (!unlockedUsers.includes(currentUserId) && !userIsLocked) {
        // toggleMute();
        setUserIsLocked(true);
      } else if (unlockedUsers.includes(currentUserId) && userIsLocked) {
        // toggleMute();
        setUserIsLocked(false);
      } else if (!unlockedUsers.includes(currentUserId) && userIsLocked) {
        // toggleMute();
        // setUserIsMuted(false);
      }
      //////
      //////
      //////
      //////
      //////
      //////
    }
  }, [unlockedUsers]);

  const startVid = () => {
    toggleVideo();
  };

  return (
    <>
      {/* @ts-ignore */}
      <NotificationProvider>
        {/* @ts-ignore */}
        <Notifications />
        {/* <AddNotificationButton /> */}
        {meetingStatus === MeetingStatus.Succeeded ? (
          <>
            {showTheme && ideActive ? (
              <div className="dropdown theme-dropdown">
                <ThemeDropdown />
              </div>
            ) : (
              <div className="dropdown theme-dropdown-hidden">
                <ThemeDropdown />
              </div>
            )}
            {showLanguage && ideActive ? (
              <div className="dropdown lang-dropdown">
                <LanguageDropdown />
              </div>
            ) : (
              <div className="dropdown lang-dropdown-hidden">
                <LanguageDropdown />
              </div>
            )}
            <div
              style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  margin: "0",
                  backgroundColor: `${
                    currentUserId.length > 0 && currentUserId === initiator
                      ? "red"
                      : "pink"
                  }`,
                  height: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  top: "33px",
                  zIndex: "10000000000",
                }}
              >
                {currentUserId.length > 0 ? (
                  <>
                    <h6 onClick={startVid}>
                      {currentUserId === initiator
                        ? `Instructor + ${others.count} others in meeting: ${meetingIdentifier}`
                        : `Student + ${others.count} others in meeting: ${meetingIdentifier}`}
                    </h6>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="getitcentered">

            <div id="meeting-ctrls">
              {meetingStatus === MeetingStatus.Succeeded ? (
                <>
                  <ControlBar layout="undocked-horizontal" showLabels>
                    <AudioInputControl />
                    <VideoInputControl />
                    <AudioOutputControl />
                    <ControlBarButton
                      icon={<Phone />}
                      onClick={clickedEndMeeting}
                      label="End"
                    />
                  </ControlBar>
                  <div />
                </>
              ) : (
                <div />
                )}
            </div>
                </div>
            <MenuBar />

            {!camActive ? (
              <>
                <div onClick={handleCamClick} id="cam-view-closed"></div>
                <div
                  onClick={handleCamClick}
                  id={camActive ? "cam-view-open" : "cam-view-closed"}
                >
                  <LocalVideo />
                </div>
              </>
            ) : (
              <>
                <div onClick={handleCamClick} id="cam-view-closed"></div>
                <div id={camActive ? "cam-view-open" : "cam-view-closed"}>
                  <LocalVideo />
                </div>
              </>
            )}

            {!ideActive ? (
              <>
                <div onClick={handleIdeClick} id="empty-porthole-invis"></div>
                <div
                  onClick={handleIdeClick}
                  id={ideActive ? "ide-view-open" : "ide-view-closed"}
                >
                  <div className="ide-pos-closed">
                    <IDE currentUserId={currentUserId} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div onClick={handleIdeClick} id="empty-porthole"></div>
                <div id={ideActive ? "ide-view-open" : "ide-view-closed"}>
                  <div className="ide-pos-open">
                    <IDE />
                  </div>
                </div>
              </>
            )}

            {!gridActive ? (
              <>
                <div onClick={handleGridClick} id="grid-view-closed"></div>
                <div
                  onClick={handleGridClick}
                  id={gridActive ? "grid-view-open" : "grid-view-closed"}
                >
                  <RemoteVideos />
                </div>
              </>
            ) : (
              <>
                <div onClick={handleGridClick} id="grid-view-closed"></div>
                <div id={gridActive ? "grid-view-open" : "grid-view-closed"}>
                  <RemoteVideos />
                </div>
              </>
            )}

            {currentUserId.length > 0 && currentUserId !== initiator ? (
              <HandRaiser />
            ) : (
              <HandRaiseManager />
            )}
          </>
        ) : (
          <div id="center-flex">
            <h3>
              Joining<code> {meetingIdentifier} </code>meeting
            </h3>
            <h3 className="ellipsis"></h3>
          </div>
        )}
        <ExcalComponent />
        <NotionModal meetingLoaded={
            meetingStatus === MeetingStatus.Succeeded ? true : false
          }/>
      </NotificationProvider>
    </>
  );
};

export default Meeting;
