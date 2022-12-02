import React, { useState, useRef, useEffect } from 'react'
import { invoke } from '@tauri-apps/api'
import Editor from '@monaco-editor/react'
import { useScriptideContext }  from '../contexts/ScriptideProvider';
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { MonacoBinding } from 'y-monaco';


import '../App.css'

export function IDE({ onChange, language, code, theme }:any ) {
  const [value, setValue] = useState(code || '');
  const [nextValue, setNextValue] = useState(code || '');
  const editorRef = useRef<typeof Editor | null >(null)





  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider('scriptide', ydoc);
  const type = ydoc.getText('monaco')

  provider.on('status', (event: { status: any; }) => {
    console.log(event.status) // logs "connected" or "disconnected"
  })



  function handleEditorDidMount (editor: any , monaco: any) {
    editorRef.current = monaco
    console.log('I fired')
    console.log(editor.getModel());
    const monacoBinding = new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness)

  }








  return (
        <Editor
        height="90vh"
        width="75vw"
        onMount={handleEditorDidMount}
        language={language || 'javascript'}
        value={value} theme='vs-dark'
        defaultValue='//happy coding'
        />
  )
}

