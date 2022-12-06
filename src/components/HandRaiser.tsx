import React, { useEffect } from "react";

import { useScriptideContext } from "../contexts/ScriptideProvider";

import {
  HandRaise,
  useNotificationDispatch,
  ActionType,
  Severity,
  useToggleLocalMute,
  Clear,
  Lock,
  Microphone,
} from "amazon-chime-sdk-component-library-react";

import { useOthers, useStorage, useMutation } from "../liveblocks.config.js";

export default function HandRaiser() {
  const {
    isClicked,
    setIsClicked,
    thisUser,
    setUserIsMuted,
    initiator,
    userIsMuted,
    userIsLocked,
    setUserIsLocked,
    localRaisedHand,
    setLocalRaisedHand,
  } = useScriptideContext();

  const { muted, toggleMute } = useToggleLocalMute();

  const unmutedUsers = useStorage((root: any) => root.unmutedAttendees);
  const unlockedUsers = useStorage((root: any) => root.unlockedAttendees);
  console.log("unmuted users --->", unmutedUsers);
  console.log("unlocked users --->", unlockedUsers);

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

  const dispatch = useNotificationDispatch();

  const payload: any = {
    severity: Severity.INFO,
    message: "Your hand is raised and the instructor has been notified.",
  };

  const addNotification = (e: any) => {
    updateHands({ name: "ff", id: thisUser });
    setLocalRaisedHand(!localRaisedHand);
    dispatch({
      type: ActionType.ADD,
      payload: payload,
    });
  };

  return (
    <>
      {localRaisedHand ? (
        <button
          id="hand-raise-btn"
          className="hr-btn-raised cf"
          onClick={addNotification}
        >
          <div>
            <h2>
              <HandRaise width="6rem" height="6rem" color="green" />
            </h2>
          </div>
        </button>
      ) : (
        <button
          id="hand-raise-btn"
          className="hr-btn-not-raised cf"
          onClick={addNotification}
        >
          <div>
            <h2>
              <HandRaise width="3rem" height="3rem" color="white" />
            </h2>
          </div>
        </button>
      )}
    </>
  );
}
