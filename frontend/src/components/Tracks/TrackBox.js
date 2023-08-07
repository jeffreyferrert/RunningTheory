import React from "react";
import "./TrackBox.css"

function TrackBox ({ track: { name, location, miles, description, author }}) {
  const { username } = author;
  return (
    <div className="track">
      {/* <h3>{username}</h3> */}
      <p><span>Track Name:</span> {name}</p>
      <p><span>Location:</span> {location}</p>
      <p><span>Length:</span> {miles} miles</p>
      <p><span>Description:</span> {description}</p>
    </div>
  );
}

export default TrackBox;