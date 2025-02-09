import styles from "../styles/Legend.module.css"; // Assuming you have a separate CSS file for the Legend

const Legend = () => {
    return (
        <div className={styles.legendContainer}>
            <p><b>COVID-19 Cases by Country</b></p>
            <div className={styles.legendItem}>
                <div className={styles.colorBox} style={{ backgroundColor: 'green' }}></div>
                <span>0–500 Cases</span>
            </div>
            <div className={styles.legendItem}>
                <div className={styles.colorBox} style={{ backgroundColor: 'yellow' }}></div>
                <span>500–5000 Cases</span>
            </div>
            <div className={styles.legendItem}>
                <div className={styles.colorBox} style={{ backgroundColor: 'orange' }}></div>
                <span>5000–50000 Cases</span>
            </div>
            <div className={styles.legendItem}>
                <div className={styles.colorBox} style={{ backgroundColor: 'red' }}></div>
                <span>50000+ Cases</span>
            </div>
            <div className={styles.legendItem}>
                <div className={styles.colorBox} style={{ backgroundColor: 'gray' }}></div>
                <span>No Data</span>
            </div>
        </div>
    );
};

export default Legend;
