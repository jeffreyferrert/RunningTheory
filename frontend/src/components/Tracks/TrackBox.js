import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./TrackBox.css"


function TrackBox(props) {
  const track = props.track
  return (
    // <Link to={`tracks/${track._id}`}>

      <div className="main-container-box">
        <div className="up-section">
        <h4>{track.name}</h4>
        <p>{track.description}</p>

        </div>
        <div className="low-section">
          <ul>
            <li><span>Length</span> {track.miles} mi</li>
            <li><span>Elevation</span> 177 ft</li>
            <li><span>Location</span> {track.location}</li>
          </ul>
        </div>
      </div>

    // </Link>
  );
}

export default TrackBox;