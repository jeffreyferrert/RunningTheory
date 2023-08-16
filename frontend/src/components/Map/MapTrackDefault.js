import React, { useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const MapTrackDefault = () => {
  const containerStyle = {
    width: '100%',
    height: '100vh',
  };

  const startAddress = 'New York, New York'

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,

  });

  const center = {
    lat: 40.7873414,
    lng: -73.9516308,
  };

  useEffect(() => {
    if (isLoaded) {
      const geocoder = new window.google.maps.Geocoder();
      const geocodeAddress = (address) => {
        return new Promise((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
              resolve(results[0].geometry.location);
            } else {
              reject(new Error('Geocode was not successful for the following reason: ' + status));
            }
          });
        });
      };

      Promise.all([geocodeAddress(startAddress)])
        
    }
  }, [isLoaded]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}

    >
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapTrackDefault;
