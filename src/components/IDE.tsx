import React, { useState, useRef, useEffect } from 'react'
import { invoke } from '@tauri-apps/api'
import Editor from '@monaco-editor/react'
import { useScriptideContext }  from '../contexts/ScriptideProvider';



import '../App.css'

export function IDE({ onChange, language, code, theme }:any ) {
  const [value, setValue] = useState(code || '');
  const editorRef = useRef<typeof Editor | null>(null)
  const {  socket } = useScriptideContext();


  useEffect(()=> {
  socket.emit('sent', value)
  socket.on('sending-to-front', (data: string) => {
  const newData = data
  setValue(newData)
  })}, [value])


  function handleEditorDidMount (editor: any , monaco: any) {
    editorRef.current = monaco

  }

  function handleChange (value: any) {
  const newState = value
  setValue(newState)
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

