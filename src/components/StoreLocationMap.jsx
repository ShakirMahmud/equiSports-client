import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const StoreLocationMap = () => {
  const mapContainerRef = useRef(null); // Ref to hold the map container element

  useEffect(() => {
    // Check if the map has already been initialized by checking if the map container is already created
    if (mapContainerRef.current && !mapContainerRef.current._leaflet_id) {
      const map = L.map(mapContainerRef.current).setView([23.7607345, 90.4119843], 14); // Latitude and Longitude of your shop

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Use the CDN URL for the marker icon
      const defaultIcon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", // CDN URL
        iconSize: [25, 41], // Size of the icon
        iconAnchor: [12, 41], // Anchor of the icon (position of the tip of the marker)
        popupAnchor: [1, -34], // Popup position
      });

      const marker = L.marker([23.7607345, 90.4119843], { icon: defaultIcon }).addTo(map);
      marker.bindPopup("<b>EquiSports Shop Location</b>").openPopup();
    }
  }, []); // Empty dependency array to run this effect only once when the component mounts

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-orange-600">Visit Us!</h2>
        <p className="text-lg text-gray-600">Find our physical store location on the map below.</p>
      </div>
      <div
        ref={mapContainerRef} // Attach the ref to the map container
        style={{ width: "100%", height: "400px", borderRadius: "8px" }}
      ></div>
    </div>
  );
};

export default StoreLocationMap;
