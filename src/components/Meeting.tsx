import React, { FC, useState, useEffect } from "react";
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
  VideoTileGrid,
  RemoteVideos,
  LocalVideo,
  useRosterState,
  useLocalVideo,
  useVideoInputs,
  CameraSelection,
  HandRaise,
  RosterAttendeeType,
  NotificationProvider,
  useNotificationDispatch,
  useNotificationState,
  NotificationGroup,
  ActionType,
  Severity,
} from "amazon-chime-sdk-component-library-react";
import { endMeeting } from "../utils/api";
import Notifications from "../containers/Notifications";

///////////////////////////////////////////////////////////liveblocks
import { ClientSideSuspense } from "@liveblocks/react";
import {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useStorage,
  useMutation,
} from "../liveblocks.config.js";

const Meeting: FC = () => {
  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();

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
    raisedHands,
    setRaisedHand,
  } = useScriptideContext();

  const { isVideoEnabled, toggleVideo } = useLocalVideo();

  const clickedEndMeeting = async () => {
    const meetingId = meetingManager.meetingId;
    if (meetingId) {
      await endMeeting(meetingId);
      await meetingManager.leave();
      location.reload();
    }
  };

  const { roster } = useRosterState();
  console.log("roster", roster);
  const attendees = Object.values(roster);
  console.log("attendees", attendees);
  let currentUserId: string = "";
  let currentUserName: string = "";

  //redundant variable
  const attendeeItems = attendees.splice(0, 1).map((attendee) => {
    const { chimeAttendeeId, name } = attendee;
    currentUserId = chimeAttendeeId;
    currentUserName = name;
    // setThisUser(currentUserId);
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     toggleVideo()
  //     console.log("123Time");
  //   }, 5000);
  // },[])

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

  const triggerNotification = (payload) => {
    const dispatch = useNotificationDispatch();

    // const payload: any = {
    //   severity: Severity.INFO,
    //   message: 'Information'
    // };
    console.log("innnnn", payload);
    // const addNotification = (e: any) => {
    dispatch({
      type: ActionType.ADD,
      payload: payload,
    });
    // };
    console.log("after");

    // return <button onClick={addNotification}>{label}</button>;
  };

  interface Action {
    type: ActionType;
    payload?: any;
  }

  enum ActionType {
    ADD,
    REMOVE,
    REMOVE_ALL,
  }

  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  //////////////////////////////////////////////////////////////////////////////////////////liveblocks
  const removeRaisedHand = (index) => {
    deleteHand(index);
    console.log("hands--->", hands);
  };

  const raiseHand = (student) => {
    updateHands(student);
    // triggerNotification({
    //   severity: Severity.INFO,
    //   message: `Your hand is raised and the instructor has been notified.`,
    // });
  };

  const others = useOthers();

  const hands = useStorage((root) => root.raisedHands);

  // Define mutation
  const updateHands = useMutation(({ storage }, student) => {
    const mutableHandsList = storage.get("raisedHands");
    mutableHandsList.push(student);
  }, []);

  const deleteHand = useMutation(({ storage }, hand) => {
    const mutableHandsList = storage.get("raisedHands");
    mutableHandsList.delete(hand);
  }, []);

  // console.log("raised hands", ide);

  // console.log("meeting id", meetingIdentifier);

  // ALL THAT CHAOTIC INLINE STYLING IS TEMPORARY
  // MUCH OF THE RENDER BLOCK WILL BE TIGHTENED UP LATER
  return (
    <>
      {/* @ts-ignore */}
      <NotificationProvider>
        {/* // @ts-ignore */}
        <Notifications />
        {/* <AddNotificationButton /> */}
        {meetingStatus === MeetingStatus.Succeeded ? (
          <>
            {/** @todo: THIS RUDIMENTARY MENU CAN BE MADE INTO A COMPONENT --> *INCLUDE* "toggleMenu function" **/}
            <div
              id={!menuState ? "menu-container-open" : "menu-container-closed"}
            >
              <div id="menu"></div>
              <div id="menu-btn-container" onClick={toggleMenu}>
                <div className={menuState ? "menu-btn" : "menu-btn-mod"}>
                  {menuState ? "►" : "◄"}
                </div>
              </div>
            </div>
            <div
              style={{
                // backgroundColor: "white",
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
                  <h6>
                    {currentUserId === initiator
                      ? `Instructor + ${others.count} others in meeting: ${meetingIdentifier}`
                      : `Student + ${others.count} others in meeting: ${meetingIdentifier}`}
                  </h6>
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

            {/* {currentUserId.length > 0 && currentUserId === initiator ? <> */}
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
                <div
                  onClick={() => {
                    raiseHand({ name: currentUserName });
                    triggerNotification({
                      severity: Severity.INFO,
                      message: `Your hand is raised and the instructor has been notified.`,
                    });
                  }}
                  id="hand-raise-btn"
                  className="cf"
                >
                  <h2>
                    <HandRaise width="5rem" height="5rem" color="green" />
                  </h2>
                </div>
              </>
            ) : (
              <>
                <div
                  id="hands"
                  onClick={console.log("these are the hands", hands)}
                >
                  <ul>
                    {hands.map((student, i) => (
                      <li>
                        {student.name}
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

            {/* {currentUserId.length > 0 && currentUserId === initiator ? (
              <>
                <h1>TEST</h1>
              </>
            ) : (
              <></>
            )} */}

            {/* </>  */}
            {/* // :  */}
            {/* // <></>} */}
          </>
        ) : (
          <div id="center-flex">
            <h3>
              Joining<code> {meetingIdentifier} </code>meeting
            </h3>
            <h3 className="ellipsis"></h3>
          </div>
        )}
      </NotificationProvider>
    </>
  );
};

export default Meeting;
