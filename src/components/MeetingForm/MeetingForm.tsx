import { ChangeEvent, FC, FormEvent } from "react";
import { useScriptideContext } from "../../contexts/ScriptideProvider";
import "./MeetingForm.css"

import {
  FormField,
  Input,
  PrimaryButton,
  useMeetingManager
} from "amazon-chime-sdk-component-library-react";
import { MeetingSessionConfiguration } from "amazon-chime-sdk-js";
import {
  addAttendeeToDB,
  addMeetingToDB,
  createMeeting,
  getAttendeeFromDB,
  getMeetingFromDB,
  joinMeeting
} from "../../utils/api";

const MeetingForm: FC = () => {
  const meetingManager = useMeetingManager();


  const { setInitiator, setMeetingActive, setMeetingIdentifier, attendeeName, setName, meetingTitle, setMeetingTitle } =
    useScriptideContext();

  function getAttendeeCallback() {
    return async (chimeAttendeeId: string, externalUserId?: string) => {
      const attendeeInfo: any = await getAttendeeFromDB(chimeAttendeeId);
      const attendeeData = attendeeInfo.data.getAttendee;
      return {
        name: attendeeData.name,
      };
    };
  }

  //Placeholder - we'll replace this function implementation later
  const clickedJoinMeeting = async (event: FormEvent) => {
    event.preventDefault();

    meetingManager.getAttendee = getAttendeeCallback();
    const title = meetingTitle.trim().toLocaleLowerCase();
    const name = attendeeName.trim();
    setMeetingIdentifier(title);

    const meetingResponse: any = await getMeetingFromDB(title);
    const meetingJson = meetingResponse.data.getMeeting;
    try {
      if (meetingJson) {
        setMeetingActive(true);
        console.log("--------NOOOOOOOOOOOOOOOOOOOOO------");
        const meetingData = JSON.parse(meetingJson.data);
        const joinInfo = await joinMeeting(meetingData.MeetingId, name);
        console.log("meeting Data", meetingData);
        await addAttendeeToDB(joinInfo.Attendee.AttendeeId, name);
        const meetingSessionConfiguration = new MeetingSessionConfiguration(
          meetingData,
          joinInfo.Attendee
        );
        await meetingManager.join(meetingSessionConfiguration);
      } else {
        setMeetingActive(true);
        console.log("----------------FIRST----------------");
        const joinInfo = await createMeeting(title, name, "us-east-1");
        await addMeetingToDB(
          title,
          joinInfo.Meeting.MeetingId,
          JSON.stringify(joinInfo.Meeting)
        );
        await addAttendeeToDB(joinInfo.Attendee.AttendeeId, name);
        setInitiator(joinInfo.Attendee.AttendeeId); //sets the first person in meeting as "initiator"
        const meetingSessionConfiguration = new MeetingSessionConfiguration(
          joinInfo.Meeting,
          joinInfo.Attendee
        );
        await meetingManager.join(meetingSessionConfiguration);
      }
    } catch (error) {
      console.log(error);
    }

    // At this point you can let users setup their devices, or start the session immediately
    await meetingManager.start();
  };

  return (
    <div className="form-container">
      <form>
        <FormField
          field={Input}
          label="Meeting Id"
          value={meetingTitle}
          fieldProps={{
            name: "Meeting Id",
            placeholder: "Enter a Meeting ID",
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setMeetingTitle(e.target.value);
          }}
        />
        <FormField
          field={Input}
          label="Name"
          value={attendeeName}
          fieldProps={{
            name: "Name",
            placeholder: "Enter your Attendee Name",
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <PrimaryButton label="Join Meeting" onClick={clickedJoinMeeting} />
      </form>
    </div>
  );
};

export default MeetingForm;
