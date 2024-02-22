import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleLeft, faXmark, faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import Context from './Context/Context.tsx'
import "react-toastify/dist/ReactToastify.css";


library.add(faAngleLeft, faXmark, faGoogle, faEnvelope)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Context>
     <App />
    </Context>
  </React.StrictMode>,
)
