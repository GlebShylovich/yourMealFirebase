import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { initializeApp } from "firebase/app"
import config from '../config.js'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

initializeApp(config)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
