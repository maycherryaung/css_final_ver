import Link from 'next/link';
import styles from '../styles/Home.module.css'; // Create this CSS file for the homepage styles

export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to the COVID-19 Dashboard</h1>
            <p className={styles.description}>Track the spread of COVID-19 across the world with an interactive heatmap.</p>

            {/* Navigate to Heatmap */}
            <div className={styles.navContainer}>
                <Link href="/heatmap">
                    <button className={styles.button}>Go to Heatmap</button>
                </Link>
            </div>
        </div>
    );
}
