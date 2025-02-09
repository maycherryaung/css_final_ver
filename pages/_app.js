// pages/_app.js

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/global.css';
import '../styles/styles.css';
import '../styles/Chart.module.css';

export default function App({ Component, pageProps }) {
    return (
        <div className="bg-gray-50 text-gray-800 min-h-screen">
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </div>
    );
}
