// components/Home.jsx

import Link from 'next/link';
import styles from '../styles/Home.module.css'; // Import Home Page Styles

export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to the COVID-19 Dashboard</h1>
            <p className={styles.description}>
                Track the spread of COVID-19 across the world with our tools!
            </p>
            <div className={styles.navContainer}>
                <Link href="/heatmap">
                    <button className={styles.button}>Learn more</button>
                </Link>
            </div>
        </div>
    );
}
