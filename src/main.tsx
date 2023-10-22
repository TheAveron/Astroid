import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/router'
import './assets/css/index.css'

ReactDOM.createRoot(document.getElementById('body')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
