import { useEffect, useState, memo } from "react";
import dynamic from "next/dynamic";
import { TailSpin } from "react-loader-spinner";
import styles from "../styles/global.css";

// Dynamically import LeafletMap to disable SSR
const LeafletMap = dynamic(() => import("../components/LeafletMap"), { ssr: false });

const Heatmap = () => {
    const [covidData, setCovidData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const data = await getCovidData();
                console.log("Fetched Data: ", data);
                if (data.length === 0) {
                    setError(true);
                } else {
                    setCovidData(data);
                }
            } catch (err) {
                setError(true);
                console.error("Error fetching data:", err.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    async function getCovidData() {
        const url = "https://disease.sh/v3/covid-19/countries";
        const response = await fetch(url);
        const data = await response.json();

        return data.map((country) => ({
            Country: country.country,
            TotalConfirmed: country.cases,
            lat: country.countryInfo.lat,
            lon: country.countryInfo.long,
        }));
    }

    if (loading) {
        return (
            <div className={styles.loaderContainer}>
                <TailSpin color="#3498db" height={80} width={80} />
                <p>Fetching data...</p>
            </div>
        );
    }

    if (error) return <h2 className={styles.error}>Error fetching data. Please try again later.</h2>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>COVID-19 Interactive Heatmap</h1>
            <LeafletMap data={covidData} />
        </div>
    );
};

export default memo(Heatmap);
