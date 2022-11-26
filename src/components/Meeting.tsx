import React, { FC, useState } from 'react';

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
  LocalVideo,
  useRosterState
} from 'amazon-chime-sdk-component-library-react';
import { endMeeting } from '../utils/api';

const Meeting: FC = () => {
  const meetingManager = useMeetingManager();
  const meetingStatus = useMeetingStatus();


  const clickedEndMeeting = async () => {
    const meetingId = meetingManager.meetingId;
    if (meetingId) {
      await endMeeting(meetingId);
      await meetingManager.leave();
    }
  }

  const { roster } = useRosterState();
  const attendees = Object.values(roster);

  console.log("attendees", attendees);
  
  return (
    <>
      <div style={{marginTop: '2rem', backgroundColor: "lightblue", height: '40rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <LocalVideo/>
        </div>
      {/* <div style={{marginTop: '2rem', backgroundColor: "pink", height: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <h1>{MeetingStatus}</h1>
        </div> */}
      <div style={{marginTop: '2rem', backgroundColor: "lightgrey", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        {meetingStatus === MeetingStatus.Succeeded ? 
          <ControlBar
            layout="undocked-horizontal"
            showLabels
          >
            <AudioInputControl />
            <VideoInputControl />
            <AudioOutputControl />
            <ControlBarButton icon={<Phone />} onClick={clickedEndMeeting} label="End" />
          </ControlBar> 
          :
          <div/>
        }
      </div>
      </>
  );
};

export default Meeting;