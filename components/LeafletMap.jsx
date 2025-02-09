import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat"; // Import Leaflet heatmap functionality
import geoJson from "custom.geo.json"; // Import GeoJSON file
import chroma from 'chroma-js';

// Color mapping function based on selected data layer (total, active, or deaths)
const getColor = (cases) => {
    const scale = chroma.scale(['green', 'yellow', 'orange', 'red'])
        .domain([0, 5000, 50000, 1000000]);

    return scale(cases).hex();
};

const LeafletMap = ({ data, selectedLayer }) => {
    useEffect(() => {
        if (!data || data.length === 0) return;

        const map = L.map("map").setView([20, 0], 2);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        }).addTo(map);

        const geoLayer = L.geoJSON(geoJson, {
            style: (feature) => {
                const countryData = data.find((country) => country.Country === feature.properties.name);
                let color;
                switch (selectedLayer) {
                    case "total":
                        color = countryData ? getColor(countryData.TotalConfirmed) : 'gray';
                        break;
                    case "active":
                        color = countryData ? getColor(countryData.ActiveCases) : 'gray';
                        break;
                    case "deaths":
                        color = countryData ? getColor(countryData.Deaths) : 'gray';
                        break;
                    default:
                        color = 'gray';
                }

                return {
                    fillColor: color,
                    weight: 1,
                    opacity: 0.6,
                    color: 'white',
                    fillOpacity: 0.7,
                };
            },
            onEachFeature: (feature, layer) => {
                const countryData = data.find((country) => country.Country === feature.properties.name);
                
                if (countryData) {
                    layer.on("mouseover", (e) => {
                        const layer = e.target;
                        layer.setStyle({
                            weight: 3,
                            color: '#666',
                            fillOpacity: 0.9
                        });

                        let countryCardContent = `
                            <div class="country-card">
                                <h3>${feature.properties.name}</h3>
                        `;

                        // Show data based on selected layer
                        const cases = selectedLayer === "total" ? countryData.TotalConfirmed :
                            selectedLayer === "active" ? countryData.ActiveCases :
                            selectedLayer === "deaths" ? countryData.Deaths : 0;

                        countryCardContent += `<p><strong>${selectedLayer === "total" ? "Total Cases" :
                            selectedLayer === "active" ? "Active Cases" : "Deaths"}:</strong> ${cases || "No Data"}</p>`;
                        countryCardContent += `</div>`;

                        layer.bindPopup(countryCardContent).openPopup();
                    });

                    layer.on("mouseout", (e) => {
                        geoLayer.resetStyle(e.target);
                    });
                }
            }
        }).addTo(map);

        return () => {
            map.remove();
        };
    }, [data, selectedLayer]);

    return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default LeafletMap;

// import { useEffect, useState } from "react";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import "leaflet.heat"; // Import Leaflet heatmap functionality
// import geoJson from "custom.geo.json"; // Import GeoJSON file
// import chroma from "chroma-js"; // Color scale library

// // Color mapping function based on total confirmed cases
// const getColor = (cases) => {
//     const scale = chroma
//         .scale(["green", "yellow", "orange", "red"])
//         .domain([0, 10000, 100000, 1000000, 10000000]);  // Adjusted the ranges for better distribution

//     return scale(cases).hex();
// };

// const LeafletMap = ({ data }) => {
//     const [selectedYear, setSelectedYear] = useState(2025);
//     const [mapData, setMapData] = useState(data);

//     useEffect(() => {
//         if (!mapData || mapData.length === 0) return;

//         // Initialize the map
//         const map = L.map("map").setView([20, 0], 2);

//         // Add tile layer (background map)
//         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
//         }).addTo(map);

//         // Prepare the GeoJSON layer for countries
//         const geoLayer = L.geoJSON(geoJson, {
//             style: (feature) => {
//                 const countryData = mapData.find((country) => country.Country === feature.properties.name);
//                 const color = countryData ? getColor(countryData.TotalConfirmed) : "gray"; // Default to gray if no data

//                 return {
//                     fillColor: color,
//                     weight: 1,
//                     opacity: 0.6,
//                     color: "white",
//                     fillOpacity: 0.7,
//                 };
//             },
//             onEachFeature: (feature, layer) => {
//                 const countryData = mapData.find((country) => country.Country === feature.properties.name);

//                 if (countryData) {
//                     // Set up hover effect and country card display
//                     layer.on("mouseover", (e) => {
//                         const layer = e.target;
//                         layer.setStyle({
//                             weight: 3,
//                             color: "#666",
//                             fillOpacity: 0.9,
//                         });

//                         // Get the cases for the selected year (this is where your data might change per year)
//                         const selectedYearData = countryData[selectedYear] || 0; // Adjust for actual data structure
//                         const countryCard = `
//                             <div class="country-card">
//                                 <h3>${feature.properties.name}</h3>
//                                 <p><strong>Total Cases (${selectedYear}):</strong> ${selectedYearData}</p>
//                                 <p><strong>Population:</strong> ${countryData.Population}</p>
//                             </div>
//                         `;

//                         layer.bindPopup(countryCard).openPopup();
//                     });

//                     // Reset country style on mouseout
//                     layer.on("mouseout", (e) => {
//                         geoLayer.resetStyle(e.target);
//                     });
//                 }
//             },
//         }).addTo(map);

//         // Cleanup on unmount
//         return () => {
//             map.remove();
//         };
//     }, [mapData, selectedYear]); // Added selectedYear to re-run the effect when the year changes

//     return (
//         <div>
//             <div id="map" style={{ width: "100%", height: "500px" }}></div>

//             {/* Legend */}
//             <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
//                 <div style={{ margin: "0 10px" }}>
//                     <span style={{ backgroundColor: "green", padding: "5px" }}></span> 0-500 Cases
//                 </div>
//                 <div style={{ margin: "0 10px" }}>
//                     <span style={{ backgroundColor: "yellow", padding: "5px" }}></span> 500-5000 Cases
//                 </div>
//                 <div style={{ margin: "0 10px" }}>
//                     <span style={{ backgroundColor: "orange", padding: "5px" }}></span> 5000-50000 Cases
//                 </div>
//                 <div style={{ margin: "0 10px" }}>
//                     <span style={{ backgroundColor: "red", padding: "5px" }}></span> 50000+ Cases
//                 </div>
//                 <div style={{ margin: "0 10px" }}>
//                     <span style={{ backgroundColor: "gray", padding: "5px" }}></span> No Data
//                 </div>
//             </div>

//             {/* Timeline Slider */}
//             <div style={{ textAlign: "center", marginTop: "20px" }}>
//                 <input
//                     type="range"
//                     min="2020"
//                     max="2025"
//                     value={selectedYear}
//                     onChange={(e) => setSelectedYear(e.target.value)}
//                     style={{ width: "100%" }}
//                 />
//                 <div style={{ fontWeight: "bold" }}>Year: {selectedYear}</div>
//             </div>
//         </div>
//     );
// };

// export default LeafletMap;
