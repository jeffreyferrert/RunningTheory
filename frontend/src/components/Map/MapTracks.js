import React from "react";
import { GoogleMap, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


const MapTracks = ({ tracks }) => {

    const history = useHistory();
    const [hoveredMarkerId, setHoveredMarkerId] = useState(null);
  
    const containerStyle = {
      width: '100%',
      height: '100vh',
    };
  
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY 
    });
  
    const center = {
      lat: 40.7362862,
      lng: -73.9937922
    };
  
    const handleMarkerClick = (listingId) => {
      history.push(`/listings/${listingId}`);
    };
  
    const getPixelPositionOffset = (width, height) => ({
      x: -(width / 2),
      y: -(height / 2),
    });
  
  
  
  
    const handleMarkerMouseEnter = (trackId) => {
  
      return (e) => {
        e.preventDefault()
        setHoveredMarkerId(trackId);
  
      }
    };
  
    const handleMarkerMouseLeave = () => {
      setHoveredMarkerId(null);
    };
  
    return isLoaded ? (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14} draggable={false}>
        {tracks.map((track) => (
          <>
          
          <OverlayView
            key={track.id}
            position={{ lat: track.latitude, lng: track.longitude }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={getPixelPositionOffset}
  
          >
            <div
              className="overlay-marker"
              onClick={() => handleMarkerClick(track.id)}

            >
              ${track.name}
            </div>
          </OverlayView>
          </>
        ))}
      </GoogleMap>
    ) : (
      <></>
    );
  };
  
  export default MapTracks