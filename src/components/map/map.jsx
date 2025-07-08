
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";



const Map = ({ address }) => {
    const [position, setPosition] = useState([51.505, -0.09]); // Default position (London)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!address) return;
        setLoading(true);
        fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                address
            )}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data && data.length > 0) {
                    setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [address]);

    if (loading) return <div>Loading map...</div>;

    return (
        <MapContainer center={position} zoom={15} style={{ height: "300px", width: "300px" }}>
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={new L.Icon({
                iconUrl: markerIcon,
                iconRetinaUrl: markerIcon2x,
                shadowUrl: markerShadow,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })} >
                <Popup>{address}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;