// lib/GetCovidData.js

import axios from "axios";

export async function getCovidData() {
    try {
        const response = await axios.get("https://disease.sh/v3/covid-19/countries", {
            params: {
                per_page: 10,      // Adjust the number of results per page
                sort: "desc",      // Sort by most recent reports
            }
        });

        console.log("API Response:", response.data);  // Log the data structure for debugging

        // Process the response data
        let covidData = response.data.map(report => ({
            country: report.country,
            lat: report.countryInfo.lat,
            lon: report.countryInfo.long,
            totalCases: report.cases,
            totalDeaths: report.deaths,
            totalRecovered: report.recovered,
        }));

        return covidData;
    } catch (error) {
        console.error("Error fetching COVID data:", error.message);
        return [];
    }
}

