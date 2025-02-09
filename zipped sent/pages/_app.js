import Navbar from '../components/Navbar'; // Import Navbar
import Footer from '../components/Footer'; // Import Footer
import '../styles/global.css'; // Global Styles

export default function App({ Component, pageProps }) {
    return (
        <div>
            <Navbar /> {/* Display Navbar on every page */}
            <Component {...pageProps} />
            <Footer /> {/* Display Footer on every page */}
        </div>
    );
}
