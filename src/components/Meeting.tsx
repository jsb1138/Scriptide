import React, { FC, useState, useEffect } from 'react';
import { useScriptideContext }  from '../contexts/ScriptideProvider';

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

  const {  initiator, setInitiator  } = useScriptideContext();

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
    console.log("attendee", chimeAttendeeId, name, chimeAttendeeId);
    currentUserId = chimeAttendeeId;
    console.log("FINALLY ---->>>>>>>", currentUserId);
  });





  // const currentUser = Object.values(attendees)[0]

  // useEffect(() => {
  //   const currentUserId = Object.values(currentUser)[0]
  //   console.log("USE EFFECT");
  // },[])

  // const currentUserId = String(currentUser[chimeAttendeeId]);

  // console.log("attendees", attendees);
  // console.log("initiator", initiator);
  // console.log("attendees[00]", attendees[0]);
  // console.log("current user", currentUser);
  // console.log("current user ID", currentUser[chimeAttendeeId]);

  // function getCurrentUserId () {
  //   console.log("THIS-------------->",Object.keys(currentUserId))
  //   return Object.keys(currentUserId);
  // }
  
  return (
    <>
      <div style={{marginTop: '2rem', backgroundColor: "lightblue", height: '40rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{marginTop: '2rem', backgroundColor: `${currentUserId.length > 0 && currentUserId === initiator ? "red" : "pink"}`, height: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            {currentUserId.length > 0 ? <h1>{currentUserId === initiator ? "Instructor" : "Student"}</h1>:<></>}
            </div>
        <LocalVideo/>
        </div>
      <div style={{marginTop: '2rem', backgroundColor: "darksalmon", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
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
      </>
  );
};

export default Meeting;