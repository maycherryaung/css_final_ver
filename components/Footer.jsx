// components/Footer.jsx
import styles from '../styles/Footer.module.css'; // Import Footer styles

const Footer = () => {
    return (
        <div className={styles.footer}>
            <p>&copy; 2025 CSS Assignment. By Jia Qi, Abin, May, Janice</p>
            <p>Learn more from other sources:</p>
            <p>
                <a href="https://data.who.int/dashboards/covid19/data">WHO</a> | <a href="https://www.worldometers.info/coronavirus/">Worldometer</a> | <a href="https://covid.cdc.gov/covid-data-tracker/#datatracker-home">CDC</a>
            </p>
        </div>
    );
};

export default Footer;
