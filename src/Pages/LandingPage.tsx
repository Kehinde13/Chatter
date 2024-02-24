import NavBar from '../components/NavBar'
import Header from '../components/Header'
import AboutUs from '../components/AboutUs'
import WhyChatter from '../components/WhyChatter'
import JoinChetter from '../components/JoinChatter'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import AuthModal from '../Auth/AuthModal'

function LandingPage() {
  const [modal, setModal] = useState<boolean>(false)
  const [modalText, setModalText] = useState<string>("")

  useEffect(() => {
   if(modal){
    document.body.style.overflow = 'hidden'
   } else {
    document.body.style.overflow = 'auto'
   }
  }, [modal])
  return (
    <div className='dark:bg-slate-800 dark:text-white'>
        <AuthModal modal={modal} setModal={setModal} text={modalText}/>
        <NavBar modal={modal} setModal={setModal} setModalText={setModalText}/>
        <Header />
        <AboutUs />
        <WhyChatter />
        <JoinChetter />
        <Footer />
    </div>
  )
}

export default LandingPage