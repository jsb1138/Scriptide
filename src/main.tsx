import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ScriptideProvider from './contexts/ScriptideProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <ScriptideProvider>
      <App />
    </ScriptideProvider>
  </>
)
