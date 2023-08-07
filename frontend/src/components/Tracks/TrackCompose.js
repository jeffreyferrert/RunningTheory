import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, composeTrack } from '../../store/tracks';
import TrackBox from './TrackBox';
import './TrackCompose.css';

function TrackCompose() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [miles, setMiles] = useState(0);
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const author = useSelector(state => state.session.user);
    const newTrack = useSelector(state => state.tracks.new);
    const errors = useSelector(state => state.errors.tracks);

    useEffect(() => {
        return () => dispatch(clearTrackErrors());
    }, [dispatch]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(composeTrack({author, name, location, miles, description }));
        setName('');
        setLocation('');
        setMiles(0);
        setDescription('');
    };

    return (
        <>
        
            <form className="compose-track" onSubmit={handleSubmit}>
                <input
                    type="textarea"
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                    placeholder="Write the track name..."
                    required
                />
                <input
                    type="textarea"
                    value={location}
                    onChange={e => setLocation(e.currentTarget.value)}
                    placeholder="Write your track location..."
                    required
                />
                <input
                    type="number"
                    value={miles}
                    onChange={e => setMiles(e.currentTarget.value)}
                    placeholder="Write your track miles..."
                    required
                />
                <input
                    type="textarea"
                    value={description}
                    onChange={e => setDescription(e.currentTarget.value)}
                    placeholder="Write your track description..."
                    required
                />
                <div className="errors">{errors?.text}</div>
                <input type="submit" value="Submit" />
            </form>
            
            <div className="previous-track">
                <h3>Track Created</h3>
                {newTrack ? <TrackBox track={newTrack} /> : undefined}
            </div>


        </>
    )
}

export default TrackCompose;
