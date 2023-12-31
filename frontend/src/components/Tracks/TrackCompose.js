import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearTrackErrors, composeTrack } from '../../store/tracks';
// import TrackBox from './TrackBox';
import './TrackCompose.css';
import MapTrackForm from '../Map/MapTrackForm';
import MapTrackDefault from '../Map/MapTrackDefault';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function TrackCompose() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const author = useSelector(state => state.session.user);
    const errors = useSelector(state => state.errors.tracks);
    const [startAddress, setStartAddress] = useState('');
    const [endAddress, setEndAddress] = useState('');
    const [mapForm, setMapForm] = useState(false);
    const [bicycleDistance, setBicycleDistance] = useState(0);
    const history = useHistory();

    useEffect(() => {
        return () => dispatch(clearTrackErrors());
    }, [dispatch, mapForm]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(composeTrack({ author, name, location, miles: bicycleDistance, description, startAddress, endAddress })).then(() => history.push(`/tracks`))
    };

    const handleReset = (e) => {
        e.preventDefault();
        setMapForm(false)
    }

    const handleClick = (e) => {
        e.preventDefault();
        setMapForm(true)
    }

    const track = { startAddress: startAddress, endAddress: endAddress }

    return (
        <>
            <div id='create-track-main'>
                    <form className="compose-track" onSubmit={handleSubmit}>
                        <div id='form-cont'>
                            <h2>Create your track</h2>
                            <div className='compose-box'> Give Your Track A Name
                                <input
                                    className='form-box'
                                    type="textarea"
                                    value={name}
                                    onChange={e => setName(e.currentTarget.value)}
                                    placeholder="Write the track name..."
                                    required
                                />
                            </div>
                            <div className='compose-box'> City
                                <input
                                    className='form-box'
                                    type="textarea"
                                    value={location}
                                    onChange={e => setLocation(e.currentTarget.value)}
                                    placeholder="Write your track location..."
                                    required
                                />
                            </div>
                            <div className='compose-box'> Start Location
                                <input
                                    className='form-box'
                                    type="textarea"
                                    value={startAddress}
                                    onChange={e => setStartAddress(e.currentTarget.value)}
                                    placeholder="Write your track location..."
                                    required
                                />
                            </div>
                            <div className='compose-box'> End Location
                                <input
                                    className='form-box'
                                    type="textarea"
                                    value={endAddress}
                                    onChange={e => setEndAddress(e.currentTarget.value)}
                                    placeholder="Write your track location..."
                                    required
                                />
                            </div>
                            <div id='address-check'>
                                <button id='button-form1' className='form-box-button' onClick={handleClick}>Check Address</button>
                                <button id='button-form2' className='form-box-button' onClick={handleReset}>Reset Address</button>
                            </div>
                            <div className='compose-box'>Calculated Miles
                                <input
                                    className='form-box'
                                    type="number"
                                    value={bicycleDistance}
                                    onChange={e => setBicycleDistance(parseFloat(e.currentTarget.value))}
                                    placeholder="Write your track miles..."
                                    required
                                />

                            </div>
                            <div className='compose-box'> Tell Us About Your Track
                                <input
                                    className='form-box'
                                    type="textarea"
                                    value={description}
                                    onChange={e => setDescription(e.currentTarget.value)}
                                    placeholder="Write your track description..."
                                    required
                                />
                            </div>
                            <div>
                                <div className="errors">{errors?.text}</div>
                            </div>
                            <div>
                                <input id='form-submit' className='form-box-button qfb' type="submit" value="Submit" />
                            </div>
                        </div>
                    </form>
                    <div id='form-map'>
                        {mapForm ? <MapTrackForm track={track} onBicycleDistanceChange={setBicycleDistance} /> : <MapTrackDefault />}
                    </div>
            </div>
        </>
    )
}

export default TrackCompose;
