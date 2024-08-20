import React, { useState, useEffect, useRef, FC } from "react";
import Image from "next/image";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import PhoneIcon from '@mui/icons-material/Phone'; // Import the phone icon from Material-UI
import { Icon } from 'leaflet';

// Define custom icons
const icon1 = new Icon({
  iconUrl: '/assets/marker.png',
  iconSize: [22.58, 30],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const icon2 = new Icon({
  iconUrl: '/leaflet/images/marker-icon.png',
  iconSize: [22, 30],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MarkerData {
  coordinates: [number, number];
  title: string;
  phone: string;
  iconType: 'icon1' | 'icon2'; // Add iconType property
}

const markers: MarkerData[] = [
  // { coordinates: [35.90771119924303, 8.637085817791133], title: "Marker 1", phone: "+123456789", iconType: 'icon1' },
  { coordinates: [36.83530572334659, 10.147287921419224], title: "Marker 2", phone: "+987654321", iconType: 'icon2' },
];

const MapComponent: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const mapRef = useRef<any | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const ZoomHandler: FC = () => {
    const map = useMap();
    const flyToMarker = (coordinates: [number, number], zoom: number) => {
      if (coordinates && typeof coordinates[0] !== "undefined") {
        map.flyTo(coordinates, zoom, {
          animate: true,
          duration: 1.5,
        });
      }
    };
    useMapEvents({
      zoomend: () => {
        setLoading(false);
      },
    });

    useEffect(() => {
      if (markers.length > 0) {
        flyToMarker(markers[0].coordinates, isMobile ? 6 : 6.9); // Adjusted zoom level
      }
    }, []);

    return null;
  };

  return (
    <Box sx={{ position:'relative', borderRadius:"24px",}}>
      {loading && <div>Loading...</div>}
      <MapContainer center={[35.90771119924303, 34.637085817791133]} zoom={isMobile ? 5 : 7} style={{ borderTopRightRadius:"24px 24px", borderBottomRightRadius:"24px 24px", height: isMobile ? "27vh" : "500px", marginTop: "-25px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker, index) => (
          <Marker 
            key={index} 
            position={marker.coordinates} 
            icon={marker.iconType === 'icon1' ? icon1 : icon2} // Apply the appropriate icon
          >
            <Popup>
              <Box sx={{width:"150px", height:""}}>
                {/* <Box>
                  <Image src="/assets/dima-page/about-us-dima.png" width={482} height={466} alt="about-us-dima" />
                </Box> */}
                <Box sx={{display:'flex', mb:'-10px'}}>
                <Box sx={{pt:"20px", mr:"10px"}}>
                  <Image src="/assets/marker.png" width={15} height={15} alt="contact-us-dima" />
                </Box>
                <Typography sx={{fontSize:"16px"}}>PEDABRAIN</Typography>
                </Box>
                <Box>
                  <PhoneIcon /> {marker.phone}
                </Box>
              </Box>
            </Popup>
          </Marker>
        ))}
        <ZoomHandler />
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
