import React, { useEffect, useRef, useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ThemeContext } from "../provider/ThemeProvider";
import { FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope } from "react-icons/fa";

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

        // Clear existing layers and add the new tile layer
        mapRef.current.eachLayer((layer) => mapRef.current.removeLayer(layer));
        
        const tileLayer = L.tileLayer(tileLayerUrl, {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        });
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
    }, [isDarkMode]); 

    return (
        <div className="py-16 bg-lightBg dark:bg-darkBg">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-lightText dark:text-darkText mb-4">
                        Visit Our Store
                    </h2>
                    <p className="text-base md:text-lg text-subtitleText dark:text-gray-400 max-w-2xl mx-auto">
                        Discover our physical location and get ready to elevate your sports experience with premium equipment and expert advice.
                    </p>
                </div>

                {/* Store Location Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Store Information Column */}
                    <div className="bg-white dark:bg-darkCard rounded-2xl shadow-lg p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center mb-6">
                                <FaMapMarkerAlt className="text-accentColor text-3xl mr-4" />
                                <div>
                                    <h3 className="text-xl font-bold text-lightText dark:text-darkText">
                                        EquiSports Flagship Store
                                    </h3>
                                    <p className="text-subtitleText dark:text-gray-300">
                                        123 Sports Avenue, Dhaka, Bangladesh
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <FaClock className="text-accentColor text-xl mr-4" />
                                    <div>
                                        <h4 className="font-semibold text-lightText dark:text-darkText">
                                            Store Hours
                                        </h4>
                                        <p className="text-subtitleText dark:text-gray-300">
                                            Monday - Saturday: 10 AM - 8 PM
                                            <br />
                                            Sunday: 12 PM - 6 PM
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <FaPhone className="text-accentColor text-xl mr-4" />
                                    <div>
                                        <h4 className="font-semibold text-lightText dark:text-darkText">
                                            Contact
                                        </h4>
                                        <p className="text-subtitleText dark:text-gray-300">
                                            +880 123 456 7890
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <FaEnvelope className="text-accentColor text-xl mr-4" />
                                    <div>
                                        <h4 className="font-semibold text-lightText dark:text-darkText">
                                            Email
                                        </h4>
                                        <p className="text-subtitleText dark:text-gray-300">
                                            support@equisports.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 flex space-x-4">
                            <a 
                                href="https://maps.google.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="
                                    flex-1 
                                    text-center 
                                    px-4 
                                    py-3 
                                    rounded-full 
                                    bg-lightBtn 
                                    text-white 
                                    hover:bg-lightBtnHover 
                                    dark:bg-darkBtn 
                                    dark:hover:bg-darkBtnHover 
                                    transition-colors
                                "
                            >
                                Get Directions
                            </a>
                            <a 
                                href="tel:+8801234567890"
                                className="
                                    flex-1 
                                    text-center 
                                    px-4 
                                    py-3 
                                    rounded-full 
                                    border 
                                    border-lightBtn 
                                    text-lightBtn 
                                    hover:bg-lightBtn 
                                    hover:text-white 
                                    dark:border-darkBtn 
                                    dark:text-darkBtn 
                                    dark:hover:bg-darkBtn 
                                    dark:hover:text-white 
                                    transition-colors
                                "
                            >
                                Call Store
                            </a>
                        </div>
                    </div>

                    {/* Map Column */}
                    <div
                        ref={mapContainerRef}
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "12px",
                        }}
                        className="border z-10 border-gray-300 shadow-md dark:border-gray-700 dark:shadow-gray-900"
                    />
                </div>
            </div>
        </div>
    );
};

export default StoreLocationMap;