import { useState } from 'react';
import { useScriptideContext } from './contexts/ScriptideProvider';

// context
import ScriptideProvider from './contexts/ScriptideProvider';

//components
import { IDE } from './components/IDE';
import { OutputWindow } from './components/OutputWindow';
import { OutputDetails } from './components/OutputDetails';
import Porthole from './components/Porthole';
import { ThemeDropdown } from './components/ThemeDropdown';
import { LanguageDropdown } from './components/LanguageDropdown';
import { SideBar } from './components/SideBar';

//dependencies
import React, { useEffect, SetStateAction } from 'react';
import axios from 'axios';
import { invoke } from '@tauri-apps/api';
import { ToastContainer, toast } from 'react-toastify';
import { window as tauriWindow } from '@tauri-apps/api';


//css
import './App.css';

//utility
import { languageOptions } from './constants/languageOptions';
import { defineTheme } from './lib/defineTheme.js';
import useKeyPress from './hooks/useKeyPress';
import NavBar from './components/navBarComponents/NavBar';

//constants
const submissions = import.meta.env.VITE_RAPIDAPI_SUBMISSIONS;
const host = import.meta.env.VITE_RAPIDAPI_HOST;
const key = import.meta.env.VITE_RAPIDAPI_KEY;

export default function App() {
  const {
    processing,
    setProcessing,
    language,
    setLanguage,
    code,
    setCode,
    theme,
    setTheme,
    outputDetails,
    setOutputDetails,
  } = useScriptideContext();

  const enterPress = useKeyPress('Enter');
  const ctrlPress = useKeyPress('Control');

  const noDragSelector = 'input, a, button';
  document.addEventListener('mousedown', async (mouseDown: any) => {
    if (mouseDown.target.closest(noDragSelector)) {
      return;
    }
    await tauriWindow.appWindow.startDragging();
  });

  function handleCompile() {
    //@ts-ignore
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(''),
    };
    console.log(formData);
    const options = {
      method: 'POST',
      url: submissions,
      params: { base64_encoded: true, fields: '*' },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': host,
        'X-RapidAPI-KEY': key,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response: any) {
        console.log('res.data: ', response.data);
        const token = response.data.token;
        console.log('token: ', token);
        checkStatus(token);
      })
      .catch((err: any) => {
        console.log(options);
        let error = err.response ? err.response.data : err;
        //@ts-ignore
        setProcessing(false);
        console.log({ error });
      });
  }

  async function checkStatus(token: any) {
    const options = {
      method: 'GET',
      url: submissions + '/' + token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Host': host,
        'X-RapidAPI-Key': key,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        //@ts-ignore
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log('response.data', response.data);
        return;
      }
    } catch (err: any) {
      console.log('err', err);
      //@ts-ignore
      setProcessing(false);
      showErrorToast(err);
    }
  }

  function showSuccessToast(message: string) {
    toast.success(message || 'Compiled Successfuly', {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }

  function showErrorToast(message: string) {
    toast.error(message || 'Compile Failed', {
      position: 'top-left',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }

  function onSelectChange(select: SetStateAction<any>) {
    console.log('selected: ', select);
    setLanguage(select);
  }

  function onChange(action: any, data: any) {
    switch (action) {
      case 'code': {
        setCode(data);
        break;
      }
      default: {
        console.warn('case not handled: ', action, data);
      }
    }
  }

  function handleThemeChange(th: any) {
    const theme = th;
    console.log('theme: ', theme);

    if (['light', 'vs-dark'].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_: any) => setTheme(theme.value));
    }
  }
  const holes = ['cam', 'ide', 'grid'];

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log('enter: ', enterPress);
      console.log('control: ', ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  return (
    // <div data-tauri-drag-region>
    <div className='App'>
      <header data-tauri-drag-region className='App-header'>
        <button>Sign Out</button>
        <button>Start Meeting</button>
      </header>
      <div id='App-main'>
        <NavBar />
        {/* <div id="menu-container">
          <div id="menu">
          </div>
          <button id="menu-btn">▸</button>
        </div> */}
        {holes.map((hole, i) => (
          <Porthole key={`${hole}+${i}`} hole={hole} />
        ))}
      </div>
    </div>
    // </div>
  );
}
