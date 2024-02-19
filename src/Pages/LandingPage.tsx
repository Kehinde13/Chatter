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

  useEffect(() => {
   if(modal){
    document.body.style.overflow = 'hidden'
   } else {
    document.body.style.overflow = 'auto'
   }
  }, [modal])
  return (
    <div>
        <AuthModal modal={modal} setModal={setModal}/>
        <NavBar modal={modal} setModal={setModal}/>
        <Header />
        <AboutUs />
        <WhyChatter />
        <JoinChetter />
        <Footer />
    </div>
  )
}

export default LandingPage