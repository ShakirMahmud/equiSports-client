import React, { useEffect, useRef, useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ThemeContext } from "../provider/ThemeProvider";


const StoreLocationMap = () => {
    const mapContainerRef = useRef(null);
    const { isDarkMode } = useContext(ThemeContext);
    const mapRef = useRef(null); 

    useEffect(() => {
        // Initialize the map only once
        if (!mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current).setView([23.7607345, 90.4119843], 14);
        }

        // Dynamically set the tile layer based on the current theme
        const tileLayerUrl = isDarkMode
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark mode tiles
            : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"; // Light mode tiles


        const tileLayer = L.tileLayer(tileLayerUrl, {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        });

        // Clear existing layers and add the new tile layer
        mapRef.current.eachLayer((layer) => mapRef.current.removeLayer(layer));
        tileLayer.addTo(mapRef.current);

        // Add the marker
        const defaultIcon = new L.Icon({
            iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
        });

        const marker = L.marker([23.7607345, 90.4119843], { icon: defaultIcon });
        marker.bindPopup("<b>EquiSports Shop Location</b>").openPopup();
        marker.addTo(mapRef.current);
    }, [isDarkMode]); // Re-run when theme changes

    return (
        <div className="py-16 bg-lightBg dark:bg-darkBg">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-lightText dark:text-darkText">
                    Visit Us!
                </h2>
                <p className="text-lg text-subtitleText dark:text-gray-400">
                    Find our physical store location on the map below.
                </p>
            </div>

            <div
                ref={mapContainerRef}
                style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "12px",
                }}
                className="border border-gray-300 shadow-md dark:border-gray-700 dark:shadow-gray-900"
            ></div>
        </div>
    );
};

export default StoreLocationMap;
