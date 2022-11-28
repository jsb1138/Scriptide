import React, { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import tauri from './assets/tauri.png'
import { invoke } from '@tauri-apps/api'
import Editor from '@monaco-editor/react'

import '../App.css'

export function IDE({ onChange, language, code, theme }:any ) {
  const [value, setValue] = useState(code || '');
  const editorRef = useRef<typeof Editor | null>(null)

  function handleChange (value: any) {
    setValue(value)
    onChange('code', value);
  }

  function handleEditorDidMount (editor: any , monaco: any) {
    editorRef.current = monaco
    
  }

  // invoke('greet', { name: 'World'}).then((response) => {console.log(response)})
  

  return (
        // <div id='center-flex'>
        <Editor
        height="90vh"
        width="75vw"
        onMount={handleEditorDidMount}
        onChange={handleChange}
        language={language || 'javascript'}
        value={value} theme='vs-dark'
        defaultValue='//happy coding'
        />
      // </div>
  )
}

