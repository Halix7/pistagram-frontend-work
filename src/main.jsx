import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {BrowserRouter as Router } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <Router>

     <GoogleOAuthProvider
                
                clientId={import.meta.env.VITE_CLIENT_ID}
                >

    <App />
            </GoogleOAuthProvider>
              </Router>
  </React.StrictMode>,
)
