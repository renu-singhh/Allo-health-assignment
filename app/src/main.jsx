import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createGlobalStyle } from 'styled-components'
const GlobalStyle=createGlobalStyle`

*{
 box-sizing:border-box;
 margin:0;
 padding:0;
}
`;
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
