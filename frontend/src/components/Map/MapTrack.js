import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapTrack = ({ track }) => {
  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const startLatLng = {
    lat: 40.778877,
    lng: -73.9873968
  };

  const endLatLng = {
    lat: 40.7715661,
    lng: -73.9671101,
  };

  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null); // Store DirectionsRenderer instance
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const DirectionsService = new window.google.maps.DirectionsService();

      DirectionsService.route(
        {
          origin: startLatLng,
          destination: endLatLng,
          travelMode: window.google.maps.TravelMode.BICYCLING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            if (directionsRenderer) {
              directionsRenderer.setDirections(result);
            } else {
              const newDirectionsRenderer = new window.google.maps.DirectionsRenderer({
                directions: result,   
                polylineOptions: {
                  strokeColor: '#FF0000', 
                  strokeOpacity: 0.8,      
                  strokeWeight: 4,        
                },
              });
              newDirectionsRenderer.setMap(map);
              setDirectionsRenderer(newDirectionsRenderer);
            }
          } else {
            console.error('Error fetching directions:', status);
          }
        }
      );
    }
  }, [isLoaded, map, directionsRenderer]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={startLatLng}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* <Marker position={startLatLng} />
      <Marker position={endLatLng} /> */}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapTrack;
