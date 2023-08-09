import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapTrackForm = ({ track }) => {
  const containerStyle = {
    width: '100%',
    height: '100vh',
  };


  const startAddress =  track.startAddress
  const endAddress = track.endAddress

  const [startLatLng, setStartLatLng] = useState(null);
  const [endLatLng, setEndLatLng] = useState(null);
  const [map, setMap] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,

  });

  const center = {
    lat: 40.7873414,
    lng: -73.9516308,
  };

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

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

      Promise.all([geocodeAddress(startAddress), geocodeAddress(endAddress)])
        .then(([startLocation, endLocation]) => {
          setStartLatLng(startLocation);
          setEndLatLng(endLocation);
        })
        .catch((error) => {
          console.error('Error geocoding addresses:', error);
        });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && startLatLng && endLatLng) {
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
  }, [isLoaded, map, directionsRenderer, startLatLng, endLatLng]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={startAddress}
      zoom={2.7}
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

export default MapTrackForm;
