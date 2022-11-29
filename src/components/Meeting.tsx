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
} from "amazon-chime-sdk-component-library-react";
import { endMeeting } from "../utils/api";

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
    thisUser,
    setThisUser,
  } = useScriptideContext();

  const { isVideoEnabled, toggleVideo } = useLocalVideo();

  const clickedEndMeeting = async () => {
    const meetingId = meetingManager.meetingId;
    if (meetingId) {
      await endMeeting(meetingId);
      await meetingManager.leave();
    }
  };

  const { roster } = useRosterState();
  const attendees = Object.values(roster);
  let currentUserId = "";

  const attendeeItems = attendees.splice(0, 1).map((attendee) => {
    const { chimeAttendeeId, name } = attendee;
    currentUserId = chimeAttendeeId;
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

  meetingStatus === MeetingStatus.Succeeded
    ? () => {
        setTimeout(() => {
          toggleVideo();
          console.log("TOGGLER");
        }, 5000);
      }
    : console.log("TOO SOON");

  // ALL THAT CHAOTIC INLINE STYLING IS TEMPORARY
  // MUCH OF THE RENDER BLOCK WILL BE TIGHTENED UP LATER
  return (
    <>
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
            height: "4rem",
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
            <h1>{currentUserId === initiator ? "Instructor" : "Student"}</h1>
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
            <VideoTileGrid />
          </div>
        </>
      ) : (
        <>
          <div onClick={handleGridClick} id="grid-view-closed"></div>
          <div id={gridActive ? "grid-view-open" : "grid-view-closed"}>
            {/* <VideoTileGrid /> */}
          </div>
        </>
      )}
      {/* </>  */}
      {/* // :  */}
      {/* // <></>} */}
    </>
  );
};

export default Meeting;
