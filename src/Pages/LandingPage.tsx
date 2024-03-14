import NavBar from '../components/NavBar';
import Header from '../components/Header';
import AboutUs from '../components/AboutUs';
import WhyChatter from '../components/WhyChatter';
import JoinChetter from '../components/JoinChatter';
import Footer from '../components/Footer';
import AuthModal from '../Auth/AuthModal';
import { useState } from 'react';


function LandingPage() {
    const [modal, setModal] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>('');

    
    return (
        <div>
            <AuthModal modal={modal} setModal={setModal} text={modalText} />
            <NavBar modal={modal} setModal={setModal} setModalText={setModalText} />
            <Header />
            <AboutUs />
            <WhyChatter />
            <JoinChetter />
            <Footer />
        </div>
    );
}

export default LandingPage;
