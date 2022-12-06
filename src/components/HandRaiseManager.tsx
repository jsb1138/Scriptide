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

export default function HandRaiseManager() {
  const {
    isClicked,
    setIsClicked,
    currentUserId,
    setUserIsMuted,
    initiator,
    userIsMuted,
    userIsLocked,
    setUserIsLocked,
  } = useScriptideContext();

  const { muted, toggleMute } = useToggleLocalMute();

  const unmutedUsers = useStorage((root: any) => root.unmutedAttendees);
  const unlockedUsers = useStorage((root: any) => root.unlockedAttendees);
  console.log("unmuted users --->", unmutedUsers);
  console.log("unlocked users --->", unlockedUsers);
  console.log("THIS user --->", currentUserId);

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

  /////HANDLING USER MUTING --> CONTROLS
  const updateUnmutedList = useMutation(
    ({ storage }: any, userToUnmuteOrMute: string) => {
      const mutableUnmutedList = storage.get("unmutedAttendees");
      const arrayCopy = [...mutableUnmutedList];
      if (arrayCopy.includes(userToUnmuteOrMute)) {
        ///// if they ARE in the unmuted array
        mutableUnmutedList.delete(
          ////// delete them from UNMUTED
          mutableUnmutedList.findIndex(
            (user: string) => user == userToUnmuteOrMute
          )
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
          ////// delete them from UNLOCKED
          mutableUnlockedList.findIndex(
            (user: string) => user == userToLockOrUnlock
          )
        );
        if (userToLockOrUnlock == currentUserId) setUserIsLocked(true); /////// and set them as LOCKED
      } else if (!arrayCopy.includes(userToLockOrUnlock)) {
        ///// if they ARE NOT in the unmuted array
        mutableUnlockedList.push(userToLockOrUnlock);
        ////// push them into UNLOCKED
        if (userToLockOrUnlock == currentUserId) setUserIsLocked(false); /////// and set them as UNlocked
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
        console.log("4 this should be true ->", userIsLocked);
      }
      //////
      //////
      //////
      //////
      //////
      //////
    }
  }, [unlockedUsers]);

  return (
    <div id="hands">
      <ul>
        {hands.map((student: any, i: number) => (
          <li>
            {student.name}
            <div id="hand-ctrls">
              <button
                onClick={() => updateUnmutedList(student.id)}
                className="cf"
              >
                {unmutedUsers.includes(student.id) ? (
                  <Microphone />
                ) : (
                  <Microphone muted />
                )}
              </button>
              <button
                onClick={() => updateUnlockedList(student.id)}
                className="cf"
              >
                {unlockedUsers.includes(student.id) ? <Lock /> : <Lock />}
              </button>
              <button onClick={() => removeRaisedHand(i)} className="cf">
                <Clear />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
