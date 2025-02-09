import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import styles from "../styles/Heatmap.module.css"; // Import CSS

const Legend = () => {
    const [mounted, setMounted] = useState(false);
    const map = useMap();

    useEffect(() => {
        setMounted(true); // Set mounted to true after the component is mounted
    }, []);

    // Prevent rendering until mounted
    if (!mounted) {
        return null; // Don't render the component until it's mounted
    }

    useEffect(() => {
        if (!map) return;
        const legend = L.control({ position: "bottomright" });

        legend.onAdd = function () {
            let div = L.DomUtil.create("div", styles.legend);
            div.innerHTML = `
                <div>
                    <strong>COVID-19 Cases</strong><br />
                    <div class="${styles.legendBox} ${styles.low}"></div> Low<br />
                    <div class="${styles.legendBox} ${styles.moderate}"></div> Moderate<br />
                    <div class="${styles.legendBox} ${styles.high}"></div> High<br />
                </div>
            `;
            return div;
        };

        legend.addTo(map);

        return () => legend.remove();
    }, [map]);

    return null;
};

export default Legend;
