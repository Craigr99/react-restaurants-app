import React, { useEffect, useState } from "react";
//import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
//import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../style/App.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiY3JhaWdyMSIsImEiOiJja3dnaG5qNjQwNWl4MnNwa2s5ejltbTlpIn0.R_64jf1wAuGlBUA2ziGLLQ"; // Set your mapbox token here
const Map = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  const test = () => {
    console.log("test");
    setViewport({
      latitude: 40.579505,
      longitude: -73.98241999999999,
      zoom: 14,
    });
  };

  return (
    <>
      <button onClick={test}>click</button>
      <MapGL
        width="100%"
        height="400px"
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <Marker
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          className="marker"
        >
          <div></div>
        </Marker>
      </MapGL>
    </>
  );
};

export default Map;
