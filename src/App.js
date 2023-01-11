import logo from './logo.svg';
import React, {useState} from "react";
import './App.css';
import ReactMapGL, { Marker, Popup} from 'react-map-gl';
import * as parkData from "./data/skateboard-parks.json";





export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "100vh",
    zoom:10
  
  });

  const[selectedPark, setSelectedPark] = useState(null);

  React.useEffect(() => {
    const listener =(e) => {
      if(e.key === "Escape") {
        selectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return() => {
      window.removeEventListener("keydown", listener);
    }
  }, []);

  return (
    <div className="App">

     <ReactMapGL 
     {...viewport} 
     mapboxApiAccessToken="pk.eyJ1Ijoib3JiaXQ2MzEiLCJhIjoiY2t5MjBvemE3MGdjbjJ3cnN3aDB5N3dvaCJ9.8MqpUnWXQ92L_cDP4lTGuw"
     mapStyle={"mapbox://styles/orbit631/cky21x0sb3ubo14n5mbu6ngq1"}
     onViewportChange={viewport => {
       setViewport(viewport);
     }}
     >
      {/*10:50 in https://www.youtube.com/watch?v=JJatzkPcmoI, cant get properties.PARK_ID to be found, 
      something with .map going wrong I think. Maybe I need to make a loop manually?*/}


        {parkData.features.map((park) => (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
          <Marker 
          
          key={park.attributes.PARK_ID} 
          latitude={park.geometry.y}
          longitude={park.geometry.x}
          >
            <button className="marker-btn" onClick={(e) => {
              e.preventDefault();
              setSelectedPark(park);
            }}>
              <img src="/scootersvg.svg" alt="Skate Park Here" />
            </button>
          </Marker>
        ))}



        {selectedPark ? (
          <Popup 
          latitude={selectedPark.geometry.y} 
          longitude={selectedPark.geometry.x}
          onClose={() =>{
            setSelectedPark(null);
          }}
          >
            <div>
              <h2>{selectedPark.attributes.NAME}</h2>
              <h4>{selectedPark.attributes.DESCRIPTION}</h4>
              <p>{selectedPark.attributes.PARKADDRESS}</p>
            </div>
          </Popup>

        ) : null}
     </ReactMapGL> 
    </div>
  );
}


