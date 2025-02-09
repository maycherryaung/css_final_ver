import { useEffect, useState, memo } from "react";
import dynamic from "next/dynamic";
import { ClockLoader } from "react-spinners"; // Import ClockLoader
import styles from "../styles/Heatmap.module.css";
import Legend from './Legend'; // Import the Legend component

// MUI components
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material"; // Import MUI Select and MenuItem

// Dynamically import LeafletMap to disable SSR
const LeafletMap = dynamic(() => import("../components/LeafletMap"), { ssr: false });

const Heatmap = () => {
    const [covidData, setCovidData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [selectedLayer, setSelectedLayer] = useState("total"); // Default to 'total'

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
                    setFilteredData(data); // Initially set the full data
                }
            } catch (err) {
                setError(true);
                console.error("Error fetching data:", err.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        // Filter the data based on selected data layer (Total, Active, Deaths)
        setFilteredData(covidData.map(country => ({
            ...country,
            value: country[selectedLayer], // Select the correct value based on the selected layer
        })));
    }, [selectedLayer, covidData]);

    async function getCovidData() {
        const url = "https://disease.sh/v3/covid-19/countries";
        const response = await fetch(url);
        const data = await response.json();

        return data.map((country) => ({
            Country: country.country,
            TotalConfirmed: country.cases,
            ActiveCases: country.active,
            Deaths: country.deaths,
            lat: country.countryInfo.lat,
            lon: country.countryInfo.long,
            CasesByYear: country.timeline ? country.timeline.cases : {}, // Adding historical data
        }));
    }

    // Layer toggle handler
    const handleLayerChange = (event) => {
        setSelectedLayer(event.target.value);
    };

    if (loading) {
        return (
            <div className={styles.loaderContainer}>
                <ClockLoader color="#2A9D8F" size={100} />
                <p>Fetching data...</p>
            </div>
        );
    }

    if (error) return <h2 className={styles.error}>Error fetching data. Please try again later.</h2>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>COVID-19 Interactive Heatmap</h1>
            
            {/* Data Layer Filter Dropdown (using MUI) */}
            <div className={styles.layerFilter}>
                <FormControl variant="outlined">
                    <InputLabel>Filter by</InputLabel>
                    <Select
                        value={selectedLayer}
                        onChange={handleLayerChange}
                        label="Filter by"
                        className={styles.select}
                    >
                        <MenuItem value="total">Total Cases</MenuItem>
                        <MenuItem value="active">Active Cases</MenuItem>
                        <MenuItem value="deaths">Deaths</MenuItem>
                    </Select>
                </FormControl>
            </div>

            {/* Render the map with filtered data */}
            <LeafletMap data={filteredData} selectedLayer={selectedLayer} />
            
            {/* Only render the Legend once the map has loaded */}
            {!loading && <div className={styles.legendContainer}><Legend /></div>}
        </div>
    );
};

export default memo(Heatmap);
