// components/Footer.jsx

import styles from "../styles/Footer.module.css"; // Import CSS

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>&copy; 2025 MyWebsite. All Rights Reserved.</p>
            <div className={styles.socialLinks}>
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
            </div>
        </footer>
    );
};

export default Footer;
