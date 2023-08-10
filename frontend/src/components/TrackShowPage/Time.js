import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { deleteTime } from "../../store/times";
import './Time.css';

export default function Time({ time, currUser }) {
    const dispatch = useDispatch();
    const { trackId } = useParams();

    const formattedTime = (value) => (value < 10 ? "0" + value : value);

    const handleDelete = () => {
        dispatch(deleteTime(time._id));
    };

    const isCurrentUser = time.author._id === currUser._id;

    return (
        <div className="single-time-container">
            <p>{time.track._id === trackId ? time.author.username : time.track.name}</p>
            <p className="track-time">
                {formattedTime(time.hours)}:{formattedTime(time.minutes)}:{formattedTime(time.seconds)}
            </p>
            {isCurrentUser && (
                <form onSubmit={(e) => { handleDelete(); }}>
                    <input id="delete-time-btn" type="submit" value={`Remove Time`} />
                </form>
            )}
        </div>
    );
}
