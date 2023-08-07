import "./TrackBox.css"

function TrackBox ({ track: { name, location, miles, description, author }}) {
  const { username } = author;
  return (
    <div className="track">
      {/* <h3>{username}</h3> */}
      <p>Track Name: {name}</p>
      <p>Location: {location}</p>
      <p>Length: {miles} miles</p>
      <p>Description: {description}</p>
    </div>
  );
}

export default TrackBox;