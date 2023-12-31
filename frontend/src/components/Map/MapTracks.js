import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';
import "./MapTrack.css"


const MapTracks = ({ tracks }) => {
  const history = useHistory();
  const [map, setMap] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [updatedTracks, setUpdatedTracks] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });


  const containerStyle = {
    width: '100%',
    height: '100vh',
  };

  const center = {
    lat: 40.7873414,
    lng: -73.9516308,
  };

  const onLoad = (map) => {
    setMap(map);
  };

  const handleMarkerClick = (track) => {
    setSelectedTrack(track);
  };


  const handleInfoWindowClick = () => {
    if (selectedTrack) {
      history.push(`/tracks/${selectedTrack._id}`);
    }
  };

  const handleInfoWindowClose = () => {
    setSelectedTrack(null);
  };

  useEffect(() => {
    const geocodeAndSetTracks = async () => {
      if (isLoaded && map) {
        const updatedTracks = await Promise.all(
          tracks.map(async (track) => {
            const location = await geocodeAddress(track.startAddress);
            if (location) {
              return { ...track, latitude: location.lat, longitude: location.lng };
            }
            return track;
          })
        );
        setUpdatedTracks(updatedTracks);
      }
    };

    geocodeAndSetTracks();
  }, [isLoaded, map, tracks]);

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return location;
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
    return null;
  };


  return (
    <>
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} onLoad={onLoad}>
          {selectedTrack && (
            <InfoWindow
              position={{ lat: parseFloat(selectedTrack.latitude), lng: parseFloat(selectedTrack.longitude) }}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="track-infowindow">
                <span className="track-name">{selectedTrack.name}</span>
                <br></br>
                <span>Event Organizer:</span> {selectedTrack.author.username}
                <br></br>
                <span>Starting Point:</span> {selectedTrack.startAddress}
                <br></br>
                <span>Distance:</span> {selectedTrack.miles} Miles
                <br></br>
                <button className="track-info-btn" onClick={handleInfoWindowClick}>View Event</button>
              </div>
            </InfoWindow>
          )}
          {updatedTracks.map((track) => (
            <Marker
              key={track._id}
              position={{ lat: parseFloat(track.latitude), lng: parseFloat(track.longitude) }}
              onClick={() => handleMarkerClick(track)}
            />
          ))}
        </GoogleMap>
      )}
    </>
  );
};

export default MapTracks;