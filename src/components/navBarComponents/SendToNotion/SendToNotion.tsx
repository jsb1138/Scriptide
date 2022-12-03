import './SendToNotion.css';
import React from 'react';
import { useEffect, useState } from 'react';
import NotionLogo from "../../../assets/Notion_app_logo.png"

interface Props {
  isOpen: boolean;
}

function SendToNotion({ isOpen }: Props) {
  const [userNotionId, setUserNotionId] = useState(null);

  const exchangeCodeForAccessToken = async () => {
    const params = new URL(location.href).searchParams;
    const code = params.get('code');
    if (!code) return;
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
  }

  return (
    <div id='send-to-notion' className={isOpen ? 'shown' : 'hidden'}>
      <div id="notion-connect">
      <p>Connect</p>
      <img id="notion-logo" src={NotionLogo} alt="Notion Logo" />
      </div>
      <br/>
      {/* Fallback is still Localhost!! */}
      <a href='https://api.notion.com/v1/oauth/authorize?client_id=08b1c623-a965-4750-9a1e-11042ef8700f&response_type=code&owner=user&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fnotion%2Fcallback'>
        First connect to your Notion.
      </a>
      <br />
      <form onSubmit={handleSubmit} id='notion-form'>
        <label htmlFor='notionPageTitle'> Enter the Page Title</label>
        <input type='text' id='notionPageTitle' name='notionPageTitle' />
        <label htmlFor='notionBulletPoint'>
          Then take a note and send it to the chosen Page!
        </label>
        <textarea
          name='notionBulletPoint'
          id='notionBulletPoint'
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
