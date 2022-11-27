import React, { FC, useState, useEffect } from 'react';
import { useScriptideContext }  from '../contexts/ScriptideProvider';
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
  useRosterState
} from 'amazon-chime-sdk-component-library-react';
import { endMeeting } from '../utils/api';

const Meeting: FC = () => {
  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();

  const {  initiator, camActive, setCamActive, ideActive, setIdeActive, gridActive, setGridActive  } = useScriptideContext();

  const clickedEndMeeting = async () => {
    const meetingId = meetingManager.meetingId;
    if (meetingId) {
      await endMeeting(meetingId);
      await meetingManager.leave();
    }
  }
  
  const { roster } = useRosterState();
  const attendees = Object.values(roster);
  let currentUserId = ''

  const attendeeItems = attendees.splice(0,1).map(attendee => {
    const { chimeAttendeeId, name } = attendee;
    currentUserId = chimeAttendeeId;
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

  
  return (
    <>
      <div style={{marginTop: '2rem', backgroundColor: "white", height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{margin: '0', backgroundColor: `${currentUserId.length > 0 && currentUserId === initiator ? "red" : "pink"}`, height: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '33px', zIndex: '10000000000'}}>
            {currentUserId.length > 0 ? <h1>{currentUserId === initiator ? "Instructor" : "Student"}</h1>:<></>}
            </div>
        </div>
        <div id="meeting-ctrls">
        {meetingStatus === MeetingStatus.Succeeded ? 
        <>
          <ControlBar layout="undocked-horizontal" showLabels>
            <AudioInputControl />
            <VideoInputControl />
            <AudioOutputControl />
            <ControlBarButton icon={<Phone />} onClick={clickedEndMeeting} label="End" />
          </ControlBar> 
            <div/>
            </>
          :
          <div/>
        }
      </div>

      {!camActive ? 
        <>
        <div onClick={handleCamClick} id="cam-view-closed"></div>
        <div onClick={handleCamClick} id={camActive ? "cam-view-open" : "cam-view-closed"}>
          <LocalVideo/>
        </div>
        </>
        :
        <>
          <div onClick={handleCamClick} id="cam-view-closed"></div>
          <div id={camActive ? "cam-view-open" : "cam-view-closed"}>
        <LocalVideo/>
          </div>
        </>}
        
        {!ideActive ? 
        <>
          <div onClick={handleIdeClick} id="ide-view-closed"></div>
          <div onClick={handleIdeClick} id={ideActive ? "ide-view-open" : "ide-view-closed"}>
            <IDE/>
          </div> 
        </>
        :
        <>
          <div onClick={handleIdeClick} id="ide-view-closed"></div>
          <div id={ideActive ? "ide-view-open" : "ide-view-closed"}>
            <IDE/>
          </div>
        </>}

        {!gridActive ? 
        <>
        <div onClick={handleGridClick} id="grid-view-closed"></div>
        <div onClick={handleGridClick} id={gridActive ? "grid-view-open" : "grid-view-closed"}>
          <LocalVideo/>
        </div>
        </>
        :
        <>
        <div onClick={handleGridClick} id="grid-view-closed"></div>
        <div id={gridActive ? "grid-view-open" : "grid-view-closed"}>
          <LocalVideo/>
        </div>
        </>}
        

      </>
  );
};

export default Meeting;

