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
import Meeting from "./Meeting";

///////////////////////////////////////////////////////////////////////////////////////////////////liveblocks
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider, useOthers } from "../liveblocks.config.js";

const MeetingContainer: FC = () => {
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

  // DON'T DELETE
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

  const toggleMenu = () => {
    setMenuState(!menuState);
  };

  //////////////////////////////////////////////////////////////////////////////////////////liveblocks
  const others = useOthers();

  // ALL THAT CHAOTIC INLINE STYLING IS TEMPORARY
  // MUCH OF THE RENDER BLOCK WILL BE TIGHTENED UP LATER
  return (
    <RoomProvider id={meetingManager.meetingId} initialPresence={{}}>
      <ClientSideSuspense
        fallback={
          <div id="center-flex">
            <h3>
              Joining<code>{meetingIdentifier} </code>meeting
            </h3>
            <h3 className="ellipsis"></h3>
          </div>
        }
      >
        {() => <Meeting />}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default MeetingContainer;
