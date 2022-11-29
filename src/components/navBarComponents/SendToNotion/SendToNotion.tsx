import './SendToNotion.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { L } from '@tauri-apps/api/event-2a9960e7';

// Notion Public Integration
const oauth_client_id = import.meta.env.VITE_NOTION_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

// Notion Internal Integration
interface Props {
  isOpen: boolean;
}

function SendToNotion({ isOpen }: Props) {

  useEffect(() => {
    const params = new URL(location.href).searchParams;
    const code = params.get('code');
    // console.log('Code is: ' + code);
    if (!code) return;
    fetch(`http://localhost:3001/notion-login/${code}`);
  }, []);

  async function postToServer(value: string) {
    const url = `http://localhost:3001/notion-proxy`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        value,
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
    const value = event.currentTarget.notionInput.value;
    postToServer(value);
  }

  return (
    <div id='send-to-notion' className={isOpen ? 'shown' : 'hidden'}>
        <a href='https://api.notion.com/v1/oauth/authorize?client_id=08b1c623-a965-4750-9a1e-11042ef8700f&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fnotion%2Fcallback'>
        First connect to your Notion.
      </a>
      <br />
      <form onSubmit={handleSubmit} id='notion-form'>
        <label htmlFor='notionInput'>
          Then take a note and send it to the chosen Page!
        </label>
        <textarea
          name='notionInput'
          id='notionInput'
          cols={30}
          rows={10}
          placeholder='This text will be added as a bulletpoint'
        ></textarea>
        <button type='submit'>Send</button>
      </form>
  
    </div>
  );
}

export default SendToNotion;
