import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./EventBox.css"


function EventBox(props) {
  const track = props.track

  return (

    // LINK TO THE EVENT PAGE MANUALLY, just uncomment it and set the trackId
    // <Link className="link" to={`tracks/${track._id}`} >

    <div className="e-main-container-box">

      <div className="e-l-c">
          <div className="ribbon">
            Weekly Event
          </div>
      </div>

      <div className="e-r-c">

        <div className="e-up-section">
          <h4>Jeep Track</h4>
          <p>Immerse yourself in the beauty of Central Park on this revitalizing track.Begin at the Bow Bridge, explore the parks winding trails, and make your way to the serene Conservatory Garden before completing your journey at the Bow Bridge.</p>
        </div>

        <div className="e-low-section">
          <ul>
            <li><span>Length</span> 10 mi</li>
            <li><span>Elevation</span> 177 ft</li>
            <li><span>Location</span> New York City</li>
          </ul>
        </div>

      </div>
    </div>

    // </Link>
  );
}

export default EventBox;