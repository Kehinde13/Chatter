import NavBar from '../components/NavBar';
import Header from '../components/Header';
/* import AboutUs from '../components/AboutUs';
import WhyChatter from '../components/WhyChatter';
import JoinChetter from '../components/JoinChatter'; */
import Footer from '../components/Footer';
import CardContainer from '../components/CardContainer';


function LandingPage() {
    
    return (
        <div>
            <NavBar/>
            <Header />
            <CardContainer />
            {/* <AboutUs />
            <WhyChatter />
            <JoinChetter /> */}
            <Footer />
        </div>
    );
}

export default LandingPage;
