import { mount } from "cypress/react18";
import {
  MeetingProvider,
  lightTheme,
} from "amazon-chime-sdk-component-library-react";
import { ThemeProvider } from "styled-components";
import Meeting from "../../src/components/Meeting/Meeting";
import ScriptideProvider from "../../src/contexts/ScriptideProvider";
import { RoomProvider } from "../../src/liveblocks.config";
import MeetingForm from "../../src/components/MeetingForm/MeetingForm";

describe("Meeting page", () => {
  const meetingActive = true;
  beforeEach(() => {
    mount(
      <RoomProvider id="12678900345">
        <ThemeProvider theme={lightTheme}>
          <MeetingProvider>
            <ScriptideProvider>
              {!meetingActive ? (
                <div id="center-flex">
                  <MeetingForm />
                </div>
              ) : (
                <Meeting />
              )}
            </ScriptideProvider>
          </MeetingProvider>
        </ThemeProvider>
      </RoomProvider>
    );
  });

  it("Meeting should render", () => {
    cy.get("div").should("exist");
  });
});
