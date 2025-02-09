// components/Navbar.jsx

import Link from "next/link";
import styles from "../styles/Navbar.module.css"; // Import CSS

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">Covid</Link>
            </div>
            <ul className={styles.navLinks}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/heatmap">Interactive Heatmap</Link></li>
                <li><Link href="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
