import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

const LeafletMap = ({ data }) => {
    useEffect(() => {
        if (!data || data.length === 0) return;

        const map = L.map("map").setView([20, 0], 2);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
        }).addTo(map);

        // Prepare heatmap data
        const heatData = data
            .filter((country) => country.lat && country.lon)
            .map((country) => [
                country.lat,
                country.lon,
                country.TotalConfirmed / 500000, 
            ]);

        if (L.heatLayer) {
            L.heatLayer(heatData, { radius: 35, blur: 25 }).addTo(map);
        }

        // Add markers
        data.forEach(async (country) => {
            if (country.lat && country.lon) {
                const marker = L.circleMarker([country.lat, country.lon], {
                    color: "red",
                    fillColor: "red",
                    fillOpacity: 0.5,
                    radius: 7,
                }).addTo(map);

                marker.bindPopup(
                    `<b>${country.Country}</b><br>Total Cases: ${country.TotalConfirmed}`
                );
            }
        });

        return () => {
            map.remove(); 
        };
    }, [data]);

    return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
};

export default LeafletMap;
