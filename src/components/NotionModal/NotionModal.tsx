import './NotionModal.css';
import React from 'react';
import {useState} from "react";
import { useScriptideContext } from '../../contexts/ScriptideProvider';

function NotionModal() {
  const { notionModalIsOpen, setNotionModalIsOpen } = useScriptideContext();
  const [userNotionId, setUserNotionId] = useState(null);

  function handleClick() {
    setNotionModalIsOpen(false);
  }

  if (notionModalIsOpen) {
    return (
      <div className='notion-modal'>
        <div onClick={handleClick} className='cross'>
          X
        </div>
        {!userNotionId ? <h3>Grant Access to Notion</h3> : <h3></h3>}
      </div>
    );
  } else {
    return null;
  }
}

export default NotionModal;
