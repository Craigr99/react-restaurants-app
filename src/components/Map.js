import React, { useEffect, useState } from "react";
//import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
//import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import MapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "../style/App.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiY3JhaWdyMSIsImEiOiJja3dnaG5qNjQwNWl4MnNwa2s5ejltbTlpIn0.R_64jf1wAuGlBUA2ziGLLQ"; // Set your mapbox token here
const Map = (props) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lng,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });

  useEffect(() => {
    try {
      setLat(props.coordinates[1]);
      setLng(props.coordinates[0]);

      setViewport({
        latitude: lat || 0,
        longitude: lng || 0,
        zoom: 12,
      });
    } catch (error) {
      console.log(error);
    }
  }, [lat, lng, props.coordinates]);

  const test = () => {
    console.log("test");
    setViewport({
      latitude: props.coordinates[1],
      longitude: props.coordinates[0],
      zoom: 10,
    });
  };

  return (
    <>
      {/* <button onClick={test}>click</button> */}
      <MapGL
        width="100%"
        height="400px"
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={setViewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {lat && lng ? (
          <Marker
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            className="marker"
          >
            <div></div>
          </Marker>
        ) : (
          <p>"Click 'View on map' to view a restaurant's location"</p>
        )}
      </MapGL>
    </>
  );
};

export default Map;
