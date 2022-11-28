import './SendToNotion.css';
import React from 'react';

interface Props {
  isOpen: boolean;
}

function SendToNotion({ isOpen }: Props) {
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
      <form onSubmit={handleSubmit} id='notion-form'>
        <label htmlFor='notionInput'>
          Take a note and send it to your Notion!
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
