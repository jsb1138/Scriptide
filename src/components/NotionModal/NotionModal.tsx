import './NotionModal.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useScriptideContext } from '../../contexts/ScriptideProvider';
import CloseCross from '../../assets/close.png';


function NotionModal() {
  const { notionModalIsOpen, setNotionModalIsOpen, userNotionId, setUserNotionId } = useScriptideContext();

  function handleClick() {
    setNotionModalIsOpen(false);
  }

  const exchangeCodeForAccessToken = async () => {
    const params = new URL(location.href).searchParams;
    const code = params.get('code');
    if (!code) return;
    setNotionModalIsOpen(true);
    const res = await fetch(
      `https://zi0hht29th.execute-api.eu-central-1.amazonaws.com/default/ScriptideNotionLogin?code=${code}`
    );
    const data = await res.json();
    if (data) {
      setUserNotionId(data);
    }
  };

  useEffect(() => {
    exchangeCodeForAccessToken();
  }, []);

  async function postToServer(
    valuePageTitle: string,
    valueBulletPoint: string
  ) {
    const url = `https://0bfp2hjwwd.execute-api.eu-central-1.amazonaws.com/Test/scriptidenotionpost-apiresource`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userID: userNotionId,
        valuePageTitle,
        valueBulletPoint,
      }),
    };
    try {
      await fetch(url, requestOptions);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valuePageTitle = event.currentTarget.notionPageTitle.value;
    const valueBulletPoint = event.currentTarget.notionBulletPoint.value;
    postToServer(valuePageTitle, valueBulletPoint);
    event.currentTarget.notionBulletPoint.value = "";
  }

  if (notionModalIsOpen) {
    return (
      <div className='notion-modal'>
        <div onClick={handleClick} className='cross'>
          <img id='close-cross-show' src={CloseCross} alt=' closing cross' />
        </div>
        {!userNotionId ? (
          <h3 className="nodal-show">Grant Access to Notion</h3>
        ) : (
          <h3 className="nodal-show">Post to Notion
            </h3>
        )}
        {!userNotionId ? (
          <a href='https://api.notion.com/v1/oauth/authorize?client_id=08b1c623-a965-4750-9a1e-11042ef8700f&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fnotion%2Fcallback'>
            <button id='notion-connect-button'>Connect to Notion</button>
          </a>
        ) : (
          <form onSubmit={handleSubmit} id='notion-form'>
            <input
              type='text'
              id='notionPageTitle'
              name='notionPageTitle'
              placeholder='Enter Page Title'
            />
            <textarea
              name='notionBulletPoint'
              id='notionBulletPoint'
              cols={28}
              rows={5}
              placeholder='This text will be added as a bulletpoint'
            ></textarea>
            <button id='notion-submit-button' type='submit'>
              Send
            </button>
          </form>
        )}
      </div>
    );
  } else {
    return (
       <div className='notion-modal-closed'>
        <div onClick={handleClick} className='cross'>
          <img id='close-cross-dont-show' src={CloseCross} alt=' closing cross' />
        </div>
        {!userNotionId ? (
          <h3 className='nodal-dont-show'>Grant Access to Notion</h3>
        ) : (
          <h3 className='nodal-dont-show'>Post to Notion
            </h3>
        )}
        {!userNotionId ? (
          <a href='https://api.notion.com/v1/oauth/authorize?client_id=08b1c623-a965-4750-9a1e-11042ef8700f&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fnotion%2Fcallback'>
            <button className='nodal-dont-show'>Connect to Notion</button>
          </a>
        ) : (
          <form onSubmit={handleSubmit} id='notion-form'>
            <input
              type='text'
              id='notionPageTitle'
              name='notionPageTitle'
              placeholder='Enter Page Title'
            />
            <textarea
              name='notionBulletPoint'
              id='notionBulletPoint'
              cols={28}
              rows={5}
              placeholder='This text will be added as a bulletpoint'
            ></textarea>
            <button id='notion-submit-button' type='submit'>
              Send
            </button>
          </form>
        )}
      </div>  );
  }
}

export default NotionModal;
