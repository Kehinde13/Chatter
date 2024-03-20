import NavBar from '../components/NavBar';
import Header from '../components/Header';
import AboutUs from '../components/AboutUs';
import WhyChatter from '../components/WhyChatter';
import JoinChetter from '../components/JoinChatter';
import Footer from '../components/Footer';
import { useState } from 'react';


function LandingPage() {
    const [dropdown, setDropdown] = useState<boolean>(false);
    
    return (
        <div>
            <NavBar  dropdown={dropdown} setDropdown={setDropdown}/>
            <Header dropdown={dropdown}/>
            <AboutUs />
            <WhyChatter />
            <JoinChetter />
            <Footer />
        </div>
    );
}

export default LandingPage;
