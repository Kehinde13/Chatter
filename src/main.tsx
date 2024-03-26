import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Context from './Context/Context.tsx'
import "react-toastify/dist/ReactToastify.css";
import 'react-quill/dist/quill.snow.css';
import "react-tagsinput/react-tagsinput.css";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Context>
     <App />
    </Context>
  </React.StrictMode>,
)
