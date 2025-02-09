import Link from 'next/link';
import styles from '../styles/Navbar.module.css'; // Import Navbar styles

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <Link href="/">Covid</Link>
            <div>
                <Link href="/">Home</Link>
                <Link href="/dashboard_home">Live Data</Link>
                <Link href="/heatmap">Interactive Heatmap</Link>
                <Link href="/maychart">Covid in Singapore</Link>
                <Link href="/heatmap">About Covid</Link>
            </div>
        </div>
    );
};

export default Navbar;

