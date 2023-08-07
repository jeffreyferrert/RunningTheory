import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./TrackBox.css"


// function TrackBox ({ track: { name, location, miles, description, author }}) {
//   const { username } = author;
//   return (
//     <div className="track">
//       {/* <h3>{username}</h3> */}
//       <p><span>Track Name:</span> {name}</p>
//       <p><span>Location:</span> {location}</p>
//       <p><span>Length:</span> {miles} miles</p>
//       <p><span>Description:</span> {description}</p>
//     </div>
//   );
// }

// export default TrackBox;

function TrackBox (props) {
  const track = props.track
  const { username } = track.author;
  return (
    <div className="track">
      {/* <Link to={`tracks/${track.id}`}> */}
        <h3>{username}</h3>
        <p><span>Track Name:</span> {track.name}</p>
        <p><span>Location:</span> {track.location}</p>
        <p><span>Length:</span> {track.miles} miles</p>
        <p><span>Description:</span> {track.description}</p>
\
      {/* </Link> */}
    </div>
  );
}

export default TrackBox;