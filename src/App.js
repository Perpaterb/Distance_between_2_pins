import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import distanceCalc from './distanceCalc';

let flip_flp = 0
let d = 0

function App() {
  const [coordinates, setcoordinates] = useState({
    selected_lat_1: 0,
    selected_lng_1: 0,
    selected_lat_2: 0,
    selected_lng_2: 0,
    distance: 0,
  });

  let defaultProps = {
    center: {
      lat: -33.8688,
      lng: 151.2093
    },
    zoom: 11
  };

  function setpin(e) {
    if (flip_flp === 0) {
      flip_flp = 1
      if (coordinates.selected_lat_2 !== 0) {
        d = distanceCalc(e.lat, e.lng, coordinates.selected_lat_2, coordinates.selected_lng_2)
      }
      setcoordinates(coordinates => ({
        ...coordinates,
        selected_lat_1: e.lat,
        selected_lng_1: e.lng,
        distance: d,
      }))
    } else {
      flip_flp = 0
      d = distanceCalc(coordinates.selected_lat_1, coordinates.selected_lng_1, e.lat, e.lng)
      setcoordinates(coordinates => ({
        ...coordinates,
        selected_lat_2: e.lat,
        selected_lng_2: e.lng,
        distance: d,
      }))
    }
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '600px ', width: '600px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '#### your pin ' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={(e) => setpin(e)}
      >
        <Marker
          lat={coordinates.selected_lat_1}
          lng={coordinates.selected_lng_1}
          name="My Marker"
          color="blue"
        />
        <Marker
          lat={coordinates.selected_lat_2}
          lng={coordinates.selected_lng_2}
          name="My Marker"
          color="red"
        />
      </GoogleMapReact>
      <h3>blue: {coordinates.selected_lat_1} , {coordinates.selected_lng_1} </h3>
      <h3>red: {coordinates.selected_lat_2} , {coordinates.selected_lng_2} </h3>
      <h3>Distance between pins = {Math.round(coordinates.distance)}m</h3>
    </div>
  );
}

export default App;
