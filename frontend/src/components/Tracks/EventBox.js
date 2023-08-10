import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { fetchEvent } from "../../store/event"
import "./EventBox.css"


function EventBox(props) {
  const dispatch = useDispatch()
  const track = props.track

  useEffect(() => {
    dispatch(fetchEvent())

  },[dispatch])
  console.log(track, "im the track in eventbox")
  return (
    <div className="e-main-container-box">
      <div className="e-l-c">
        <div className="ribbon">Weekly Event</div>
      </div>

      <div className="e-r-c">
        {track ? ( // Render the Link only if track exists
          <Link className="link" to={`tracks/${track._id}`}>
            <div className="e-up-section">
              <h4>{track.name}</h4>
              <p>{track.description}</p>
            </div>

            <div className="e-low-section">
              <ul>
                <li>
                  <span>Length</span> {track.length}
                </li>
                <li>
                  <span>Start Address</span> {track.startAddress} ft
                </li>
                <li>
                  <span>Location</span> {track.location}
                </li>
              </ul>
            </div>
          </Link>
        ) : (
          <div className="e-up-section">
            <h4>No Event Available</h4>
            <p>This track does not have an associated event.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventBox;