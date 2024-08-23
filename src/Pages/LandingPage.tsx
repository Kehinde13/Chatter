import NavBar from '../components/NavBar';
import Header from '../components/Header';
import AboutUs from '../components/AboutUs';
import WhyChatter from '../components/WhyChatter';
import JoinChetter from '../components/JoinChatter';
import Footer from '../components/Footer';


function LandingPage() {
    
    return (
        <div>
            <NavBar/>
            <Header />
            <AboutUs />
            <WhyChatter />
            <JoinChetter />
            <Footer />
        </div>
    );
}

export default LandingPage;
