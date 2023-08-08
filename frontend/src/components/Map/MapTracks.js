

// import React, { useEffect, useState } from 'react';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// const MapTracks = ({ tracks }) => {
//   const history = useHistory()
//   const [map, setMap] = useState(null);
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
//   });

//   const containerStyle = {
//     width: '100%',
//     height: '100vh',
//   };

//   const center = {
//     lat: 40.7873414,
//     lng: -73.9516308
//   };

//   const onLoad = (map) => {
//     setMap(map);
//   };

//   const geocodeAddress = async (address) => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.REACT_APP_MAPS_API_KEY}`
//       );
//       const data = await response.json();
//       if (data.results && data.results.length > 0) {
//         const location = data.results[0].geometry.location;
//         return location;
//       }
//     } catch (error) {
//       console.error('Error geocoding address:', error);
//     }
//     return null;
//   };

//   useEffect(() => {
//     if (isLoaded && map) {
//       tracks.map(async (track) => {
//         const location = await geocodeAddress(track.startAddress);
//         if (location) {
//           track.latitude = location.lat;
//           track.longitude = location.lng;
//         }
//       });
//     }
//   }, [isLoaded, map, tracks]);

//   const handleClick = (trackId) => {
//     history.push(`/tracks/${trackId}`)
//   }

//   return isLoaded ? (
//     <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} onLoad={onLoad}>
//       {tracks.map((track) => (
//         <Marker 
//           key={track.id} 
//           position={{ lat: track.latitude, lng: track.longitude }} 
//           onClick={() => handleClick(track.id)}
          
//           />
//       ))}
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// };

// export default MapTracks;

// import React, { useEffect, useState } from 'react';
// import { GoogleMap, OverlayView, Marker, DirectionsService, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// const MapTracks = ({ tracks }) => {
//   const history = useHistory()
//   const [map, setMap] = useState(null);
//   const [geocoder, setGeocoder] = useState(null);
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
//   });

//   const containerStyle = {
//     width: '100%',
//     height: '100vh',
//   };

//   const center = {
//     lat: 40.7362862,
//     lng: -73.9937922,
//   };

//   const onLoad = (map) => {
//     setMap(map);
//   };

//   useEffect(() => {
//     if (isLoaded) {
//       const geocoder = new window.google.maps.Geocoder();
//       setGeocoder(geocoder);
//     }
//   }, [isLoaded]);

//     const handleMarkerClick = (trackId) => {
//     history.push(`/tracks/${trackId}`)
//   }

//   return isLoaded ? (
//     <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2.7} onLoad={onLoad}>
//       {tracks.map((track) => (
//         <React.Fragment key={track.id}>
//           <DirectionsService
//             options={{
//               origin: track.startAddress,
//               destination: track.endAddress,
//               travelMode: 'BICYCLING',
//             }}
//             callback={(result, status) => {
//               if (status === 'OK') {
//                 return <DirectionsRenderer directions={result} />;
//               }
//               console.error('Error fetching directions:', status);
//             }}
//           />
//           <OverlayView
//             position={{ lat: track.latitude, lng: track.longitude }}
//             mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
//           >
//             <div className="overlay-marker" onClick={() => handleMarkerClick(track.id)}>
//               ${track.id}
//             </div>
//           </OverlayView>
//         </React.Fragment>
//       ))}
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// };

// export default MapTracks;


import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';

const MapTracks = ({ tracks }) => {
  const history = useHistory();
  const [map, setMap] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
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
      history.push(`/tracks/${selectedTrack.id}`);
    }
  };

  const handleInfoWindowClose = () => {
    setSelectedTrack(null);
  };

  useEffect(() => {
    if (isLoaded && map) {
      tracks.map(async (track) => {
        const location = await geocodeAddress(track.startAddress);
        if (location) {
          track.latitude = location.lat;
          track.longitude = location.lng;
        }
      });
    }
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

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} onLoad={onLoad}>
      {selectedTrack && (
        <InfoWindow
          position={{ lat: selectedTrack.latitude, lng: selectedTrack.longitude }}
          onCloseClick={handleInfoWindowClose}
        >
          <div className="track-infowindow">
            {selectedTrack.name}
            <br></br>
            {selectedTrack.startAddress}
            <br></br>
            {selectedTrack.description}
            <br></br>
            <button onClick={handleInfoWindowClick}>View Event</button>
          </div>
        </InfoWindow>
      )}
      {tracks.map((track) => (
        <Marker
          key={track.id}
          position={{ lat: track.latitude, lng: track.longitude }}
          onClick={() => handleMarkerClick(track)}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MapTracks;
