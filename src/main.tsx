import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faAngleLeft, 
  faAngleRight,
  faXmark, 
  faEnvelope,
  faMagnifyingGlass,
  faBell,
  faBookBookmark,
  faHouseChimneyUser,
  faPeopleGroup,
  faEnvelopeOpen, 
  faChartLine,
  faUser,
  faSave,
  faEllipsis,
  faHeart,
  faComment,
  faUpRightFromSquare,
  faCopy,
  faBars,
} from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import Context from './Context/Context.tsx'
import "react-toastify/dist/ReactToastify.css";
import 'react-quill/dist/quill.snow.css';
import "react-tagsinput/react-tagsinput.css";


library.add(
  faCopy,
  faAngleLeft, 
  faAngleRight,
  faXmark, 
  faGoogle, 
  faEnvelope, 
  faMagnifyingGlass, 
  faBell,
  faBookBookmark,
  faHouseChimneyUser,
  faPeopleGroup,
  faEnvelopeOpen, 
  faChartLine,
  faUser,
  faSave,
  faEllipsis,
  faHeart,
  faComment,
  faUpRightFromSquare,
  faFacebook,
  faTwitter,
  faLinkedin,
  faBars  )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Context>
     <App />
    </Context>
  </React.StrictMode>,
)
