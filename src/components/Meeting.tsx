import { FC, useEffect, useState, useRef } from "react";
import { useScriptideContext } from "../contexts/ScriptideProvider";
import { IDE } from "./IDE";

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
} from "amazon-chime-sdk-component-library-react";
import { endMeeting } from "../utils/api";
import Notifications from "../containers/Notifications";
import ExcalComponent from "./excalidrawComponent/ExcalComponent";

import { useOthers, useStorage, useMutation } from "../liveblocks.config.js";
import MenuBar from "./MenuBar";

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
  // console.log("roster", roster);
  const attendees = Object.values(roster);
  // console.log("attendees", attendees);
  let currentUserId: string = "";
  let currentUserName: string | undefined = "";

  //redundant variable
  const attendeeItems = attendees.splice(0, 1).map((attendee) => {
    const { chimeAttendeeId, name } = attendee;
    currentUserId = chimeAttendeeId;
    // @ts-ignore
    currentUserName = name;
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
    console.log("clicked");
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
  const { devices, selectedDevice } = useVideoInputs();
  function activateVid() {
    console.log("devices", devices);
    console.log("selected device", selectedDevice);
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
        // setTimeout(() => {
        //   toggleVideo();
        //   console.log("TOGGLER");
        // }, 5000);
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

  const RaiseYourHand = () => {
    const dispatch = useNotificationDispatch();

    const payload: any = {
      severity: Severity.INFO,
      message: "Your hand is raised and the instructor has been notified.",
    };

    const addNotification = (e: any) => {
      updateHands({ name: currentUserName, id: currentUserId });
      dispatch({
        type: ActionType.ADD,
        payload: payload,
      });
    };

    return (
      <button id="hand-raise-btn" className="cf" onClick={addNotification}>
        <div>
          <h2>
            <HandRaise width="5rem" height="5rem" color="green" />
          </h2>
        </div>
      </button>
    );
  };

  const unmutedUsers = useStorage((root: any) => root.unmutedAttendees);
  const unlockedUsers = useStorage((root: any) => root.unlockedAttendees);
  console.log("unmuted users --->", unmutedUsers);
  console.log("unlocked users --->", unlockedUsers);

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
          mutableUnmutedList.findIndex((user) => user == userToUnmuteOrMute)
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
        console.log("1 this should be false ->", userIsMuted);
      } else if (!unmutedUsers.includes(currentUserId) && !userIsMuted) {
        toggleMute();
        setUserIsMuted(true);
        console.log("2 You have been MUTED!");
      } else if (unmutedUsers.includes(currentUserId) && userIsMuted) {
        toggleMute();
        setUserIsMuted(false);
        console.log("3 You have been UN-MUTED!");
      } else if (!unmutedUsers.includes(currentUserId) && userIsMuted) {
        // toggleMute();
        // setUserIsMuted(false);
        console.log("4 this should be false ->", userIsMuted);
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
          ////// delete them from UNMUTED
          mutableUnlockedList.findIndex((user) => user == userToLockOrUnlock)
        );
        if (userToLockOrUnlock == currentUserId) setUserIsLocked(true); /////// and set them as MUTED
      } else if (!arrayCopy.includes(userToLockOrUnlock)) {
        ///// if they ARE NOT in the unmuted array
        mutableUnlockedList.push(userToLockOrUnlock);
        ////// push them into UNMUTED
        if (userToLockOrUnlock == currentUserId) setUserIsLocked(false); /////// and set them as UNmuted
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
        console.log("1 this should be false ->", userIsLocked);
      } else if (!unlockedUsers.includes(currentUserId) && !userIsLocked) {
        // toggleMute();
        setUserIsLocked(true);
        console.log("2 You have been LOCKED!");
      } else if (unlockedUsers.includes(currentUserId) && userIsLocked) {
        // toggleMute();
        setUserIsLocked(false);
        console.log("3 You have been UN-LOCKED!");
      } else if (!unlockedUsers.includes(currentUserId) && userIsLocked) {
        // toggleMute();
        // setUserIsMuted(false);
        console.log("4 this should be false ->", userIsLocked);
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
    console.log("START!");
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
                    <IDE />
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
              <>
                <RaiseYourHand />
              </>
            ) : (
              <>
                <div id="hands">
                  <ul>
                    {hands.map((student: any, i: number) => (
                      <li>
                        {student.name}
                        <button
                          onClick={() => updateUnmutedList(student.id)}
                          className="cf"
                        >
                          {unmutedUsers.includes(student.id) ? "M" : "unM"}
                        </button>
                        <button
                          onClick={() => updateUnlockedList(student.id)}
                          className="cf"
                        >
                          {unlockedUsers.includes(student.id) ? "L" : "unL"}
                        </button>
                        <button
                          onClick={() => removeRaisedHand(i)}
                          className="cf"
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
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
      </NotificationProvider>
    </>
  );
};

export default Meeting;
